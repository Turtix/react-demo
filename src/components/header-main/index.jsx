import React,{Component} from "react";
import {Row,Col,Modal,message} from 'antd';
import {withRouter} from 'react-router-dom';
import dayjs from 'dayjs';



import MyButton from '../my-button';
import {removeItem} from '../../pages/utils/storage-utils';
import memory from '../../pages/utils/memory-utils';
import {reqWeather} from '../../api';
import menuList from '../../config/menu-config';

import './index.less';

@withRouter
class  HeaderMain  extends Component{

    state = {
        sysTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
        weatherImg : 'http://api.map.baidu.com/images/weather/day/qing.png',
        weather:'晴'
    }
    //退出登录
    logout = ()=>{
        Modal.confirm({
            title:'您确认要退出登录吗?',
            onOk: ()=>{
                //清空所有用户信息
                memory.user = {};
                removeItem();
                //跳转到登录页面
                this.props.history.replace('/login');
            },
            okText:'确认',
            cancelText:'取消'
        })
    }

    //更新日期
    componentDidMount() {
        //定时器动态设置时间
        this.interValId = setInterval(()=>{
            this.setState({
                sysTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
        },1000);

        //请求天气数据  用jsonp请求解决跨域问题
        reqWeather('深圳')
            .then(res=>{
                this.setState({
                    weatherImg: res.weatherImg,
                    weather: res.weather
                })
            })
            .catch(err=>message.error(err,2));

    }

    //清除定时器
    componentWillUnmount() {
        clearInterval(this.interValId);
    }

    /**
     * 获取菜单标题
     * @returns {*}
     */
    getTitle = ()=>{
        //获取pathname
        const { pathname } = this.props.location;
        for(let i=0;i < menuList.length ;i++){
            const menu =  menuList[i];
            const children = menu.children;
            if(children){
                for(let j=0 ;j < children.length; j++){
                    if(pathname === children[j].key){
                        return  children[j].title;
                    }
                }
            }else
                if(pathname === menu.key){
                    return menu.title;
                }
            }
        }
    render () {
        const {sysTime,weatherImg,weather} = this.state;
        //获取用户名
        const {username} = memory.user;
        //获取标题
        const title = this.getTitle();
        return (
            <div className="header-main">
                <Row className="header-main-top">
                    <span>欢迎{username}</span>
                    <MyButton onClick={this.logout}>退出</MyButton>
                </Row>
                <Row className="header-main-bottom">
                    <Col className="header-main-left" span={6}>{title}</Col>
                    <Col className="header-main-right" span={18}>
                        <span>{sysTime}</span>
                        <img src={weatherImg} alt="天气"/>
                        <span>{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default  HeaderMain;
