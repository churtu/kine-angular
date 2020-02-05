const { connect } = require('mongoose');
const { database } = require('./keys');

connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Database is connect'))
.catch(err =>console.log(err));