var http = require('http');
var Event = require('../models/event.js');

exports.eventUpdate = function(data){
    /***** OPTIONS AND GET FOR EVENT *****/
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
            /***** UPDATING EVENT NAME *****/
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
            /***** OPTIONS AND GET FOR EVENT/EVENTKEY/MATCHES *****/
            options = {
                hostname: 'www.thebluealliance.com',
                path: '/api/v2/' + data + '/matches',
                headers: {
                    'X-TBA-App-Id': 'gamesense:fantasyfrcbeta:v00'
                }
            };
//            console.log('this is data ' + data);
            http.get(options, function(res){
                var str2 = '';
                res.on('data', function(chunk){
                    str2 += chunk;
                });
                res.on('end', function(){
                    var matches = JSON.stringify(str2);
                    matches = JSON.parse(matches);

                    /***** CLEARING EVENT SCORES *****/
                    Event.update(
                        {key: event.key},
                        {matchResults: []},
                        {upsert: true},
                        function(err){
                            if(err){
                                console.log('Could not clear Alliances scores ' + err);
                            }
                            else console.log('Event Alliances scores has been cleared');
                        }
                    );
                    var sum = 0;
                    /***** ITERATING THROUGH MATCHES TO STORE SCORES *****/
                    var blueSum = 0;
                    var redSum = 0;
                    var totalSum = 0;
                    JSON.parse(matches).forEach(function(updateMatches, i){
                        Event.update(
                            {key: event.key},
                            {$push: {matchResults: JSON.parse(matches)[i].alliances.red.score}},
                            {upsert: true},
                            function(err){
                                if(err){
                                    console.log('Could not update Alliances ' + err);
                                }
                                else {
                                    redSum += JSON.parse(matches)[i].alliances.red.score;
                                    //console.log('Event Alliances Red score updated ' + i);
                                    totalSum = (redSum + blueSum)/JSON.parse(matches).length;
                                    //console.log('Total Sum is ' + totalSum);
                                }
                            }
                        );
                        Event.update(
                            {key: event.key},
                            {$push: {matchResults: JSON.parse(matches)[i].alliances.blue.score}},
                            {upsert: true},
                            function(err){
                                if(err){
                                    console.log('Could not update Alliances blue score ' + err);
                                }
                                else {
                                    blueSum += JSON.parse(matches)[i].alliances.blue.score;
                                    //console.log('Event Alliances Blue Score Updated ' + i);
                                    totalSum = (redSum + blueSum)/JSON.parse(matches).length;
                                    //console.log('Total Sum is ' + totalSum);
                                    Event.update(
                                        {key: event.key},
                                        {pointAverage: totalSum},
                                        {upsert: true},
                                        function(err){
                                            if(err){
                                                if(err){
                                                    console.log('Could not update total sum');
                                                }
                                                else{
                                                    console.log('Total Sum is ' + totalSum);
                                                }
                                            }
                                        }
                                    )
                                }
                            }
                        );

                    });
                })
            })
        });
        return str;
    });
};
