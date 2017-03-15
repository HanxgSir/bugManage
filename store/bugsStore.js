// 调用中间件
import FormData from 'form-data';
import axios from 'axios';
import Promise from 'es6-promise';
import {observable, computed, reaction} from 'mobx';

export default class BugsStore {
    @observable bugs = [];
    @observable total = 0;
    @observable pageIndex = 1;
    @observable pageSize = 5;
    // 获取所有bugs
    getBugs(url, params, method) {
        let that = this;
        //let formData = new FormData();
        //Object.keys(params).forEach(key => formData.append(key, params[key]));
        axios({
            method: method,
            url: url,
            data: params
        }).then(function (response) {
            that.bugs = response.data.bugs;
            that.total = response.data.total;
            that.pageIndex = response.data.pageIndex;
            that.pageSize = response.data.pageSize;
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
        axios({
            method: method,
            url: url,
            data: params
        }).then(function (response) {
            console.log(response);
            if (response.data.status == 0) {
                that.bugs[params.index].deleted = response.data.deleted;
            }
        }).catch(function (error) {
            return error;
        });
    }

    // 删除bug
    deleteBug(url, params, method) {
        let that = this;
        axios({
            method: method,
            url: url,
            data: params
        }).then(function (response) {
            if (response.data.status == 0) {
                that.bugs.splice(params.index, 1);
            }
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
