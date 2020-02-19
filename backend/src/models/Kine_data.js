const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;

const KineDataSchema = new Schema({
    specialization_fk: {type:ObjectId},
    kine_fk: {type:ObjectId}
});

module.exports = model('Kinedata', KineDataSchema);