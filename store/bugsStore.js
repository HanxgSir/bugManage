// 调用中间件
import FormData from 'form-data';
import axios from 'axios';
import Promise from 'es6-promise';
import {observable, computed, reaction,action} from 'mobx';

export default class BugsStore {
    @observable bugs = [];
    @observable bug = {};
    @observable bugFiles = [];
    @observable total = 0;
    @observable pageIndex = 1;
    @observable pageSize = 5;
    // 查询所有bugs
    @action
    getBugs(url, params, method) {
        let that = this;
        //let formData = new FormData();
        //Object.keys(params).forEach(key => formData.append(key, params[key]));
        return axios({
            method: method,
            url: url,
            data: params
        }).then(function (response) {
            if (response.data.status == 0) {
                that.bugs = response.data.bugs;
                that.total = response.data.total;
                that.pageIndex = response.data.pageIndex;
                that.pageSize = response.data.pageSize;
            }
            else {
                that.bugs = [];
                that.total = 0;
                that.pageIndex = 1;
            }
            return response.data;
        }).catch(function (error) {
            return error;
        });
    }

    // 查询bug详情
    @action
    getBugDetail(url, method) {
        let that = this;
        return axios({
            method: method,
            url: url
        }).then(function (response) {
            if (response.data.status == 0) {
                let _bug = response.data.bugDetail;
                that.bug = response.data.bugDetail;
                console.log('storeBug==',_bug)
            }
            return response.data;
        }).catch(function (error) {
            return error;
        });
    }

    // 处理bug
    completeBug(url, params, method) {
        let that = this;
        return axios({
            method: method,
            url: url,
            data: params
        }).then(function (response) {
            if (response.data.status == 0) {
                that.bugs[params.index].deleted = response.data.deleted;
                that.bugs[params.index].handler = response.data.handler;
            }
            return response.data;
        }).catch(function (error) {
            return error;
        });
    }

    // 关闭bug
    closeBug(url, params, method) {
        let that = this;
        return axios({
            method: method,
            url: url,
            data: params
        }).then(function (response) {
            console.log(response);
            if (response.data.status == 0) {
                that.bugs[params.index].deleted = response.data.deleted;
            }
            return response.data;
        }).catch(function (error) {
            return error;
        });
    }

    // 删除bug
    deleteBug(url, params, method) {
        let that = this;
        return axios({
            method: method,
            url: url,
            data: params
        }).then(function (response) {
            if (response.data.status == 0) {
                that.bugs.splice(params.index, 1);
            }
            return response.data;
        }).catch(function (error) {
            return error;
        });
    }

    // 提交bug
    addBug(url, params, method) {
        return axios({
            method: method,
            url: url,
            data: params
        }).then(function (response) {
            console.log(response);
            if (response.data.status == 0) {
                this.bugs = response.data.bugs;
            }
            return response.data;
        }).catch(function (error) {
            return error;
        });
    }
}
