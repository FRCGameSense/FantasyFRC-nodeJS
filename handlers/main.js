/**
 * Created by steph on 2/1/15.
 */

exports.home = (function (req, res) {
    res.render('home');
});
exports.account = function (req, res) {
    res.render('account');
};
exports.about = (function (req, res) {
    res.render('about');
});
exports.contact = (function (req, res) {
    res.render('contact');
});
exports.dashboard = (function (req, res) {
    if(!req.session.passport.user)
        return res.redirect(303, '/loginneeded');
    res.render('dashboard');
});
exports.league = (function (req, res) {
    res.render('league');
});
exports.lineup = (function (req, res) {
    res.render('lineup');
});
exports.login = (function (req, res) {
//    req.session.userName =
    res.render('login');
});
exports.loginneeded = (function (req, res) {
    res.render('loginneeded');
});
exports.matchups = (function (req, res) {
    res.render('matchups');
});
exports.register = (function (req, res) {
    res.render('register');
});
exports.rules = (function (req, res) {
    res.render('rules');
});
exports.statistics = (function (req, res) {
    res.render('statistics');
});
exports.submitBugReport = (function (req, res) {
    res.render('submitBugReport');
});