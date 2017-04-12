var moment = require('moment');
moment.locale('zh-cn');
module.exports = function (app) {
    // 提交bug
    app.post('/refer', function (req, res) {
        if (!req.body.description || !req.body.browser || !req.body.level) {
            res.send({status: 1, msg: '信息填写不完全'});
            return;
        }
        // 获取到bug model
        let Bug = global.dbHelper.getModel('bug');
        let dt = moment().format('LLL');
        let dtc = new Date();
        // 新增数据
        // option1: 指定各个字段值
        // option2: 回调函数
        Bug.create({
                description: req.body.description,
                browser: req.body.browser,
                level: req.body.level,
                files: req.body.files || null,
                user: req.body.user,
                date: dtc,
                date_text: dt,
                code: '' + dtc.getTime() + Math.ceil(Math.random() * 10000),
                handler: '',
                deleted: 0
            },
            function (error, doc) {
                if (error) {
                    res.sendStatus(500)
                }
                else {
                    res.send({status: 0, msg: '提交成功'});
                }
            }
        )
        ;
    })
};