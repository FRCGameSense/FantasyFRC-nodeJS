var User = require('../models/user.js'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err || !user) return done(err, null);
        done(null, user);
    });
});

module.exports = function(app, options){
    //if success and failure redirects aren't specified, set reasonable defaults
    if(!options.successRedirect) options.successRedirect = '/dashboard';
    if(!options.failureRedirect) options.failureRedirect = '/login';

    return {
        init: function(){
            var env = app.get('env');
            var config = options.providers;

            //configure Facebook strategy
            passport.use(new FacebookStrategy({
                clientID: config.facebook[env].appId,
                clientSecret: config.facebook[env].appSecret,
                callbackURL: '/auth/facebook/callback',
            }, function(accessToken, refreshToken, profile, done){
                var authId = 'facebook:' + profile.id;
                User.findOne({authId: authId }, function(err, user){
                    if(err) return done(err, null);
                    if(user) return done(null, user);
                    user = new User({
                        authId: authId,
                        name: profile.displayName,
                        created: Date.now(),
                        role: 'customer'
                    });
                    user.save(function(err){
                        if(err) return done(err, null);
                        done(null, user);
                    });
                });
            }));

            app.use(passport.initialize());
            app.use(passport.session());
        },

        registerRoutes: function() {
            var redirectUri;
            //register facebook routes
            app.get('/auth/facebook', function(req, res, next){
                redirectUri = req.query.redirect || options.successRedirect;
 /*               console.log("auth 1: redirectUri=" + redirectUri + "; req.query.redirect="
                    + req.query.redirect
                    + "; options.successRedirect=" + options.successRedirect);*/
                passport.authenticate('facebook', {
                    callbackURL: '/auth/facebook/callback' //?redirect=' + encodeURIComponent(redirectUri)
                })(req, res, next);
            });
            app.get('/auth/facebook/callback', passport.authenticate('facebook',
                {failureRedirect: options.failureRedirect}),
            function(req, res){
                //we only get here on successful authentication
/*                console.log("auth 2: redirectUri=" + redirectUri + "; req.query.redirect="
                    + req.query.redirect
                    + "; options.successRedirect=" + options.successRedirect);*/
                res.redirect(303, redirectUri || req.query.redirect);
            }
            );
        }
    };
};

