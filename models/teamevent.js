var mongoose = require('mongoose');

var TeamEventSchema = mongoose.Schema({
    teamNumber: Number,
    eventName: String,
    totalPoints: Number,
    totalMatchPlayPoints: Number,
    totalTournamentPoints: Number,
    totalAwardsPoints: Number
});
var TeamEvent = mongoose.model('TeamEvent', TeamEventSchema);
module.exports = TeamEvent;