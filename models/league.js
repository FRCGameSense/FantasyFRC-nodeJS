var mongoose = require('mongoose');

var leagueSchema = mongoose.Schema({
    leagueName: String,
    memberList: []
});
var League = mongoose.model('League', leagueSchema);
module.exports = League;