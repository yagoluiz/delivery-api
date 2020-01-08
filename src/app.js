'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/delivery',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const partnerRoute = require('./api/v1/routes/partner-route');

app.use('/api/v1/partners/', partnerRoute);

module.exports = app;