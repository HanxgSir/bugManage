import React from 'react';
import { render } from 'react-dom';
import {observer} from 'mobx-react';

import BugsStore from '../store/bugsStore';
const bugsStore = new BugsStore();

import Nav from './nav';
import UploadBox from './upload';
import './bugDetail.css'

@observer
export default class BugDetail extends React.Component {
    constructor(props) {
        super(props);
        this.queryData = this.queryData.bind(this);
        this.renderHandleText = this.renderHandleText.bind(this);
    }

    render() {
        let handlerStyle = bugsStore.bug.handler == "" ? {display: "none"} : {display: "block"};
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
                            '待处理' : bugsStore.bug.deleted == 1 ? '已处理' :
                            '已关闭'}
                    </span>
                    </div>
                    <div className="bug_info" style={handlerStyle}>
                        <b>操作人：</b>
                        <span>{bugsStore.bug.handler}</span>
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
                        <b>{this.renderHandleText()}</b>
                        <span>{bugsStore.bug.date_text}</span>
                    </div>
                    <div className="bug_info">
                        <b>相关图片：</b>
                        <UploadBox
                            ref="showFiles"
                            fileList={bugsStore.bug.files}
                        />
                    </div>
                </div>
            </div>
        )
    }


    componentDidMount() {
        this.queryData();
    }

    renderHandleText() {
        if (bugsStore.bug.deleted == 0) {
            return "提交时间："
        }
        else if (bugsStore.bug.deleted == 1) {
            return "完成时间："
        }
        else if (bugsStore.bug.deleted == 2) {
            return "关闭时间："
        }
    }

    queryData() {
        let that = this;
        bugsStore.getBugDetail('/getBugDetail/' + this.props.params.id, 'GET').then(function (data) {
            console.log(data);
        }).then(function () {
            // 手动调用上传图片组件的方法更新state
            that.refs.showFiles.setFiles(bugsStore.bug.files)
        })
    }
}