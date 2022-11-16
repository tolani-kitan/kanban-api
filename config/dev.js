const config = require('./index');

module.exports = {
  mongoURI:
    'mongodb://127.0.0.1:27017/kanban-api',
  jwtSecret: 'ysg7fe4wruhbesjeduwihyewio8u4',
  appUrl: 'http://localhost:8080',
  clientUrl: config.client.url,
};
