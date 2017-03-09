/**
 * Created by Administrator on 2017/3/8.
 */
module.exports = function (app) {
    // 查询bugs
    app.post('/getBugs', function (req, res) {
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
            filter.user = req.session.user
        }
        bug.find(filter, function (error, docs) {
            res.send({bugs: docs, status: '0'});
        })
    });

    // 处理bug
    app.post('/completeBug', function (req, res) {
        let bug = global.dbHelper.getModel('bug');
        let code = req.body.code;
        bug.update({code: code}, {deleted: '1', handler: req.session.user}, function (error, docs) {
            res.send({handler: req.session.user, status: '0'});
        })
    });

    //关闭bug
    app.post('/closeBug', function (req, res) {
        let bug = global.dbHelper.getModel('bug');
        let code = req.body.code;
        bug.update({code: code}, {deleted: '2'}, function (error, docs) {
            res.send({bugs: docs, status: '0'});
        })
    });

    // 删除bug
    app.post('/deleteBug', function (req, res) {
        let bug = global.dbHelper.getModel('bug');
        let code = req.body.code;
        bug.remove({code: code}, function (error, docs) {
            res.send({bugs: docs, status: '0'});
        })
    })
};