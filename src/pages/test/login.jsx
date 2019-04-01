import React,{Component} from "react";

//引入高阶组件
import withHoc from './01.hoc.jsx';

// 受控组件
@withHoc('登录')
class Login extends Component {
    render () {
        const { username, password,composeChange,handleSubmit } = this.props;
        return (
            <div>
                <h2>登陆</h2>
                <form onSubmit={handleSubmit}>
                    用户名: <input type="text" name="username" value={username} onChange={composeChange('username')}/> <br/>
                    密码: <input type="password" name="password" value={password} onChange={composeChange('password')}/> <br/>
                    <input type="submit" value="登陆"/>
                </form>
            </div>
        )
    }
}

//相当于 const newWithHoc = withHoc(Login)
//       export default newWithHoc
export default Login
