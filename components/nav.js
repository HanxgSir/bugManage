import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';

import Menu from 'antd/lib/menu';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'mail'
        };
        this.handleClick = (e) => {
            this.setState({
                current: e.key
            });
            this.logout = this.logout.bind(this);
        };
    }

    render() {
        const userStyle = {
            position: "absolute",
            display: "block",
            top: "0",
            right: "90px",
            height: "46px",
            lineHeight: "46px",
            color: 'red'
        };
        const btnStyle = {
            position: "absolute",
            display: "block",
            top: "0",
            right: "25px",
            height: "46px",
            lineHeight: "46px",
            color: 'red',
            cursor: "pointer"
        };
        return (
            <header>
                <nav style={{position:"relative"}}>
                    <Menu
                        theme="dark"
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="all_bugs">
                            <Link to="/">所有问题</Link>
                        </Menu.Item>
                        <Menu.Item key="my_commit">
                            <Link to="myBugs">我提交的</Link>
                        </Menu.Item>
                        <Menu.Item key="commit_bug">
                            <Link to="refer">提交问题</Link>
                        </Menu.Item>
                    </Menu>
                    <span style={userStyle}>{localStorage.username}</span>
                    <span style={btnStyle} onClick={this.logout}>退出</span>
                </nav>

            </header>
        )
    }

    logout() {
        localStorage.hasLogin = false;
        localStorage.username = '';
        location.reload();
    }
}
