const {Schema, model} = require('mongoose');

const SpecializationSchema = new Schema({
    description: {type: String}
});

module.exports = model('Specialization', SpecializationSchema);