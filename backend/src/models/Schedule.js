const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const mongoose = require('mongoose'); mongoose.set('useCreateIndex', true);

const ScheduleSchema = new Schema({
    sessionDate: { type: Date },
    checkIn: { type: Date },
    patientData_fk: {type: ObjectId}
});

module.exports = model('Schedule', ScheduleSchema);