'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database/mongo-database')

const app = express();

database.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const partnerRoute = require('./api/v1/routes/partner-route');

app.use('/api/v1/partners/', partnerRoute);

module.exports = app;