var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    area: {
        type: Number,
        required: true
    },

    nodeId: {
        type: Number,
        required: true
    },

    place: Number,

    nodeName: {
        type: String,
        trim: true
    },

    status: Number,

    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('node_info', schemas)