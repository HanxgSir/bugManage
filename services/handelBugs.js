var crypto = require('./crypto');
module.exports = function (app) {
    // 查询bugs
    app.post('/getBugs', function (req, res) {
        // 检测是否登录 解密cookie hasLogin字段 如未登录则跳转到登录界面（未加）
        if (crypto.decrypt(req.cookies.hasLogin, 'this is test crypto') != 'bug login is true') {
            res.send({status: '1', msg: '登录超时'});
            return;
        }
        // 获取到bug model
        let bug = global.dbHelper.getModel('bug');
        // 接收参数
        let code = req.body.code;
        let level = req.body.level;
        let pageIndex = req.body.pageIndex || 1;
        let pageSize = req.body.pageSize || 30;
        let status = req.body.status;
        let isSelf = req.body.isSelf || false;
        // 根据发过来的参数生成查询条件
        let filter = {};
        if (level != 0) {
            filter.level = level;
        }
        if (code != '') {
            filter.code = code;
        }
        if (status != -1) {
            filter.deleted = status;
        }
        if (isSelf) {
            filter.user = req.body.user
        }
        // 查询操作
        // option1:查询条件
        // option2:查询字段
        // option3:游标操作 skip为偏移量 limit限制返回结果数量 实现分页查询
        bug.find(filter, null, {
            sort: {'date': -1}, // 按日期倒序排序返回
            skip: (pageIndex - 1 ) * pageSize,
            limit: pageSize
        }, function (error, docs) {
            // 请求成功 返回查询结果
            res.send({bugs: docs, status: '0'});
        });

        //查询所有符合查询条件的数据
        //bug.find(filter, function (error, docs) {
        //    res.send({bugs: docs, status: '0'});
        //})
    });

    // 处理bug
    app.post('/completeBug', function (req, res) {
        let bug = global.dbHelper.getModel('bug');
        let code = req.body.code;
        // 数据库跟新
        // option1:指定查询条件
        // option2:需要更新的字段及更新后的值
        // option3:回调
        bug.update({code: code}, {deleted: '1', handler: global.username}, function (error, docs) {
            if (docs) {
                res.send({handler: global.username, deleted: '1', status: '0'});
            }
        })
    });

    //关闭bug
    app.post('/closeBug', function (req, res) {
        let bug = global.dbHelper.getModel('bug');
        let code = req.body.code;
        bug.update({code: code}, {deleted: '2'}, function (error, docs) {
            res.send({deleted: '2', status: '0'});
        })
    });

    // 删除bug
    app.post('/deleteBug', function (req, res) {
        let bug = global.dbHelper.getModel('bug');
        let code = req.body.code;
        // 数据库删除数据
        // option1: 查询条件 查询到符合条件的进行删除
        // option2: 回调
        bug.remove({code: code}, function (error, docs) {
            res.send({status: '0'});
        })
    })
};