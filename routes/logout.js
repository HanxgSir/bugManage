/**
 * Created by Administrator on 2017/3/1.
 */
module.exports = function (app) {
    app.route('/logout')
        .get(function (req, res) {
            req.session.destroy(function () {
                console.log('logout');
                res.clearCookie("user", {});
                res.cookie("isLogin", "false");
                res.redirect("/");
            });
        });
};