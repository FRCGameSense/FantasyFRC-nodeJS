/**
 * Created by steph on 1/29/15.
 */
var express = require('express');
var credentials = require('./credentials.js');
var database = require('./controllers/database.js');
var https = require('https');
var http = require('http');
var passport = require('passport');
var auth = require('./lib/auth.js');

/****** adding database schema ******/
var Team = require('./models/teams.js');
var Event = require('./models/event.js');
var League = require('./models/league.js');
var LeagueMember = require('./models/leaguemember.js');
var TeamEvent = require('./models/teamevent.js');
var User = require('./models/user.js');

/****** controllers ******/
var eventUpdate = require('./controllers/eventUpdate.js');
var teamUpdate = require('./controllers/teamUpdate.js');

/****** create app ******/
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

/****** set port ******/
app.set('port', process.env.PORT || 3000);

/****** set up static magic mapper for handlebars ******/
app.use(express.static(__dirname + '/public'));

/****** set up cookies and sessions ******/
var MongoSessionStore = require('session-mongoose')(require('connect'));
var sessionStore = new MongoSessionStore({url: credentials.mongo.development.connectionString});

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({store: sessionStore,
    secret: credentials.cookieSecret,
    resave: true,
    saveUninitialized: true}));

var auth = require('./lib/auth.js')(app, {
    providers: credentials.authProviders,
    successRedirect: '/dashboard',
    failureRedirect: '/loginneeded'
});
//auth.init() links in Passport middleware:
auth.init();

//now we can specify our auth routes:
auth.registerRoutes();

/****** set up routes ******/
require('./routes.js')(app);

/****** mongoose connection ******/
var mongoose = require('mongoose');
var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
};
switch(app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

/****** get twitter data ******/
/*var twitter = require('./lib/twitter')({
    consumerKey: credentials.twitter.consumerKey,
    consumerSecret: credentials.twitter.consumerSecret
});

twitter.search('#frcbtl', 10, function(result){
    //tweets will be in result.statuses
});*/

/****** DATABASE CONTROLLERS ******/
//eventUpdate.eventUpdate('event/2013mawo');
//teamUpdate.teamDetails('frc254', teamUpdate.teamUpdate('frc254', teamUpdate.matchUpdate('frc254', '2014cama')));

/****** create partials ******/
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    //res.locals.partials.weather = getWeatherData();
    next();
});

/****** 404 catch-all handler (middleware) ******/
app.use(function(req, res){
    res.status(404);
    res.render('404');
});

/****** custom 500 page ******/
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
