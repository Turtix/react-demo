import React,{Component} from "react";
import {Row,Col,Modal,message} from 'antd';


import MyButton from '../my-button';

import './index.less';

export default  class  HeaderMain  extends Component{
    render (){
      return (
          <div className="header-main">
               <Row className="header-main-top">
                    <span>欢迎xxx</span>
                   <MyButton >退出</MyButton>
               </Row>
              <Row className="header-main-bottom">
                  <Col className="header-main-left" span={6}>用户管理</Col>
                  <Col className="header-main-right" span={18}>
                      <span>2019-04-01 12:28:12</span>
                      <img src="" alt="天气"/>
                      <span>晴</span>
                  </Col>
              </Row>
          </div>
      )
    }
}
