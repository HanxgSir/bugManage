/**
 * Created by Administrator on 2017/2/21.
 */
//引用模块
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const session = require('express-session');
global.dbHelper = require('./common/dbHelper.js');
global.db = mongoose.connect('mongodb://localhost/bugManage');
db.connection.on('error', function (error) {
    console.log(error);
});
db.connection.on("open", function () {
    console.log("——数据库连接成功！——");
});
// 定义模板
app.set('view engine', "jade");        // 设置模板引擎
app.set('views', __dirname + '/');   // 设置模板相对路径（相对当前目录）

//调用中间件使用
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        user: "default",
        maxAge: 14 * 24 * 60 * 60 * 1000 // 超时时间14天
    }
}));

// 设置静态文件路径
app.use(express.static(path.join(__dirname, '/public')));
require('./services')(app);

const server = app.listen(8080);
console.log('server is start');