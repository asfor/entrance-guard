var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schemas = new Schema({
    no: Number
})

module.exports = mongoose.model('area', schemas)