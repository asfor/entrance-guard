const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schemas = new Schema({
    no: String,
    key: String
})

module.exports = mongoose.model('area', schemas)