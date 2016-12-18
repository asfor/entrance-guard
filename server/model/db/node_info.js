const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schemas = new Schema({
    area: String,
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