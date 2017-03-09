/**
 * Created by Administrator on 2017/2/27.
 */
import React from 'react';
import { render } from 'react-dom';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';

import Nav from './nav';
import './allBugs.css';

const Option = Select.Option;
const messageCodeStyle = {
    width: '300px',
    height: '85px',
    textAlign: 'center',
    lineHeight: '85px',
    fontWeight: 'bold'
};

export default class AllBugs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 0,
            status: -1,
            bugs: []
        };
        this.queryData = this.queryData.bind(this);
        this.selectLevel = this.selectLevel.bind(this);
        this.selectStatus = this.selectStatus.bind(this);
        this.search = this.search.bind(this);
    }

    render() {
        return (
            <div className="contentBox">
                <Nav />
                <div className="search">
                    <label className="code">
                        编号：<Input type="text" ref="code" placeholder="请输入编号" style={{width:"195px"}}/>
                    </label>
                    <label className="level">
                        级别：
                        <Select style={{width:"120px"}} defaultValue={"0"} onChange={this.selectLevel}>
                            <Option value={"0"}>全部</Option>
                            <Option value={"1"}>一级</Option>
                            <Option value={"2"}>二级</Option>
                            <Option value={"3"}>三级</Option>
                        </Select>
                    </label>
                    <label className="status">
                        状态：
                        <Select style={{width:"120px"}} defaultValue={"0"} onChange={this.selectStatus}>
                            <Option value={"-1"}>全部</Option>
                            <Option value={"0"}>待处理</Option>
                            <Option value={"1"}>已处理</Option>
                            <Option value={"2"}>已关闭</Option>
                        </Select>
                    </label>
                    <button className="search_btn" onClick={this.search}>查询</button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>级别</th>
                        <th>描述</th>
                        <th>提交者</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.bugs.map(function (bug, index) {
                        let complete = this.complete.bind(this, bug.code, index);
                        return <tr key={"bug"+index}>
                            <td>{bug.code}</td>
                            <td>{bug.level}</td>
                            <td>{bug.description}</td>
                            <td>{bug.user}</td>
                            <td>
                                {bug.deleted == 0 ? '待处理' : bug.deleted == 1 ? '已被' + bug.handler + '处理' : '已关闭'}
                            </td>
                            <td>
                                {
                                    bug.deleted == 0 ? <span onClick={complete} className="deal_btn">完成</span> :
                                        <span>已修改</span>
                                }
                            </td>
                        </tr>
                    }.bind(this))}

                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        this.queryData()
    }

    selectLevel(value) {
        this.setState({
            level: value
        })
    }

    selectStatus(value) {
        this.setState({
            status: value
        })
    }

    // 查询
    search() {
        this.queryData();
    }

    // 完成
    complete(code, index) {
        let that = this;
        Modal.confirm({
            title: "完成修改",
            content: '是否确认该问题已修改',
            onOk() {
                $.post('/completeBug', {code: code}, function (data) {
                    console.log(data);
                    if (data.status == 0) {
                        let bugs = that.state.bugs;
                        bugs[index].deleted = '1';
                        bugs[index].handler = data.handler;
                        that.setState({
                            bugs: bugs
                        });
                        message.success(
                            <div style={messageCodeStyle}>
                                bug已处理
                            </div>
                        );
                    }
                })
            }
        });
    }

    queryData() {
        let params = {
            code: this.refs.code.refs.input.value,
            level: this.state.level,
            status: this.state.status
        };
        $.post('/getBugs', params, function (data) {
            console.log(data);
            if (data.status == 0) {
                this.setState({
                    bugs: data.bugs
                })
            }
        }.bind(this))
    }
}