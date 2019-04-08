
import React,{Component} from "react";
import { Card,Icon,Button,Table,Modal,message} from 'antd';

import MyButton from '../../components/my-button';
import { reqGetCategories,reqAddCategory,reqUpdateCategory } from '../../api';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name-form';

import './index.less';

export default  class  Category  extends Component{
    constructor(props){
        super(props);
        //初始化数据
        this.state = {
            categories:[], //菜单列表  一级分类数据
            subCategories:[], //菜单列表  二级分类数据
            isShowAddCategoryModal: false, // 添加分类对话框显示
            isShowUpdateCategoryNameModal:false, //修改品类对话框显示
            isShowSubCategories:false, //是否展示二级分类数据
            category: {},  //保存要操作的一级分类数据
            parentCategory:{}, //二级分类数据对应的一级分类
        }
        this.createAddForm = React.createRef();
        this.createUpdateForm = React.createRef();
    }

    // 当请求数据为空时，不要loading.
    isLoading = true;

    //定义表格列  columns为类的属性.
    columns = [{
        title: '品类名称', //第一列数据表头名称
        dataIndex: 'name', //显示第一列,应该显示的数据的属性
    }, {
        title: '操作',
        className: 'operator',
        // dataIndex: 'operator', render方法和dataIndex不能共存,这样会导致render方法中没有值.
        render: category => {
            // console.log(category)  这样可以拿到每一个品类数据(一行)
            return <div>
            <MyButton onClick={this.showUpdateCategoryNameModal(category)}>修改名称</MyButton>
                {
                    this.state.isShowSubCategories ? null: <MyButton onClick={this.showSubCategory(category)}>查看其子品类</MyButton>
                }
        </div>},
    }];

    //查看二级菜单
    showSubCategory = (parentCategory)=>{
        return ()=>{
            //切换显示
            this.setState({
                parentCategory,
                isShowSubCategories: true,
            })
            //请求二级分类数据
            this.getCategories(parentCategory._id);
        }
    }

    //获取菜单数据的方法  一级菜单  二级菜单
    getCategories = async (parentId) => {
       const  result = await reqGetCategories(parentId);
       // console.log(result);
       if(result.status === 0){
           // 判断是一级/二级分类
           const options = {};
           if (result.data.length === 0) {
               this.isLoading = false;
               // 等当前更新完成后在调用，目的：让下一次生效
               setTimeout(() => {
                   this.isLoading = true;
               }, 0)
           }

           if(parentId === '0'){
               //一级分类
               options.categories = result.data;
           }else{
               //二级分类
               options.subCategories = result.data;
           }
           //数据加载完成之后再更新状态.
           this.setState(options);
       }else{
           message.error(result.msg);
       }
    }

    //发送请求获取数据
    componentDidMount() {
        this.getCategories('0');
    }

    // 切换对话框显示/隐藏的方法
    changeModal = (name,isShow)=>{
        //传参时需要在外面包裹一层  否则在传参的同时会直接调用函数.
        return ()=>{
            //当修改数据后 没点击取消和确定按钮就直接关闭对话框 后需要清空表单数据  防止下次点击修改,还会显示上次的数据
            if(name === 'isShowUpdateCategoryNameModal' && isShow === false){
                this.createUpdateForm.current.props.form.resetFields();
            }
            //添加数据同理
            if(name === 'isShowAddCategoryModal' && isShow === false){
                this.createAddForm.current.props.form.resetFields();
            }

            this.setState({
                [name]: isShow
            })

        }
    }

    //显示修改前的一级分类名称
    showUpdateCategoryNameModal = (category)=>{
        return ()=>{
            this.setState({
                category
            })
            this.changeModal('isShowUpdateCategoryNameModal',true)();
        }
    }

