import React from 'react';
import { render } from 'react-dom';
import {Link} from 'react-router';
// 引入ant menu组件
import Menu from 'antd/lib/menu';
export default class Nav extends React.Component {
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
            <header>
                <nav>
                    <Menu
                        theme="dark"
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                    >
                        <Menu.Item key="all_bugs">
                            <Link to="/">所有问题</Link>
                        </Menu.Item>
                        <Menu.Item key="my_commit" >
                            <Link to="myBugs">我提交的</Link>
                        </Menu.Item>
                        <Menu.Item key="commit_bug">
                            <Link to="refer">提交问题</Link>
                        </Menu.Item>
                    </Menu>
                </nav>
                <content>
                    {this.props.children}
                </content>
            </header>
        )
    }
}
