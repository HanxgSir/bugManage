var crypto = require('./crypto');
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
                global.username = name;
                res.cookie('hasLogin', crypto.encrypt('bug login is true', 'this is test crypto'), {maxAge: 14 * 24 * 60 * 60 * 1000});
                res.send({status: 0, username: name, msg: "登录成功"});
            }
        });
    })
};