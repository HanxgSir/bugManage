
var moment =  require('moment');
moment.locale('zh-cn');
module.exports = function (app) {
    app.post('/refer', function (req, res) {
        let Bug = global.dbHelper.getModel('bug');
        let dt  = moment().format('LLL');
        let dtc = new Date();
        Bug.create({
            description: req.body.description,
            browser: req.body.browser,
            level: req.body.level,
            user: req.body.user,
            date: dt,
            code: '' + dtc.getTime() + Math.ceil(Math.random()*10000),
            handler: '',
            deleted:0
        }, function (error, doc) {
            if (error) {
                res.sendStatus(500)
            }
            else {
                res.send({status: 0, msg: '提交成功'});
            }
        });

    })
};