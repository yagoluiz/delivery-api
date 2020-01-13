const host =
  process.env.NODE_ENV !== 'test'
    ? process.env.MONGO_HOST || 'mongodb://localhost:27017/delivery'
    : 'mongodb://localhost:27017/delivery-test';

const database = {
  host: host
};

module.exports = {
  database
};
