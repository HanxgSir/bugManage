/**
 * Created by Administrator on 2017/2/28.
 */
import React from 'react';
import ReactDom,{ render } from 'react-dom';

import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Nav from './nav'

import BugsStore from '../store/bugsStore';
import './refer.css';
const bugStore = new BugsStore();

const Option = Select.Option;
const messageCodeStyle = {
    width: '300px',
    height: '85px',
    textAlign: 'center',
    lineHeight: '85px',
    fontWeight: 'bold'
};

export default class Refer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 0
        };
        this.selectLevel = this.selectLevel.bind(this);
        this.submit_bugs = this.submit_bugs.bind(this);
    }

    render() {
        return (
            <div className="contentBox">
                <Nav />
                <div className="bug">
                    <label>
                        <span> 问题描述：</span>
                        <textarea rows="10" ref="description"/>
                    </label>
                    <label>
                        <span>测试用浏览器：</span>
                        <Input style={{width:"165px"}} ref="browser"/>
                    </label>
                    <label>
                        <span>问题级别：</span>
                        <Select style={{width:"120px"}} defaultValue={"0"} ref="level" onChange={this.selectLevel}
                                onFocus={()=>{}}>
                            <Option value={"0"}>请选择</Option>
                            <Option value={"1"}>一&emsp;级</Option>
                            <Option value={"2"}>二&emsp;级</Option>
                            <Option value={"3"}>三&emsp;级</Option>
                        </Select>
                    </label>
                    <button className="submit_btn" onClick={this.submit_bugs}>提交</button>
                </div>
            </div>
        )
    }

    // 取select value
    selectLevel(value) {
        this.setState({
            level: value
        })
    }

    // 提交
    submit_bugs() {
        if (this.refs.description.value == 0) {
            this.refs.description.focus();
            message.success(
                <div style={messageCodeStyle}>
                    未填写bug描述
                </div>
            );
            return;
        }
        if (this.refs.browser.refs.input.value == '') {
            this.refs.browser.refs.input.focus();
            message.success(
                <div style={messageCodeStyle}>
                    未填写产生bug浏览器
                </div>
            );
            return;
        }
        if (this.state.level == 0) {
            // 原生方法获得焦点
            document.querySelector('.ant-select-selection').focus();
            this.refs.level.open = true;
            message.success(
                <div style={messageCodeStyle}>
                    未填写bug级别
                </div>
            );
            return;
        }
        let params = {
            description: this.refs.description.value,
            browser: this.refs.browser.refs.input.value,
            level: this.state.level,
            user: localStorage.username
        };
        Modal.confirm({
            title: "提交bug",
            content: '是否确认提交该bug',
            onOk() {
                bugStore.addBug('/refer', params, 'POST').then(function (data) {
                    if (data.status == 1) {
                        message.success(
                            <div style={messageCodeStyle}>
                                {data.msg}
                            </div>
                        )
                    }
                });
            }
        });
    }
}