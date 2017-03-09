/**
 * Created by Administrator on 2017/2/27.
 */
module.exports = function (app) {
    app.route('/home').get(function (req, res) {
        if (req.session.user) {
            res.render('home/home');
        }
        else {
            res.redirect('/');
        }
    });
};