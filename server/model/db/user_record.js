const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schemas = new Schema({
    area: String,
    cardNo: Number,
    permissionId: Number,
    nodeId: Number,

    time: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('user_record', schemas)