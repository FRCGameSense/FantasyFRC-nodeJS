var https = require('https');
var http = require('http');

var Team = require('../models/teams.js');
var Event = require('../models/event.js');
var League = require('../models/league.js');
var LeagueMember = require('../models/leaguemember.js');
var TeamEvent = require('../models/teamevent.js');
var User = require('../models/user.js');
var credentials = require('../credentials.js');


    exports.nameNumUpdate = function(data){
        //this variable will be invisible outside of this module
        var options = {
            hostname: credentials.TBAdata.url,
            path: credentials.TBAdata.path + data,
            headers: {
                'X-TBA-App-Id': 'gamesense:fantasyfrcbeta:v00'
            }
        };

        http.get(options, function (res) {
            var str = '';
  //          console.log('Response is ' + res.statusCode);

            res.on('data', function (chunk) {
                //console.log('BODY: ' + chunk);
                str += chunk;
            });

            res.on('end', function () {
                var team = JSON.parse(str);
                if (Team.find({number: team.team_number}) == team.team_number){
                    console.log('found a match entry, so nothing happened')
                    return str;
                }
                else {
                    var t = new Team;
                    t.number = team.team_number;
                    t.name = team.nickname;
                    t.markModified('nameNumUpdate');
                    t.save(function () {
                    });
                    console.log('didnt match so new entry created');
                    console.log(Team.findOneAndUpdate({number: team.team_number}));
                    return str;
                }
            });
        });
    };

    exports.totalPointsUpdate = function(data){
        //this variable will be invisible outside of this module
        var options = {
            hostname: 'www.thebluealliance.com',
            path: '/api/v2/' + data,
            headers: {
                'X-TBA-App-Id': 'gamesense:fantasyfrcbeta:v00'
            }
        };

        http.get(options, function (res) {
            var str = '';
            //          console.log('Response is ' + res.statusCode);

            res.on('data', function (chunk) {
                //console.log('BODY: ' + chunk);
                str += chunk;
            });

            res.on('end', function () {
                var team = JSON.parse(str);
                if (Team.find({number: team.team_number})){
                    return str;
                }
                else {
                    var t = new Team;
                    t.number = team.team_number;
                    t.name = team.nickname;
                    t.markModified('nameNumUpdate');
                    t.save(function () {
                    });
                    //console.log('databases.js stuff has been pushed');
                    return str;
                }
            });
        });
    };

    exports.eventUpdate = function(data){

    };
