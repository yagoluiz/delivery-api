'use strict';

const database = {
    host: process.env.MONGO_HOST || 'mongodb://localhost:27017/delivery'
};

module.exports = {
    database
};