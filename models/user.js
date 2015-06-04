var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    authId: String,
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    leagueList: [],
    leaguesOwned: [],
    teamsOwned: ([], [], [], [], [], [], [])
});
var User = mongoose.model('User', userSchema);
module.exports = User;