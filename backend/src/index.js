const express = require('express');
const configuration = require('./config');

// Initializations
const app = configuration(express());
require('./database');

// Server listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})