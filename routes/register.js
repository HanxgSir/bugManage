/**
 * Created by Administrator on 2017/2/27.
 */
module.exports = function (app) {
    app.route('/register')
        .get(function (req, res) {
            res.render('register/register');
        });

    app.post('/register', function (req, res) {
        var User = global.dbHelper.getModel('user');
        User.findOne({name: req.body.nickname}, function (error, doc) {
            if (doc) {
                //req.session.error = '用户名已存在！';
                //res.sendStatus(500);
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
                        //req.session.error = '用户名创建成功！';
                        res.send({status:0,msg:"注册成功"});
                    }
                });
            }
        });
    });
};