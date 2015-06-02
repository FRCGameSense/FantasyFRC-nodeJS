/**
 * Created by steph on 2/1/15.
 */
var main = require('./handlers/main.js');
var user = require('./controllers/userUpdate');

module.exports = function(app) {

//define routes
    app.get('/', main.home);
    app.get('/about', main.about);
    app.get('/contact', main.contact);
    app.get('/lineup', main.lineup);
    app.get('/loginneeded', main.loginneeded);
    app.get('/register', main.register);
    app.get('/rules', main.rules);
    app.get('/statistics', main.statistics);
    app.get('/submitBugReport', main.submitBugReport);
    app.get('/account', user.registerRoutes);
    app.get('/login', main.login);

/*    app.get('/account', user.account);
    app.get('/dashboard', user.dashboard);
    app.get('/league', user.league);

    app.get('/matchups', user.matchups);*/

};