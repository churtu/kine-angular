const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;

const KineDataSchema = new Schema({
    user_fk: {type: ObjectId},
    specialization_fk : {type: ObjectId}
});

module.exports = model('Kine_data', KineDataSchema);