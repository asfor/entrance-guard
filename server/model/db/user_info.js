var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    area: Number,    
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

    phone: {
        type: String,
        trim: true
    },

    time: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('user_info', schemas)