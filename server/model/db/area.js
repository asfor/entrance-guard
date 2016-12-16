var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    no: String
})

module.exports = mongoose.model('area', schemas)