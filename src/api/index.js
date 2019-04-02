
import  ajax from './ajax';

//区分开发环境和生产环境
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';

//请求登录参数
export  const reqLogin = (username,password)=>{
    return ajax(prefix+ '/login',{username,password},'POST');
}
