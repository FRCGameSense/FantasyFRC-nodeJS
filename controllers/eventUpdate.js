var http = require('http');

var Event = require('../models/event.js');

exports.eventUpdate = function(data){
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
            var event = JSON.parse(str);
            Event.update(
                {key: event.key},
                {name: event.name},
                {upsert: true},
                function(err){
                    if(err){
                        console.log('Could not update Event' + err);
                    }
                    else console.log('Event ' + event.name + ' name updated.');
                }
            );

            options = {
                hostname: 'www.thebluealliance.com',
                path: '/api/v2/event/2013mawo/matches',
                headers: {
                    'X-TBA-App-Id': 'gamesense:fantasyfrcbeta:v00'
                }
            };
            console.log('this is data ' + data);
            http.get(options, function(res){
                var str2 = '';
                res.on('data', function(chunk){
                    str2 += chunk;
                });
                res.on('end', function(){
                    var matches = JSON.stringify(str2);
                    matches = JSON.parse(matches);
                    Event.update(
                        {key: event.key},
                        {$push: {alliances: JSON.parse(matches)[0].alliances.red.score}},
                        {upsert: true},
                        function(err){
                            if(err){
                                console.log('Could not update Alliances ' + err);
                            }
                            else console.log('Event Alliances ' + JSON.parse(matches)[0].alliances.red.score + ' updated');
                        }
                    );
                    Event.update(
                        {key: event.key},
                        {$push: {alliances: JSON.parse(matches)[0].alliances.blue.score}},
                        {upsert: true},
                        function(err){
                            if(err){
                                console.log('Could not update Alliances blue score ' + err);
                            }
                            else console.log('Event Alliances Blue Score Updated');
                        }
                    )
                })
            })
        });
        return str;
    });
};
