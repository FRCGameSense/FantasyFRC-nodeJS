var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    number: Number,
    name: String,
    totalPoints: Number,
    totalMatchPlayPoints: Number,
    totalTournamentPoints: Number,
    totalAwardsPoints: Number,
    events: []
});
var Team = mongoose.model('Team', teamSchema, 'fantasyfrcbeta');
module.exports = Team;