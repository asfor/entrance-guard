var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    no: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('area', schemas)