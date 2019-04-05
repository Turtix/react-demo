
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
            isShowAddCategoryModal: false, // 添加分类对话框显示
            isShowUpdateCategoryNameModal:false, //修改品类对话框显示
            category: {},  //保存要操作的一级分类数据
        }
        this.createAddForm = React.createRef();
        this.createUpdateForm = React.createRef();
    }


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
            <MyButton onClick = {this.showUpdateCategoryNameModal(category)}>修改名称</MyButton>
            <MyButton>查看其子品类</MyButton>
        </div>},
    }];


    //获取菜单数据的方法  一级菜单
    getCategories = async (parentId) => {
       const  result = await reqGetCategories(parentId);
       // console.log(result);
       if(result.status === 0){
            this.setState({
                categories: result.data
            })
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
        // console.log(66666);
        //传参时需要在外面包裹一层  否则在传参的同时会直接调用函数.
        return ()=>{
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
        const { validateFields } = this.createAddForm.current.props.form;
        // console.log(this.createAddForm.current.props)
        //表单校验的方法
        validateFields(async (err,values)=>{
            if(!err){
                //校验成功
                const  {parentId,categoryName} = values;
                const  result = await reqUpdateCategory(parentId,categoryName);
                // console.log(result)
                if(result.status === 0){
                    //成功添加品类 : 隐藏对话框  提示点击品类成功
                    this.setState({
                        isShowAddCategoryModal: false,
                        /*
                        在table中显示谈价的数据
                        方式一: 重新请求所有数据,然后更新
                        方式二: 将返回值插入到数据中进行更新.
                        */
                        categories:[...this.state.categories,result.data],
                    })
                    message.success('添加分类成功~');

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
                const {category:{_id},categories} = this.state;
                const  result = await reqAddCategory(_id,categoryName);
                if(result.status === 0){
                    //成功添加品类 : 隐藏对话框  提示点击品类成功
                    this.setState({
                        isShowUpdateCategoryNameModal: false,
                        categories: categories.map((category) => {
                            //覆盖name
                            if (category._id === _id) return {...category, name: categoryName};
                            return category;
                        })
                    })
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
    render (){
        const {
            categories,
            isShowAddCategoryModal,
            isShowUpdateCategoryNameModal ,
            category
        } = this.state;
      return (
          <Card
              className="category"
              title="一级分类列表"
              extra={<Button type="primary" onClick={this.changeModal('isShowAddCategoryModal',true)}><Icon type="plus" />添加品类</Button>}
          >
              <Table
                  columns={this.columns}
                  dataSource={categories}
                  bordered
                  rowKey="_id"
                  pagination={{
                      showSizeChanger: true,
                      pageSizeOptions: ['3', '6', '9', '12'],
                      defaultPageSize: 3,
                      showQuickJumper: true,
                  }}
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
              >
                  <UpdateCategoryNameForm categoryName={category.name} wrappedComponentRef={this.createUpdateForm}/>
              </Modal>
          </Card>
      )
    }
}
