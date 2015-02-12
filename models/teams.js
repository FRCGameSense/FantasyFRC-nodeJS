var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    number: Number,
    key: String,
    name: String,
    totalPoints: [],
    qualPoints: [],
    elimPoints: [],
    events: []
});
var Team = mongoose.model('Team', teamSchema, 'teams');
module.exports = Team;