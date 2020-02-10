const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);

const PatientDataSchema = new Schema({
    sessions: { type: Number, required: true },
    prevition: { type: String, required: true },
    diagnostic_fk: { type: String },
    evaluation_fk: { type: String},
    kine_fk: {type: ObjectId},
    patient_fk: {type: ObjectId}
}, {
    timestamps: true,
});

module.exports = model('PatientData', PatientDataSchema);