// 引入各个模块
import React from 'react';
import {render} from 'react-dom';
import {observer} from 'mobx-react';
import { Router, Route, Link, hashHistory, browserHistory,IndexRoute, Redirect, IndexLink} from 'react-router'

// 引入子组件
import AllBugs from './components/allBugs';
import Refer from './components/refer';
import MyBugs from './components/myBugs';
import Login from './components/login';
import Register from './components/register';

@observer
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

const requireAuth = (nextState, replace) => {
    let hasLogin = localStorage.hasLogin;
    let username = localStorage.username;
    let isLogin = true;
    if (hasLogin == "false") {
        replace({pathname: '/login'})
    }
};

render((
    <Router history={hashHistory}>
        <Route path="/" component={App} onEnter={requireAuth}>
            <IndexRoute component={AllBugs}/>
            <Route path="refer" component={Refer}/>
            <Route path="myBugs" component={MyBugs}/>
        </Route>
        <Route path="/login" component={Login}/>
        <Route path="register" component={Register}/>
    </Router>
), document.getElementById('container'));