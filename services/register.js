
// 注册请求
module.exports = function (app) {
    app.post('/register', function (req, res) {
        var User = global.dbHelper.getModel('user');
        User.findOne({name: req.body.nickname}, function (error, doc) {
            if (doc) {
                res.send({status:1,msg:"用户名已存在"})
            } else {
                User.create({
                    name: req.body.nickname,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone
                }, function (error, doc) {
                    if (error) {
                        res.sendStatus(500);
                    } else {
                        res.send({status:0,msg:"注册成功"});
                    }
                });
            }
        });
    });
};