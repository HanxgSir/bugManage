/**
 * Created by Administrator on 2017/3/8.
 */

module.exports = function (app) {
    app.route('/mybugs').get(function (req, res) {
        if (req.session.user) {
            res.render('myBugs/myBugs')
        }
        else {
            res.redirect('/')
        }
    });
};