/**
 * Created by Administrator on 2017/3/7.
 */
import React from 'react';
import { render } from 'react-dom';
import {observer} from 'mobx-react';
import { Link } from 'react-router'

import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Select from 'antd/lib/select';
import Input from 'antd/lib/input';
import Pagination from 'antd/lib/pagination';

import Nav from './nav'
import './myBugs.css'
import BugsStore from '../store/bugsStore';
const bugsStore = new BugsStore();
const Option = Select.Option;
const messageCodeStyle = {
    width: '300px',
    height: '85px',
    textAlign: 'center',
    lineHeight: '85px',
    fontWeight: 'bold'
};

@observer
export default class MyBugs extends React.Component {
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
        this.onChange = this.onChange.bind(this);
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
                <table className="myBugsTable">
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>级别</th>
                        <th>描述</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bugsStore.bugs.map(function (bug, index) {
                        let close = this.close.bind(this, bug.code, index);
                        let delete_bug = this.delete_bug.bind(this, bug.code, index);
                        return <tr key={"bug"+index}>
                            <td>{bug.code}</td>
                            <td>{bug.level}</td>
                            <td>{bug.description}</td>
                            <td>
                                {bug.deleted == 0 ? '待处理' : bug.deleted == 1 ? '已处理' : '已关闭'}
                            </td>
                            <td>
                                <Link to={"/bugDetail/" + bug._id}>
                                    <span className="check_btn">查看</span>
                                </Link>
                                {bug.deleted < 2 ? <span className="close_btn" onClick={close}>关闭</span> :
                                    <span className="close_btn" onClick={delete_bug}>删除</span>}

                            </td>
                        </tr>
                    }.bind(this))}
                    </tbody>
                </table>
                <div className="pagination">
                    <div style={{float: 'right'}}>
                        <Pagination
                            defaultCurrent={1} total={bugsStore.total}
                            defaultPageSize={bugsStore.pageSize}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.queryData(bugsStore.pageIndex, bugsStore.pageSize);
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
        this.queryData(bugsStore.pageIndex, bugsStore.pageSize);
    }

    // 关闭
    close(code, index) {
        let that = this;
        Modal.confirm({
            title: "关闭bug",
            content: '是否确认关闭该问题',
            onOk(){
                bugsStore.closeBug('/closeBug', {code: code, index: index}, 'POST').then(function (data) {
                    console.log(data);
                });
            }
        })
    }

    // 删除bug
    delete_bug(code, index) {
        let that = this;
        Modal.confirm({
            title: "删除bug",
            content: '是否确认删除该问题',
            onOk(){
                bugsStore.deleteBug('/deleteBug', {code: code, index: index}, 'POST').then(function (data) {
                    console.log(data);
                });
                //$.post('/deleteBug', {code: code}, function (data) {
                //    if (data.status == 0) {
                //        let bugs = that.state.bugs;
                //        bugs.slice(index, 1);
                //        that.setState({
                //            bugs: bugs
                //        });
                //        message.success(
                //            <div style={messageCodeStyle}>
                //                bug已删除
                //            </div>
                //        );
                //    }
                //})
            }
        })
    }

    //分页器
    onChange(pageNumber) {
        console.log('pageNumber', pageNumber);
        this.queryData(pageNumber, bugsStore.pageSize);
    }

    queryData(pageIndex, pageSize) {
        let params = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            code: this.refs.code.refs.input.value,
            level: this.state.level,
            status: this.state.status,
            isSelf: true,
            user: localStorage.username
        };
        bugsStore.getBugs('/getBugs', params, 'POST').then(function (data) {
            console.log(data);
        });
    }
}