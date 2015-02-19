var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    number: Number,
    key: String,
    name: String,
    totalPoints: [],
    qualPoints: [],
    elimPoints: [],
    events: [],
    matches: [],
    matches0: [],
    matches1: [],
    matches2: [],
    matches3: []
});
var Team = mongoose.model('Team', teamSchema, 'teams');
module.exports = Team;