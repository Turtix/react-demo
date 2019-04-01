import React,{Component} from "react";
import { Form, Icon, Input, Button } from 'antd';

import './index.less';

import logo from './logo.png';

const Item = Form.Item;

@Form.create()
 class  Login  extends Component{
    /*
        自定义表单校验
    */
    validator = (rule,value,callback)=>{
        console.log(rule,value);
        const length = value && value.length;
        const pwdReg = /^[a-zA-Z0-9_]+$/;
        if(!value){
            // 必需调用callback, callback如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
            callback('密码不能为空!');
        }else if(length < 4 || length > 12){
            callback('密码必需大于4位,小于12位!');
        }else if(!pwdReg.test(value)){
            callback('密码必须是英文、数组或下划线组成~!');
        }else{
            callback();
        }
    }

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
                                //装饰器 表单校验
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
                           {getFieldDecorator('password', {
                               rules: [
                                    //自定义表单校验
                                    {validator: this.validator}
                               ]
                           })(
                               <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码" />
                            )
                           }
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
