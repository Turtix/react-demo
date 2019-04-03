import React,{Component} from "react";

import {Button, Card, Icon, Table} from "antd";

import MyButton from '../../components/my-button';


export default  class  Product  extends Component{
    render (){
        const columns = [
        {
            title: '商品名称', //第一列数据表头名称
            dataIndex: 'name', //显示第一列,应该显示的数据的属性
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            width: 200,
            render: text => '¥'+text,  //自定义渲染文本的规则
        },
        {
            title: '状态',
            width: 200,
            render: product => {
                return <div>
                    <Button type='primary' >上架</Button>&nbsp;&nbsp;
                    已下架
                </div>
            }
        },
        {
        title: '操作',
        className: 'operator',
        dataIndex: 'operator',
        render: product => <div>
            <MyButton>详情</MyButton>
            <MyButton>修改</MyButton>
        </div>,
        }];

        const data = [{
            key: '1',
            name: '商品31',
            desc:'商品31描述',
            price:300,
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
                        defaultPageSize: 1,
                        showQuickJumper: true,
                    }}
                />
            </Card>

        )
    }
}
