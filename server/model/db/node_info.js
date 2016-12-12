var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    area: Number,
    nodeId: Number,
    place: Number,

    nodeName: {
        type: String,
        trim: true
    },

    status: Number,

    time: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('node_info', schemas)