var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    key: String,
    type: String,
    district: String,
    name: String,
    teams: [],
    matchResults: [],
    pointAverage: Number,
    alliances: []
});
var Event = mongoose.model('Event', eventSchema, 'events');
module.exports = Event;