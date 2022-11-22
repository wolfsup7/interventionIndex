const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interventionSchema = new Schema({
    name: 'String', 
    category: 'String',
    outcomes: 'String',
    resources: 'String'
});

module.exports = mongoose.model('intervention', interventionSchema)