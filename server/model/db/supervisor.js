const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schemas = new Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('supervisor', schemas)