const { Schema, model } = require('mongoose');
const {ObjectId} = Schema;

const UserSchema = new Schema({
    rut: { type: String, required: true },
    avatar: {type: String},
    firstName: { type: String, required: true },
    middlename: { type: String },
    lastName: { type: String, required: true },
    middleLastName: { type: String },
    age: { type: String, required: true },
    loginfk: { type: ObjectId, required: true }
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);