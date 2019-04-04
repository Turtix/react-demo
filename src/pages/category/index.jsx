
import React,{Component} from "react";
import { Card,Icon,Button,Table } from 'antd';

import MyButton from '../../components/my-button';
import { reqGetCategories } from '../../api';

import './index.less';

export default  class  Category  extends Component{
    //初始化数据
    state = {
        categories:[]
    }

    //获取菜单数据的方法  一级菜单
    getCategories = async (parentId) => {
       const  result = await reqGetCategories(parentId);
       // console.log(result);
       if(result.status === 0){
            this.setState({
                categories: result.data
            })
       }
    }

    //发送请求获取数据
    componentDidMount() {
        this.getCategories('0');
    }

    render (){
        const { categories } = this.state;
        const columns = [{
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

      return (
          <Card
              className="category"
              title="一级分类列表"
              extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}
          >
              <Table
                  columns={columns}
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
          </Card>
      )
    }
}
