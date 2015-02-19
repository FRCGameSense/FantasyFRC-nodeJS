var http = require('http');
var Team = require('../models/teams.js');

exports.teamDetails = function(data, callback){
    var options = {
        hostname: 'www.thebluealliance.com',
        path: '/api/v2/team/' + data,
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

            Team.update(
                {key: data},
                {name: JSON.parse(team).nickname},
                {upsert: true},
                function(err){
                    if(err){
                        console.log('Team details update failed ' + err);
                    }
                    else{
                        if(typeof callback == "function") callback();
                    }
                }
            )
        })
    })
};

exports.teamUpdate = function(data, callback){
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
                        //console.log('Team data has been cleared');
                        /***** ITERATE THROUGH TEAM EVENTS *****/
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
                                        if(typeof callback == "function") callback();
                                    }
                                }
                            );
                        });
                    }
                }
            );
        })
    });
};

exports.matchUpdate = function matchUpdate(data, event){
    var options2 = {
        hostname: 'www.thebluealliance.com',
        path: '/api/v2/team/' + data + '/event/' + event + '/matches',
        headers: {
            'X-TBA-App-Id': 'gamesense:fantasyfrcbeta:v00'
        }
    };
    http.get(options2, function(res){
        var str2 = '';
        res.on('data', function(chunk){
            str2 += chunk;
        });
        res.on('end', function(){
            var matches = JSON.stringify(str2);
            matches = JSON.parse(matches);

            /***** CLEARING QUAL POINTS *****/
            Team.update(
                {key: data},
                {qualPoints: []},
                {upsert: true},
                function (err) {
                    if (err) {
                        console.log('Could not update team matches ' + err);
                    }
                    else {
                        //console.log('Team matches cleared');

                        /***** ITERATE THROUGH MATCHES AND LOG SCORES TO QUAL AND ELIM POINTS *****/
                        JSON.parse(matches).forEach(function(updateMatches, j) {
                            for (var k = 0; k < 3; k++) {
                                if (JSON.parse(matches)[j].alliances.blue.teams[k] == data && JSON.parse(matches)[j].comp_level == 'qm') {
                                    Team.update(
                                        {key: data},
                                        {$push: {qualPoints: JSON.parse(matches)[j].alliances.blue.score}},
                                        {upsert: true},
                                        function (err) {
                                            if (err) {
                                                console.log('Could not update team matches ' + err);
                                            }
                                            else {
                                                console.log('Team match blue ' + j + ' updated');
                                            }
                                        }
                                    );
                                    k=3;
                                }
                                else if (JSON.parse(matches)[j].alliances.blue.teams[k] != data && k == 2 && JSON.parse(matches)[j].comp_level == 'qm') {
                                    Team.update(
                                        {key: data},
                                        {$push: {qualPoints: JSON.parse(matches)[j].alliances.red.score}},
                                        {upsert: true},
                                        function (err) {
                                            if (err) {
                                                console.log('Could not update team matches ' + err);
                                            }
                                            else {
                                                console.log('Team match red ' + j + ' updated');
                                            }
                                        }
                                    )
                                }
                                else if (JSON.parse(matches)[j].alliances.blue.teams[k] == data && JSON.parse(matches)[j].comp_level != 'qm') {
                                    Team.update(
                                        {key: data},
                                        {$push: {elimPoints: JSON.parse(matches)[j].alliances.blue.score}},
                                        {upsert: true},
                                        function (err) {
                                            if (err) {
                                                console.log('Could not update team matches ' + err);
                                            }
                                            else {
                                                console.log('ELIM match blue ' + j + ' updated');
                                            }
                                        }
                                    );
                                    k=3;
                                }
                                else if (JSON.parse(matches)[j].alliances.blue.teams[k] != data && k == 2 && JSON.parse(matches)[j].comp_level != 'qm'){
                                    Team.update(
                                        {key: data},
                                        {$push: {elimPoints: JSON.parse(matches)[j].alliances.red.score}},
                                        {upsert: true},
                                        function (err) {
                                            if (err) {
                                                console.log('Could not update team matches ' + err);
                                            }
                                            else {
                                                console.log('ELIM match red ' + j + ' updated');
                                            }
                                        }
                                    )
                                }
                                else {
                                    console.log('did not find an alliance match')
                                }
                            }
                        })
                    }
                });
        })
    })};


