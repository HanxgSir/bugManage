import React from 'react';
import { render } from 'react-dom';
import {observer} from 'mobx-react';

import BugsStore from '../store/bugsStore';
const bugsStore = new BugsStore();

import Nav from './nav';
import './bugDetail.css'

@observer
export default class BugDetail extends React.Component {
    constructor(props) {
        super(props);
        this.queryData = this.queryData.bind(this);
    }

    render() {
        return (
            <div className="contentBox">
                <Nav />
                <div className="bug_content">
                    <div className="bug_info">
                        <b>Bug编号：</b>
                        <span>{bugsStore.bug.code}</span>
                    </div>
                    <div className="bug_info">
                        <b>Bug状态：</b>
                    <span>
                        {bugsStore.bug.deleted == 0 ?
                            '待处理' : bugsStore.bug.deleted == 1 ? '已被' + bugsStore.bug.handler + '处理' :
                            '已关闭'}
                    </span>
                    </div>
                    <div className="bug_info">
                        <b>Bug级别：</b>
                        <span>{bugsStore.bug.level}</span>
                    </div>
                    <div className="bug_info">
                        <b>Bug描述：</b>
                        <span>{bugsStore.bug.description}</span>
                    </div>
                    <div className="bug_info">
                        <b>测试用浏览器：</b>
                        <span>{bugsStore.bug.browser}</span>
                    </div>
                    <div className="bug_info">
                        <b>提交时间：</b>
                        <span>{bugsStore.bug.date_text}</span>
                    </div>
                </div>
            </div>
        )
    }


    componentDidMount() {
        this.queryData();
    }

    queryData() {
        //console.log(this.props.params.id);
        bugsStore.getBugDetail('/getBugDetail/' + this.props.params.id, 'GET').then(function (data) {
            console.log(data);
        })
    }
}