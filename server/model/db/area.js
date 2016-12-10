var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    no: {
        type: Number,
        require: true
    },

    name: String
})

module.exports = mongoose.model('area', schemas)