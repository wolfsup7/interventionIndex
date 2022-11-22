const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interventionSchema = new Schema({
    name: 'String', 
    researchEvidence: 'String',
    renCollectedData: 'String',
    outcomes: 'String',
    resources: 'String'
});

const Intervention = mongoose.model('intervention', interventionSchema);

module.exports = mongoose.model('intervention', interventionSchema)
