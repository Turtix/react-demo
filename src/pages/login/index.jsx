import React,{Component} from "react";
import { Form, Icon, Input, Button } from 'antd';

import './index.less';

import logo from './logo.png';


const FormItem = Form.Item;
export default  class  Login  extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        return (
           <div className="login">
               <header className="login-header">
                    <img src={logo} alt=""/>
                   <h1>React项目: 后台管理系统</h1>
               </header>
               <section className="login-content">
                    <h3>用户登录</h3>
                   <Form onSubmit={this.handleSubmit} className="login-form">
                       <FormItem>
                           <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                       </FormItem>
                       <FormItem>
                           <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                       </FormItem>
                       <FormItem>
                           <Button type="primary" htmlType="submit" className="login-form-button">
                               登录
                           </Button>
                       </FormItem>
                   </Form>
               </section>
           </div>
        );
    }
}
