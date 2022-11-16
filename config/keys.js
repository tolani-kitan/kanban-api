const config = require('./index');

if (config.env === 'production') {
  //require production keys
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
