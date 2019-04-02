import React,{Component} from "react";
import { Menu, Icon} from 'antd';

import  {withRouter,Link} from 'react-router-dom';

// import './left-nav.less';


const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

// 装饰器 --> 向外暴露  withRouter(LeftNav) 生成新组建
// withRouter作用：给非路由组件传递路由组件三个属性（history、location、match）
@withRouter
 class  LeftNav  extends Component{
    render (){
        //获取当前路径
      const {pathname} = this.props.location;
      return (
       // 1.为了刷新页面,当前选中菜单不会跳转到默认设置 而是和路由保持一致
       // 需要将defaultSelectedKeys的值改成[pathname] ,同样key值也要修改为对应的路径
          //2.为了展开显示二级菜单sub1  添加defaultOpenKeys={['sub1']}
      <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline" defaultOpenKeys={['sub1']}>
          <Item key="/home">
              <Link to="/home">
              <Icon type="home" />
              <span>首页</span>
              </Link>
          </Item>
          <SubMenu
              key="sub1"
              title={<span><Icon type="appstore" /><span>商品</span></span>}
          >
              <Item key="/category">
                  <Link to="/category">
                    <Icon type="bars" />
                    <span> 品类管理</span>
                  </Link>
              </Item>
              <Item key="/product">
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
