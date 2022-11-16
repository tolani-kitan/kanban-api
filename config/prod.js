const config = require('./index');

module.exports = {
  mongoURI: config.mongoose.url,
  jwtSecret: config.jwt.secret,
  appUrl: config.app.url,
  clientUrl: config.client.url,
};
