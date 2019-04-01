
import  React,{Component} from 'react';

// WrappedComponent 就是传入的包装组件
export default function withHoc(name) {
    //给高阶组件传参数
    return  (WrappedComponent)=> class extends Component {
        //修改From 高阶组件的名字
        static  displayName = `Form(${getDispalyName(WrappedComponent)})`;
        state = {
            username: '',
            password: '',
            rePassword: ''
        }

        // 高阶函数 --> 这样后面就能一直复用当前函数，而不用重新创建了~
        composeChange = (name) => {
            return (e) => this.setState({[name]: e.target.value});
        }

        // 统一所有提交表单函数名
        handleSubmit = (e) => {
            e.preventDefault();
            const { username, password, rePassword } = this.state;
            if(!rePassword){
                alert(`用户名: ${username}, 密码: ${password}`);
            }else {
                alert(`用户名: ${username}, 密码: ${password}, 确认密码: ${rePassword}`);
            }
        }

        render () {
            const mapMethodToProp = {
                composeChange: this.composeChange,
                handleSubmit: this.handleSubmit
            }
            return (
                <div>
                    <h2>{name}</h2>
                    <WrappedComponent {...mapMethodToProp} {...this.state}/>
                </div>
            )
        }
    }
}

//修改From 高阶组件的名字
function getDispalyName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
