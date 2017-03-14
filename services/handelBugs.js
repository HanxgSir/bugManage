var crypto = require('./crypto');
module.exports = function (app) {
    // 查询bugs
    app.post('/getBugs', function (req, res) {
        if (crypto.decrypt(req.cookies.hasLogin, 'this is test crypto') != 'bug login is true') {
            res.send({status: '1', msg: '登录超时'});
            return;
        }
        let bug = global.dbHelper.getModel('bug');
        let code = req.body.code;
        let level = req.body.level;
        let status = req.body.status;
        let isSelf = req.body.isSelf || false;
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
        bug.find(filter, function (error, docs) {
            res.send({bugs: docs, status: '0'});
        })
    });

    // 处理bug
    app.post('/completeBug', function (req, res) {
        let bug = global.dbHelper.getModel('bug');
        let code = req.body.code;
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
        bug.remove({code: code}, function (error, docs) {
            res.send({status: '0'});
        })
    })
};