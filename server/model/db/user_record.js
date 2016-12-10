var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    area: {
        type: Number,
        required: true
    },

    cardNo: {
        type: Number,
        required: true
    },

    permissionId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    nodeId: {
        type: Number,
        required: true
    },

    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user_record', schemas)