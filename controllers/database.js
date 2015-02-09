var https = require('https');
var http = require('http');

var Team = require('../models/teams.js');
var Event = require('../models/event.js');
var credentials = require('../credentials.js');

    exports.nameNumUpdate = function(data) {
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
            //console.log('Response is ' + res.statusCode);
            res.on('data', function (chunk) {
                //console.log('BODY: ' + chunk);
                str += chunk;
            });
            res.on('end', function () {
                var team = JSON.parse(str);
                Team.update(
                    {number: team.team_number},
                    {name: team.nickname},
                    {upsert: true},
                    function(err){
                        if(err){
                            console.log('Could not update Team');
                        }
                        else console.log('Team ' + team.team_number + ' updated.');
                    }
                );
                return team;
            });
            return str;
        })
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

            });
        });
    };

