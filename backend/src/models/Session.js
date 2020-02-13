const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;

const SessionSchema = new Schema({
    evolution: {type: String},
    prestations : {type: String},
    treatment_fk: {type: ObjectId},
    kine_fk: {type: ObjectId}
},{timestamps:true});

module.exports = model('Session', SessionSchema);