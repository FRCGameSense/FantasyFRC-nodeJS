var User = require('../models/user.js');
var userViewModel = require('../viewModels/user.js');


module.exports = {
    registerRoutes: function(app){
//        app.get('/login/:userName', this.home);
        app.get('/account/:userName', this.account);
        app.get('/league/:userName', this.league);
        app.get('/matchups/:userName', this.matchups);

        app.post('/update/:userName', this.ajaxUpdate);

    },

    home: function(req, res, next){
        var user = User.findById(req.params.userName);
        if(!user) return next(); //pass this on to 404 handler
        res.render('home', userViewModel(user));
    },

    account: function(req, res, next){
        var user = User.findById(req.params.userName);
        if(!user) return next(); //pass this on to 404 handler
        res.render('account', userViewModel(user));
    },

    league: function(req, res, next){
        var user = User.findById(req.params.userName);
        if(!user) return next(); //pass this on to 404 handler
        res.render('league', userViewModel(user));
    },

    matchups: function(req, res, next){
        var user = User.findById(req.params.userName);
        if(!user) return next(); //pass this on to 404 handler
        res.render('matchups', userViewModel(user));
    },

    ajaxUpdate: function(req, res){
        var user = User.findById(req.params.userName);
        if(!user) return res.json({ error: 'Invalid User Name.'});
        if(req.body.firstName){
            if(typeof req.body.firstName !== 'string' ||
                req.body.firstName.trim() === '')
                return res.json({ error: 'Invalid first name.'});
            user.firstName = req.body.firstName;
        }
        if(req.body.lastName){
            if(typeof req.body.lastName !== 'string' ||
                req.body.lastName.trim() === '')
                return res.json({ error: 'Invalid last name.'});
            user.lastName = req.body.lastName;
        }
        if(req.body.email){
            if(typeof req.body.email !== 'string' ||
                req.body.email.trim() === '')
                return res.json({ error: 'Invalid email.'});
            user.email = req.body.email;
        }
        if(req.body.leagueList){
            if(typeof req.body.leagueList !== 'array' ||
                req.body.leagueList.trim() === '')
                return res.json({ error: 'Invalid league list.'});
            user.leagueList = req.body.leagueList;
        }
        if(req.body.teamsOwned){
            if(typeof req.body.teamsOwned !== 'array' ||
                req.body.teamsOwned.trim() === '')
                return res.json({ error: 'Invalid teams owned list.'});
            user.teamsOwned = req.body.teamsOwned;
        }
        user.save();
        return res.json({ success: true });
    }
};
