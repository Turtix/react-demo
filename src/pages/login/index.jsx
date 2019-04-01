import React,{Component} from "react";
import { Form, Icon, Input, Button } from 'antd';

import './index.less';

import logo from './logo.png';


const Item = Form.Item;
@Form.create()
 class  Login  extends Component{
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
           <div className="login">
               <header className="login-header">
                    <img src={logo} alt=""/>
                   <h1>React项目: 后台管理系统</h1>
               </header>
               <section className="login-content">
                    <h3>用户登录</h3>
                   <Form onSubmit={this.handleSubmit} className="login-form">
                       <Item>
                           {getFieldDecorator('userName', {
                               rules: [
                                   { required: true, whitespace: true, message: '必须输入用户名!' },
                                   {min: 4, message: '用户名必须大于4位'},
                                   {max: 12, message: '用户名必须小于12位'},
                                   {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'}
                               ]
                           })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                           )}
                       </Item>
                       <Item>
                           <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                       </Item>
                       <Item>
                           <Button type="primary" htmlType="submit" className="login-form-button">
                               登录
                           </Button>
                       </Item>
                   </Form>
               </section>
           </div>
        );
    }
}
export default Login
