const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schemas = new Schema({
    area: String,
    id: Number,
    cardNo: Number,

    personId: {
        type: String,
        lowercase: true,
        trim: true
    },

    name: {
        type: String,
        trim: true
    },

    nodeId: Number,
    type: Number,
    startPeriod: String,
    endPeriod: String,
    startTime: String,
    endTime: String,

    time: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('user_permission', schemas)