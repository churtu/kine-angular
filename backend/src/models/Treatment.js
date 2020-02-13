const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;

const TreatmentSchema = new Schema({
    diagnostic: {type: String},
    sessions: {type: Number},
    patient_data_fk: {type: ObjectId}
});

module.exports = model('Treatment', TreatmentSchema);