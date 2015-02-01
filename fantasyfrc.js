/**
 * Created by steph on 1/29/15.
 */
var express = require('express');

var app = express();

//set up handlebars view engine
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: { //define special links for handlebars that go in {{these}}
        static: function(name) {
            return require('./lib/static.js').map(name);
        },
        link: function() {
            return require('./lib/login.js').link();
        },
        status: function() {
            return require('./lib/login.js').status();
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set port
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

//define routes
app.get('/', function(req, res){
    res.render('home');
});
app.get('/account', function(req, res){
    res.render('account');
});
app.get('/about', function(req, res){
    res.render('about');
});
app.get('/contact', function(req, res){
    res.render('contact');
});
app.get('/dashboard', function(req, res){
    res.render('dashboard');
});
app.get('/league', function(req, res){
    res.render('league');
});
app.get('/lineup', function(req, res){
    res.render('lineup');
});
app.get('/login', function(req, res){
    res.render('login');
});
app.get('/loginneeded', function(req, res){
    res.render('loginneeded');
});
app.get('/matchups', function(req, res){
    res.render('matchups');
});
app.get('/register', function(req, res){
    res.render('register');
});
app.get('/rules', function(req, res){
    res.render('rules');
});
app.get('/statistics', function(req, res){
    res.render('statistics');
});
app.get('/submitBugReport', function(req, res){
    res.render('submitBugReport');
});

//create partials
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    //res.locals.partials.weather = getWeatherData();
    next();
});

//404 catch-all handler (middleware)
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

//custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
