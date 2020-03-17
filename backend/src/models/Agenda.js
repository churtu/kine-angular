const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const AgendaSchema = new Schema({
    date: { type: Date },
    title: {type: String},
    color: {type: String},
    kine_fk: { type: ObjectId },
    patient_fk: { type: ObjectId },
    type: {type: String}
});

module.exports = model('Agenda', AgendaSchema);