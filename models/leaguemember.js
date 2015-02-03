var mongoose = require('mongoose');

var LeagueMemberSchema = mongoose.Schema({
    userName: String,
    points: Number
});
var LeagueMember = mongoose.model('LeagueMember', LeagueMemberSchema);
module.exports = LeagueMember;