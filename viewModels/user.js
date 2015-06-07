var User = require('../models/user.js');

//convenience function for joining fields
function smartJoin(arr, separator){
    if(!separator) separator = '';
    return arr.filter(function(elt){
        return elt!==undefined &&
                elt!==null &&
                elt.toString().trim() !== '';
    }).join(separator);
}

module.exports = function(userName){
    var user = User.findById(userName);
    if(!user) return { error: 'Unknown user name: ' + req.params.userName};

    return {
        userName: user.userName,
        name: smartJoin([user.firstName, user.lastName]),
        email: String,
        leagueList: [],
        leaguesOwned: [],
        teamsOwned: ([], [], [], [], [], [], [])
    }
};