// 注册请求 判断用户名和邮箱是否重复
module.exports = function (app) {
    app.post('/register', function (req, res) {
        // 读取user model
        var User = global.dbHelper.getModel('user');
        let filter = {
            name: req.body.nickname,

        };
        User.findOne({name: req.body.nickname}, function (error, doc) {
            // 查询注册用户名是否重复
            if (doc) {
                // 用户名重复
                res.send({status: 1, msg: "用户名已存在"})
            } else {
                User.find({email: req.body.em}, function (error, doc) {
                    // 继续查询邮箱是否重复
                    if (doc) {
                        // 邮箱重复
                        res.send({status: 1, msg: "邮箱已经被占用"})
                    }
                    else {
                        // 如用户名和邮箱均不重复 则生成新用户
                        User.create({
                            name: req.body.nickname,
                            password: req.body.password,
                            email: req.body.email,
                            phone: req.body.phone
                        }, function (error, doc) {
                            if (error) {
                                res.send({status: 1, msg: "注册失败，服务器错误"});
                            } else {
                                res.send({status: 0, msg: "注册成功"});
                            }
                        });
                    }
                })

            }
        });
    });
};