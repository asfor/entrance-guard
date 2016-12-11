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

    personId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user_info', schemas)