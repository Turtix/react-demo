import React,{Component,Fragment} from "react";
import { Link } from 'react-router-dom';

import {Button, Card, Icon, Table, Select, Input, Modal} from "antd";

import MyButton from '../../components/my-button';
import { reqGetProducts } from  '../../api';

import './index.less';

const Option = Select.Option;

export default  class  Index  extends Component{
    constructor(props){
        super(props);
        this.state = {
            products:[],   //单页产品数据
            total: 0,      //产品数据总数
        }
    }
    //获取产品数据   pageSize默认每页显示三条数据.
    getProducts =async (pageNum,pageSize = 3)=>{
        const result =await reqGetProducts(pageNum,pageSize );
        console.log(result);
        this.setState({
            products: result.data.list,
            total:  result.data.total,
        })
    }
    //页面加载后展示第一页数据
    componentDidMount() {
        this.getProducts(1);
    }
    //为了可复用
    columns = [
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
    render (){
        const { isShowAddProductModal,products,total } = this.state;
        return (
            <Card
                className="category"
                title={
                    <Fragment>
                        <Select value={0}>
                            <Option key={0} value={0}>根据商品名称</Option>
                            <Option key={1} value={1}>根据商品描述</Option>
                        </Select>
                        <Input placeholder="关键字" className="search-input" />
                        <Button type="primary" >搜索</Button>
                    </Fragment>
                }
                extra={<Link to="/product/saveupdate"><Button type="primary" ><Icon type="plus" />添加品类</Button></Link>}
                className="product"
            >
                <Table
                    columns={this.columns}
                    dataSource={products}
                    bordered
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        defaultPageSize: 3,
                        showQuickJumper: true,
                        total,              //根据总数据个数显式页码
                        onChange: this.getProducts,     //切换页码实现动态获取数据
                        onShowSizeChange: this.getProducts,   //切换每页显示个数  动态更新每页展示数据
                    }}
                    rowKey="_id"
                />
            </Card>

        )
    }
}
