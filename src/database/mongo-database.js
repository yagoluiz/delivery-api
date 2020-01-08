'use strict';

const mongoose = require('mongoose');
const config = require('../config');

const connect = () => {
    mongoose.connect(config.database.host,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(_ => {
            console.log('MongoDB connect');
        })
        .catch(error => {
            console.log('MongoDB', error);
        });
};

module.exports = {
    connect
};