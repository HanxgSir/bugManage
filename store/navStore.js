import axios from 'axios';
import {observable, computed, reaction} from 'mobx';

export default class NavStore {
    @observable current = "allBugs";

    navClick(key) {
        // todo 页面刷新时导航有问题
        this.current = key;
    }
}
