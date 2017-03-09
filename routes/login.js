/**
 * Created by Administrator on 2017/2/27.
 */
module.exports = function (app) {
    app.route('/')
        .get(function (req, res) {
            res.render('login/login');
        });

    app.post('/login', function (req, res) {
        var User = global.dbHelper.getModel('user'),
            name = req.body.username,
            password = req.body.password;
        User.findOne({name: name}, function (error, doc) {
            if (doc == null) {
                res.send({status: 1, msg: "用户名不存在"});
            }
            else if (doc.password != password) {
                res.send({status: 1, msg: "密码错误"});
            }
            else {
                res.cookie('username', name, {domain: '/', maxAge: 14 * 24 * 60 * 60 * 1000});
                req.session.user = name;
                req.session.hasLogin = true;
                req.session.cookie = {
                    user: name
                };
                res.send({status: 0, msg: "登录成功"});
            }
        });
    })
};