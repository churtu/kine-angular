const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

module.exports = app => {

    // Settings
    app.set('port', process.env.PORT || 3000);

    // Middlewares
    app.use(cors());
    app.use(express.json());
    app.use(morgan('dev'));

    // Routes
    app.use('/api', routes);
    // Static files
    app.use(express.static(path.join(__dirname, 'public')));

    return app;
}