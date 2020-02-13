const {Schema, model} = require('mongoose');

const TypeEvaluationSchema = new Schema({
    description: {type: String}
});

module.exports = model('Type_evaluation', TypeEvaluationSchema);