    //添加分类方法
    addCategory = ()=>{
        // 获取的是普通的虚拟DOM对象，它的值就是Dom元素
        // 获取的是组件，它的值就是组件的实例对象
        // console.log(this.createAddForm.current);

        //经过 Form.create 包装的组件将会自带 this.props.form 属性，
        const { validateFields ,resetFields} = this.createAddForm.current.props.form;
        // console.log(this.createAddForm.current.props)
        //表单校验的方法
        validateFields(async (err,values)=>{
            if(!err){
                //校验成功
                const  {parentId,categoryName} = values;
                const  result = await reqAddCategory(parentId,categoryName);
                // console.log(result)
                if(result.status === 0){
                    //成功添加品类 : 隐藏对话框  提示点击品类成功
                    // 如果当前在一级分类，添加的是一级分类数据，要显示。添加的是二级分类数据，不显示
                    // 如果当前在二级分类，添加的是一级分类数据，要插入原数据中，添加的是二级分类数据，并且与当前一级分类相同的，才显示
                    const options = { isShowAddCategoryModal: false,};
                    if(parentId === '0'){
                            /*
                            在table中显示谈价的数据
                            方式一: 重新请求所有数据,然后更新
                            方式二: 将返回值插入到数据中进行更新.
                            */
                        options.categories = [...this.state.categories,result.data];
                    }else if(parentId === this.state.parentCategory._id){
                        options.subCategories = [...this.state.subCategories,result.data];
                    }
                    this.setState(options);
                    message.success('添加分类成功~');
                    // 重置表单项
                    resetFields();
                }else{
                    //添加数据失败
                    message.error(result.msg);
                }
            }else{
                //校验失败  不做处理
            }
        })
    }

    //修改分类方法
    updateCategoryName = ()=>{
        const { validateFields,resetFields  } = this.createUpdateForm.current.props.form;

        validateFields(async (err,values)=>{
            if(!err){
                    //校验成功
                const  {categoryName} = values;
                const {category:{_id},isShowSubCategories} = this.state;

                const  result = await reqUpdateCategory(_id,categoryName);
                if(result.status === 0){
                    //成功修改 : 隐藏对话框  提示修改成功
                    // 如果在一级分类，点击修改一级分类数据
                    // 如果在二级分类，点击修改二级分类数据
                    let name = 'categories';
                    if (isShowSubCategories) {
                        name = 'subCategories'
                    }
                    this.setState({
                        isShowUpdateCategoryNameModal: false,
                        [name]: this.state[name].map((category) => {
                            //覆盖name
                            if (category._id === _id) return {...category, name: categoryName};
                            return category;
                        })
                    })
                    message.success('修改分类名称成功~');
                    // 重置表单项
                    resetFields();
                }else{
                    //添加数据失败
                    message.error(result.msg);
                }
            }else{
                //校验失败  不做处理
            }
        })
    }

    //退回一级菜单列表
    goBack = ()=>{
        this.setState({
            isShowSubCategories:false
        })
    }
    render (){
        const {
            categories,
            isShowAddCategoryModal,
            isShowUpdateCategoryNameModal ,
            category,
            isShowSubCategories,
            subCategories,
            parentCategory,
        } = this.state;
      return (
          <Card
              className="category"
              title={isShowSubCategories?<div><MyButton onClick={this.goBack} style={{fontSize: 16}}>一级分类</MyButton><Icon type="arrow-right"/><span>{parentCategory.name}</span></div> : '一级分类列表'}
              extra={<Button type="primary" onClick={this.changeModal('isShowAddCategoryModal',true)}><Icon type="plus" />添加品类</Button>}
          >
              <Table
                  columns={this.columns}
                  dataSource={ isShowSubCategories ? subCategories : categories }
                  bordered
                  rowKey="_id"
                  pagination={{
                      showSizeChanger: true,
                      pageSizeOptions: ['3', '6', '9', '12'],
                      defaultPageSize: 3,
                      showQuickJumper: true,
                  }}
                  //实现懒加载功能
                  loading={isShowSubCategories ? this.isLoading && !subCategories.length :this.isLoading && !categories.length }
              />
              <Modal
                  title="添加分类"
                  visible={isShowAddCategoryModal}
                  onOk={this.addCategory}
                  onCancel={this.changeModal('isShowAddCategoryModal',false)}
                  okText="确认"
                  cancelText="取消"
              >
                  {/* 经过 Form.create 之后如果要拿到 ref，可以使用 rc-form 提供的 wrappedComponentRef */}
                <AddCategoryForm categories={categories} wrappedComponentRef={this.createAddForm}/>
              </Modal>
              <Modal
                  title="修改分类名称"
                  visible={isShowUpdateCategoryNameModal}
                  onOk={this.updateCategoryName}
                  onCancel={this.changeModal('isShowUpdateCategoryNameModal',false)}
                  okText="确认"
                  cancelText="取消"
                  width={300}
              >
                  <UpdateCategoryNameForm categories={categories} categoryName={category.name} wrappedComponentRef={this.createUpdateForm}/>
              </Modal>
          </Card>
      )
    }
}
