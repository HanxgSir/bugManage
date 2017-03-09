/**
 * Created by Administrator on 2017/2/28.
 */
var moment =  require('moment');
moment.locale('zh-cn');
module.exports = function (app) {
    app.route('/refer').get(function (req, res) {
        if (req.session.user) {
            res.render('refer/refer');
        }
        else {
            res.redirect('/');
        }
    });

    app.post('/refer', function (req, res) {
        console.log('req',req.body);
        let Bug = global.dbHelper.getModel('bug');
        let dt  = moment().format('LLL');
        let dtc = new Date();
        console.log(dt);
        Bug.create({
            description: req.body.description,
            browser: req.body.browser,
            level: req.body.level,
            user: req.session.user,
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