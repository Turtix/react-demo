// 为什么要引入React，因为jsx语法会被编译成React.createElement
import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';

import Login from './pages/login';
import Admin from './pages/admin/admin.jsx';


//测试高阶组件
/*import A from './pages/test/register';
import B from './pages/test/login';*/

export default class App extends Component {
  render() {
    return (
        <div>
            {/*<A/>
            <B/>*/}
            <Switch>
                <Route  path="/login" component={Login}/>
                {/*<Redirect to="/login"/>*/}
                <Route  path="/" component={Admin}/>
            </Switch>
        </div>
    )
  }
}


