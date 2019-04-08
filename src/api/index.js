
import jsonp from 'jsonp';
import  ajax from './ajax';

//区分开发环境和生产环境
// 或用:const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';
const prefix = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000';

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
export const reqGetCategories = (parentId)=>ajax(prefix+ '/manage/category/list',{parentId});

//请求添加分类函数
export  const reqAddCategory = (parentId,categoryName)=>{
    return ajax(prefix+ '/manage/category/add',{parentId,categoryName},'POST');
}

//请求更新品类名称函数
export  const reqUpdateCategory = (categoryId,categoryName)=>{
    return ajax(prefix+ '/manage/category/update',{categoryId,categoryName},'POST');
}

//请求获取产品分页列表函数
export const reqGetProducts = (pageNum,pageSize)=>ajax(prefix+ '/manage/product/list',{pageNum,pageSize});

//请求创建商品的函数
export const reqCreateProduct = product => ajax(prefix + '/manage/product/create', product, 'POST');
