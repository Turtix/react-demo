import React,{Component,Fragment} from "react";
import { Link } from 'react-router-dom';

import {Button, Card, Icon, Table, Select, Input,message} from "antd";

import MyButton from '../../../components/my-button';
import { reqGetProducts,reqSearch} from '../../../api';

import './index.less';

const Option = Select.Option;

export default  class  Product   extends Component{
    constructor(props){
        super(props);
        this.state = {
            products:[],   //单页产品数据
            total: 0,      //产品数据总数
            searchType: 'productName', //根据搜索的类型
            searchContent: '',         //根据搜索的内容
            pageNum: 1,               //当前页码
            pageSize: 3,             //每页显示条数
        }
        this.searchContentInput = React.createRef();
    }
    //获取产品数据   pageSize默认每页显示三条数据.
    getProducts =async (pageNum,pageSize = 3)=>{
        //获取数据
        const { searchType} = this.state;
        const searchContent = this.searchContent
        let result=null;
        if(searchContent){
            //根据搜索条件搜索数据
            result =await reqSearch({
                [searchType]: searchContent,
                pageNum,
                pageSize
            });
        }else{
            result =await reqGetProducts(pageNum,pageSize );
        }
        if(result.status === 0){
            this.setState({
                products: result.data.list,
                total:  result.data.total,
                pageNum: pageNum,
                pageSize: pageSize
            })
        }else{
            message.error(result.msg);
        }

    }

    //修改产品数据
    updateProduct = (product)=>{
        return ()=>{
            //路由组件都可以使用history属性.  push方法可以携带一个参数product并将它传递到saveupdate页面.
            this.props.history.push('/product/saveupdate',product);
        }
    }

    //页面加载后展示第一页数据
    componentDidMount() {
        this.getProducts(1);
    }
    //select选择框没有e.target  获取选择框的值
    handleSelect = (value)=>{
        this.setState({
            searchType: value
        })
    }
    //获取输入框的值
    handleChange = (e)=>{
        this.setState({
            searchContent: e.target.value
        })
    }
    //点击搜索
    search = ()=>{
        this.searchContent = this.searchContentInput.current.state.value;
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
            // dataIndex: 'operator',    //如果有dataIndex,render方法的参数就不能起作用.
            render: product => <div>
                <MyButton>详情</MyButton>
                <MyButton onClick={this.updateProduct(product)}>修改</MyButton>
            </div>,
        }];
    render (){
        const { products,total,searchType, searchContent} = this.state;
        return (
            <Card
                className="category"
                title={
                    <Fragment>
                        {/* 默认值: defaultValue  通过受控组件传递数据*/}
                        <Select defaultValue='productName' onChange={this.handleSelect}>
                            <Option key={0} value='productName'>根据商品名称</Option>
                            <Option key={1} value='productDesc'>根据商品描述</Option>
                        </Select>
                        <Input placeholder="关键字" className="search-input"  ref={this.searchContentInput}/>
                        <Button type="primary" onClick={this.search}>搜索</Button>
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
