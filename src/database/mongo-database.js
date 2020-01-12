const logger = require('simple-node-logger').createSimpleLogger();
const mongoose = require('mongoose');
const config = require('../config');

const connect = () => {
  mongoose
    .connect(config.database.host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => {
      logger.info('MongoDB connect');
    })
    .catch(error => {
      logger.info('MongoDB error', error);
    });
};

module.exports = {
  connect
};
