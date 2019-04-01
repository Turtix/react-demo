/*
  脚手架项目的入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import  {BrowserRouter as Router} from 'react-router-dom';

import App from './App';

import  './assets/less/reset.less';

ReactDOM.render(<Router>
        <App />
    </Router>, document.getElementById('root'));
