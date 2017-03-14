/**
 * Created by Administrator on 2017/3/1.
 */
module.exports = function (app) {
    app.route('/logout')
        .get(function (req, res) {
            req.session.destroy(function () {
                res.cookie("hasLogin", "bug login is false");
                res.redirect("/");
            });
        });
};