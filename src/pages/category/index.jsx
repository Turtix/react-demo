
import React,{Component} from "react";
import { Card,Icon,Button,Table,Modal,message} from 'antd';

import MyButton from '../../components/my-button';
import { reqGetCategories,reqAddCategory } from '../../api';
import AddCategoryForm from './add-category-form';

import './index.less';



export default  class  Category  extends Component{
    constructor(props){
        super(props);
        //初始化数据
        this.state = {
            categories:[], //菜单列表  一级分类数据
            isShowAddCategoryModal: false, // 添加分类对话框显示
        }
        this.createAddForm = React.createRef();
    }


    //定义表格列  columns为类的属性.
    columns = [{
        title: '品类名称', //第一列数据表头名称
        dataIndex: 'name', //显示第一列,应该显示的数据的属性
    }, {
        title: '操作',
        className: 'operator',
        dataIndex: 'operator',
        render: text => <div>
            <MyButton>修改名称</MyButton>
            <MyButton>查看其子品类</MyButton>
        </div>,
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
    changeModal = (isShow)=>{
        // console.log(66666);
        //传参时需要在外面包裹一层  否则在传参的同时会直接调用函数.
        return ()=>{
            this.setState({
                isShowAddCategoryModal: isShow
            })

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
        validateFields((err,values)=>{
            console.log(err,values);
            if(!err){
                //校验成功
                const  {parentId,categoryName} = values;
                 this.setState({
                    isShowAddCategoryModal: false
                 })
                reqAddCategory(parentId,categoryName);
            }else{
                //校验失败  不做处理
            }
        })
    }

    render (){
        const { categories,isShowAddCategoryModal } = this.state;
      return (
          <Card
              className="category"
              title="一级分类列表"
              extra={<Button type="primary" onClick={this.changeModal(true)}><Icon type="plus" />添加品类</Button>}
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
                  onCancel={this.changeModal(false)}
                  okText="确认"
                  cancelText="取消"
              >
                  {/* 经过 Form.create 之后如果要拿到 ref，可以使用 rc-form 提供的 wrappedComponentRef */}
                <AddCategoryForm categories={categories} wrappedComponentRef={this.createAddForm}/>

              </Modal>

          </Card>
      )
    }
}
