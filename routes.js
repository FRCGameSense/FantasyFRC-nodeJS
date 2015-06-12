/**
 * Created by steph on 2/1/15.
 */
var main = require('./handlers/main.js');
//var user = require('./controllers/userUpdate');
//var dash = require('./controllers/dashboard.js');

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
    app.get('/login', main.login);

    app.get('/dashboard', main.dashboard);
    app.get('/league', main.league);
    app.get('/matchups', main.matchups);
};