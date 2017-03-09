/**
 * Created by Administrator on 2017/2/27.
 */
module.exports = function (app) {
    require('./login')(app);
    require('./register')(app);
    require('./logout')(app);
    require('./handelbugs')(app);
    require('./home')(app);
    require('./mybugs')(app);
    require('./refer')(app);
};