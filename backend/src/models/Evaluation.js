const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const EvaluationSchema = new Schema({
    anamnesis: { type: String },
    complementStudies: { type: String },
    hypothesys: { type: String },
    treatment_plan: { type: String },
    treatment_fk: { type: ObjectId },
    type_eval_fk: { type: ObjectId },
    kine_fk: { type: ObjectId }
}, { timestamps: true });

module.exports = model('Evaluation', EvaluationSchema);