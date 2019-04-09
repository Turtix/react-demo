import React,{Component} from "react";
import {Route,Switch,Redirect} from 'react-router-dom';
import {Layout} from 'antd';

import {getItem } from '../../utils/storage-utils';
import memory from '../../utils/memory-utils';
import LeftNav from '../../components/left-nav/left-nav.jsx';
import Home from '../home';
import Category from '../category';
import Product from '../product';
import HeaderMain from '../../components/header-main';
import User from '../user';
import Role from '../role';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Pie from '../charts/pie';

import './admin.less';

const {Header, Content, Footer,Sider} = Layout;

export default  class  Admin  extends Component{
    /*
        1. 要持久化存储用户信息 --> localStorage
        2. 性能优化（反复使用这些getItem等方法， 性能不好，所以保存在内存中）
  */
    constructor(props){
        super(props);
        this.state = {
            collapsed: false
        };

        //判断用户是否登陆过
        const user = getItem();
        // console.log(user)
        if(user && user._id){
            //在内存中存储用户信息
            memory.user = user;
        }

    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed ,opacity: collapsed ? 0:1 });

    }

    render() {
        if(! memory.user ||  !memory.user._id){
            return <Redirect to="/login"/>
        }
        const { collapsed } = this.state;
        const opacity = collapsed ? 0:1;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}
                >
                    <LeftNav opacity={opacity}/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 ,height:100}} >
                        <HeaderMain />
                    </Header>
                    <Content style={{ margin: '20px 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/category" component={Category}/>
                                <Route path="/product" component={Product}/>
                                <Route path="/user" component={User}/>
                                <Route path="/role" component={Role}/>
                                <Route path="/charts/line" component={Line}/>
                                <Route path="/charts/bar" component={Bar}/>
                                <Route path="/charts/pie" component={Pie}/>
                                <Redirect to="/home"/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        推荐使用谷歌浏览器，可以获得更佳页面操作体验
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
