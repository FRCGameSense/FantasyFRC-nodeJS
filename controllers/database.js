var https = require('https');
var http = require('http');

var Team = require('../models/teams.js');
var Event = require('../models/event.js');
var League = require('../models/league.js');
var LeagueMember = require('../models/leaguemember.js');
var TeamEvent = require('../models/teamevent.js');
var User = require('../models/user.js');
//var credentials = require('./credentials.js');

module.exports = function(data){
    //this variable will be invisible outside of this module
    var options = {
        hostname: 'www.thebluealliance.com',
        path: '/api/v2/' + data,
        headers: {
            'X-TBA-App-Id': 'gamesense:fantasyfrcbeta:v00'
        }
    };

    http.get(options, function(res){
        var str = '';
        console.log('Response is '+res.statusCode);

        res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            str += chunk;
        });

        res.on('end', function () {
            console.log(str);
            console.log(JSON.parse(str).team_number);
            var teamnumber = JSON.parse(str).team_number;
/*            new Team(
                {number: teamnumber},
                {name: 'testteam'},
                {totalPoints: 351},
                {totalMatchPlayPoints: 6515},
                {totalTournamentPoints: 251},
                {totalAwardsPoints: 156},
                {$push: {events: ['test event1', 'test event2', 'test event3']}},
                {upsert: true},
                function(err){
                    if(err){
                        console.error(err.stack);
                        session.flash = {
                            type: 'danger',
                            intro: 'Oooops!',
                            message: 'There was an error processing your request.'
                        };
                    }
                });
 */
            var t = new Team;
            t.number = teamnumber;
            t.name = 'new name';
            t.totalPoints = 2345;
            t.totalMatchPlayPoints = 135089;
            t.totalTournamentPoints = 1349;
            t.totalAwardsPoints = 349;
            t.events = ['Shorewood', 'Mount Vernon', 'DCMP'];
            t.markModified('date');
            t.save(function(){

            });
            console.log('databases.js stuff has been pushed');
            return JSON.parse(str).teamnumber;
        });
    });
};