module.exports = function (app) {
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
                res.cookie('username', name, {maxAge: 14 * 24 * 60 * 60 * 1000});
                res.cookie('hasLogin', true, {maxAge: 14 * 24 * 60 * 60 * 1000});
                req.session.user = name;
                req.session.hasLogin = true;
                req.session.cookie = {
                    user: name,
                    hasLogin: true
                };
                res.send({status: 0, username: name, msg: "登录成功"});
            }
        });
    })
};