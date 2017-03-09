/**
 * Created by Administrator on 2017/3/9.
 */
module.exports = function (app) {
    app.route('/')
        .get(function (req, res) {
            res.render('index');
        });
    require('./handelBugs')(app);
};