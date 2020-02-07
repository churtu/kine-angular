const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;

const UserSchema = new Schema({
    rut: { type: String, required: true },
    avatar: { type: String },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    middleLastName: { type: String },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    login_fk: { type: ObjectId},
    typeUser_fk: { type: ObjectId}
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);