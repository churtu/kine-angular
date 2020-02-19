const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const EvaluationSchema = new Schema({
    anamnesis: { type: String },
    complementStudies: { type: String },
    hypothesys: { type: String },
    treatment_plan: { type: String },
    type_eval_fk: { type: ObjectId },
    patient_data_fk: { type: ObjectId },
    kine_data_fk: { type: ObjectId }
}, { timestamps: true });

module.exports = model('Evaluation', EvaluationSchema);