var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    area: Number,
    cardNo: Number,
    permissionId: Number,
    nodeId: Number,

    time: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('user_record', schemas)