const keys = require('./keys');
const mongoose = require('mongoose');
const logger = require('../config/logger');
const config = require('../config');

const connectDB = async () => {
  try {
    await mongoose.connect(keys.mongoURI, config.mongoose.options);
    logger.info('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
