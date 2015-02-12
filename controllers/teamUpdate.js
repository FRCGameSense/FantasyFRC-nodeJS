var http = require('http');
var Team = require('../models/teams.js');

exports.teamUpdate = function(data){
    /***** OPTIONS AND GET FOR EVENT *****/
    var options = {
        hostname: 'www.thebluealliance.com',
        path: '/api/v2/team/' + data + '/2013/events',
        headers: {
            'X-TBA-App-Id': 'gamesense:fantasyfrcbeta:v00'
        }
    };
    http.get(options, function(res){
            var str = '';
            res.on('data', function(chunk){
                str += chunk;
            });
            res.on('end', function(){
                var team = JSON.stringify(str);
                team = JSON.parse(team);
                console.log('Data is ' + data);

                /***** CLEARING TEAM EVENTS *****/
                Team.update(
                    {key: data},
                    {events: []},
                    {upsert: true},
                    function(err){
                        if(err){
                            console.log('Team could not be cleared');
                        }
                        else{

                        }
                    }
                );

                /***** ITERATE TRHOUGH TEAM EVENTS *****/
                JSON.parse(team).forEach(function(updateTeam, i){
                    Team.update(
                        {key: data},
                        {$push: {events: JSON.parse(team)[i].key}},
                        {upsert: true},
                        function(err){
                            if(err){
                                console.log('Could not update team ' + err);
                            }
                            else{
                                console.log('Team ' + data + ' updated with ' + JSON.parse(team)[i].key + ' event.');
                            }
                        }
                    )

                })
            })
        }
)
};