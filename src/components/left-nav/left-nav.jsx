import React,{Component} from "react";
import { Menu, Icon} from 'antd';

import  {withRouter,Link} from 'react-router-dom';

// import './left-nav.less';


const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

@withRouter
 class  LeftNav  extends Component{
    render (){
      return (
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Item key="1">
              <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
              </Link>
          </Item>
          <SubMenu
              key="sub1"
              title={<span><Icon type="appstore" /><span>商品</span></span>}
          >
              <Item key="3">
                  <Link to="/category">
                    <Icon type="bars" />
                    <span> 品类管理</span>
                  </Link>
              </Item>
              <Item key="4">
                  <Link to="/product">
                      <Icon type="tool" />
                      <span> 商品管理</span>
                  </Link>
              </Item>
          </SubMenu>
          <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
          >
              <Item key="6">Team 1</Item>
              <Item key="8">Team 2</Item>
          </SubMenu>
          <Item key="9">
              <Icon type="file" />
              <span>File</span>
          </Item>
      </Menu>
      )
    }
}
export default LeftNav
