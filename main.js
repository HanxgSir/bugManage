/**
 * Created by Administrator on 2017/3/9.
 */

import React from 'react';
import {render} from 'react-dom';

// 引入React-router模块
import { Router, Route, Link, hashHistory, browserHistory,IndexRoute, Redirect, IndexLink} from 'react-router'
// 引入ant menu组件
import Menu from 'antd/lib/menu';
const SubMenu = Menu.SubMenu;

// 引入子组件
import AllBugs from './components/allBugs';
import Refer from './components/refer';
import MyBugs from './components/myBugs';
import Register from './components/register';
import Login from './components/login';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail'
        };
        this.handleClick = (e) => {
            console.log('click ', e);
            this.setState({
                current: e.key
            });
        };
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

const requireAuth = (replace) => {
    if (false) {
        replace({ pathname: '/' })
    }
};

render((
    <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={requireAuth(replace)}>
            <IndexRoute component={AllBugs}/>
            <Route path="refer" component={Refer}/>
            <Route path="register" component={Register}/>
            <Route path="myBugs" component={MyBugs}/>
        </Route>
        <Route path="/login" component={Login}/>
    </Router>
), document.getElementById('container'));