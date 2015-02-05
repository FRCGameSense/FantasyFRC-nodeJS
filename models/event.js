var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    eventName: String,
    teamList: [],
    matchResults: [],
    eventAverage: Number
});
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;