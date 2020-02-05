const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const LoginSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
}, {
    timestamps: true
});

LoginSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

LoginSchema.methods. verifyPassword = async function(password){
    const correct = await bcrypt.compare(password, this.password);
    return correct;
}

module.exports = model('Login', LoginSchema);