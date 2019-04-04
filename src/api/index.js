
import jsonp from 'jsonp';
import  ajax from './ajax';

//区分开发环境和生产环境
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';

//请求登录参数
export  const reqLogin = (username,password)=>{
    return ajax(prefix+ '/login',{username,password},'POST');
}

//请求天气参数  jsonp请求
export  const reqWeather = (city)=>{
    return new Promise((resolve,reject)=>{
        jsonp(
            `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
            (err,data)=>{
                if(!err,data){
                    // console.log(err,data);
                    const { dayPictureUrl, weather } = data.results[0].weather_data[0];
                    resolve({  weather,weatherImg: dayPictureUrl });
                }else{
                    //提示错误
                    reject('请求失败,网络不稳定!');
                }
            }
        )
    })
}

//请求分类列表数据函数  ajax请求
export const reqGetCategories = (parentId)=>ajax(prefix+ '/manage/category/list',{parentId})
