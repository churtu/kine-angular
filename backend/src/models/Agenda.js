const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const AgendaSchema = new Schema({
    date: { type: Date },
    kine_fk: { type: ObjectId },
    patient_fk: { type: ObjectId }
});

module.exports = model('Agenda', AgendaSchema);