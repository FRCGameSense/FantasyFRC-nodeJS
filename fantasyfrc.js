/**
 * Created by steph on 1/29/15.
 */
var express = require('express');

var app = express();

//set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//set port
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('home');
});
app.get('/about', function(req, res){
    res.render('account');
});
app.get('/about', function(req, res){
    res.render('about');
});
app.get('/about', function(req, res){
    res.render('league');
});
app.get('/about', function(req, res){
    res.render('lineup');
});
app.get('/about', function(req, res){
    res.render('login');
});
app.get('/about', function(req, res){
    res.render('matchups');
});
app.get('/about', function(req, res){
    res.render('register');
});
app.get('/about', function(req, res){
    res.render('rules');
});
app.get('/about', function(req, res){
    res.render('statistics');
});
app.get('/about', function(req, res){
    res.render('submitBugReport');
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
