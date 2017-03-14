// 注册请求
module.exports = function (app) {
    app.post('/register', function (req, res) {
        // 读取user model
        var User = global.dbHelper.getModel('user');
        // 查询注册用户名是否重复
        User.findOne({name: req.body.nickname}, function (error, doc) {
            if (doc) {
                res.send({status: 1, msg: "用户名已存在"})
            } else {
                // 如不重复 向model添加新用户
                User.create({
                    name: req.body.nickname,
                    password: req.body.password,
                    email: req.body.email,
                    phone: req.body.phone
                }, function (error, doc) {
                    if (error) {
                        res.sendStatus(500);
                    } else {
                        res.send({status: 0, msg: "注册成功"});
                    }
                });
            }
        });
    });
};