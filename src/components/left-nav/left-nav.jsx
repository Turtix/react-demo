import React,{Component,Fragment} from "react";
import { Menu, Icon} from 'antd';

import  {withRouter,Link} from 'react-router-dom';
import menuList from '../../config/menu-config';
import logo from "../../assets/images/logo.png";
// import './left-nav.less';

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

// 装饰器 --> 向外暴露  withRouter(LeftNav) 生成新组建
// withRouter作用：给非路由组件传递路由组件三个属性（history、location、match）
@withRouter
 class  LeftNav  extends Component{
    constructor(props){
        super(props);
        //创建菜单
        const openKeys = [];
        this.memus = this.createMenu(menuList,openKeys);

        //初始化状态
        this.state = {
            openKeys
        }
    }

    createItem(item){
        return <Item key={item.key}>
            <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
            </Link>
        </Item>
    }

    /**
     * 创建菜单的方法
     * @param menuList
     * @returns {*}
     */
    createMenu(menuList,openKeys){
        // console.log(menuList)
        //获取当前路径
        const {pathname} = this.props.location;
        return menuList.map((menu)=>{
            const children = menu.children;
            if (children){
                //二级菜单
                return  <SubMenu
                    key={menu.key}
                    title={<span><Icon type={menu.icon} /><span>商品</span></span>}
                >
                    {
                        children.map((item)=>{
                            if(pathname === item.key){
                                openKeys.push(menu.key);
                            }
                           return this.createItem(item);
                        })
                    }
                </SubMenu>
            } else {
                //一级菜单
                return this.createItem(menu);
            }
        })
    }

    /**
     * 点击显示二级菜单
     */
    handleOpenChange = (openKeys)=>{
        //导航菜单 的onOpenChange事件是SubMenu 展开/关闭的回调	function(openKeys: string[])
        this.setState({openKeys});
    }
    handleClick = ()=>{
        // 收起所有的二级菜单
        this.setState({openKeys: []});
    }
    render (){
        //获取当前路径
      let {location:{ pathname },opacity} = this.props;
      console.log(pathname)
      if(pathname.startsWith('/product')){
          pathname = '/product';
      }
      return (
          <Fragment>
              <Link to="/home" className="logo" onClick={this.handleClick}>
                  <img src={logo} alt="logo" />
                  <h1 style={{opacity}}>后台管理</h1>
              </Link>

              <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.handleOpenChange}>
                  {
                      this.memus
                  }
              </Menu>
          </Fragment>

      )
    }
}
export default LeftNav
