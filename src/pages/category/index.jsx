
import React,{Component} from "react";
import { Card,Icon,Button,Table } from 'antd';

import MyButton from '../../components/my-button';

import './index.less';

export default  class  Category  extends Component{
    render (){
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

        const data = [{
            key: '1',
            name: '手机',
        }, {
            key: '2',
            name: '电脑',
        },{
            key: '3',
            name: '电脑',
        },{
            key: '4',
            name: '电脑',
        },{
            key: '5',
            name: '电脑',
        },{
            key: '6',
            name: '电脑',
        },{
            key: '7',
            name: '电脑',
        },{
            key: '8',
            name: '电脑',
        },];
      return (
          <Card
              className="category"
              title="一级分类列表"
              extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}
          >
              <Table
                  columns={columns}
                  dataSource={data}
                  bordered
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
