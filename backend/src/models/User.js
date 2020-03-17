const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const UserSchema = new Schema({
    rut: { type: String},
    firstName: { type: String},
    middleName: { type: String },
    lastName: { type: String},
    middleLastName: { type: String },
    gender: { type: String, required: true},
    age: { type: Number},
    email: { type: String},
    phone: { type: String},
    address: {type: String},
    login_fk: { type: ObjectId},
    type_user_fk: { type: ObjectId}
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);