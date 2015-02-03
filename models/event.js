var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    eventName: String,
    teamList: []
});
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;