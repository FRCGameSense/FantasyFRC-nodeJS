var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    leagueList: [],
    teamsOwned: ([], [], [], [], [], [], [])
});
var User = mongoose.model('User', userSchema);
module.exports = User;