const {Schema, model} = require('mongoose');

const TypeUserSchema = new Schema({
    description: {type: String}
});

module.exports = model('TypeUser', TypeUserSchema)