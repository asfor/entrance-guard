var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    area: {
        type: Number,
        required: true
    },

    id: {
        type: Number,
        required: true
    },

    cardNo: {
        type: Number,
        required: true
    },

    personId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    name: {
        type: String,
        trim: true
    },

    nodeId: {
        type: Number,
        required: true
    },

    type: Number,

    startPeriod: String,
    endPeriod: String,
    startTime: String,
    endTime: String,

    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user_permission', schemas)