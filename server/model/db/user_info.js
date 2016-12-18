const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schemas = new Schema({
    area: String,    
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