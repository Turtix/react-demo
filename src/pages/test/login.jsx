import React,{Component} from "react";
import { Form, Icon, Input, Button } from 'antd';

import './index.less';

const Item = Form.Item;

// 受控组件
class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    // 高阶函数 --> 这样后面就能一直复用当前函数，而不用重新创建了~
    composeChange = (name) => {
        return (e) => this.setState({[name]: e.target.value});
    }

    // 统一所有提交表单函数名
    login = (e) => {
        e.preventDefault();
        const { username, password, rePassword } = this.state;
        alert(`用户名: ${username}, 密码: ${password}`);
    }

    render () {
        const { username, password } = this.state;
        return (
            <div>
                <h2>登陆</h2>
                <form onSubmit={this.login}>
                    用户名: <input type="text" name="username" value={username} onChange={this.composeChange('username')}/> <br/>
                    密码: <input type="password" name="password" value={password} onChange={this.composeChange('password')}/> <br/>
                    <input type="submit" value="登陆"/>
                </form>
            </div>
        )
    }
}

