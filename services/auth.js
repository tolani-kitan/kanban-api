const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ApiError = require('../helpers/ApiError');
const config = require('../config');
const keys = require('../config/keys');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const register = async (userBody) => {
  try {
    const body = { ...userBody };

    const user = await User.create(body);

    const token = jwt.sign({ user }, keys.jwtSecret, {
        expiresIn: config.jwt.token_validation_period,
      });

      const data = { user, token };
    return data;
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
  }
};

const login = async (data) => {
    try {
      const { username, password } = data;

      const user = await User.findOne({ username }).select('password username')
  
      if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Credentials');
      }
  
      delete user.password;
  
      const token = jwt.sign({ user }, keys.jwtSecret, {
        expiresIn: config.jwt.token_validation_period,
      });
      return {user, token };
    } catch (e) {
      throw new ApiError(httpStatus.UNAUTHORIZED, e.message);
    }
  };

module.exports = {
    register,
    login
}