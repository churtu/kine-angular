const { Schema, model } = require('mongoose');
const { ObjectId } = Schema

const PatientDataSchema = new Schema({
    prevition: { type: String },
    patient_fk: { type: ObjectId }
});

module.exports = model('Patient_data', PatientDataSchema);