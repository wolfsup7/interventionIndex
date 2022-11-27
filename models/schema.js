const mongoose = require('mongoose');

const interventionSchema = new mongoose.Schema({
    name: 'String', 
    category: 'String',
    outcomes: 'String',
    resources: 'String'
});

const intCollection = mongoose.model('Intervention', interventionSchema);

module.exports = intCollection;