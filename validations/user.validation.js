const Joi = require('@hapi/joi');
const { password } = require('./custom');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required().messages({
      'string.empty': `username must be at least 8 characters`,
      'any.required': `username is a required field`,
    }),
    password: Joi.string().custom(password).messages({
      'string.empty': `password must be at least 8 characters`,
      'any.required': `password is a required field`,
    }),
    confirmPassword: Joi.string().custom(password).messages({
      'string.empty': `password must be at least 8 characters`,
      'any.required': `password is a required field`,
    }),
  }),
};

const login = {
    body: Joi.object().keys({
        username: Joi.string().required().messages({
          'string.empty': `username must be at least 8 characters`,
          'any.required': `username is a required field`,
        }),
        password: Joi.string().required().messages({
          'string.empty': `password must be at least 8 characters`,
          'any.required': `password is a required field`,
        }),
    }),
}

module.exports = {
    register,
    login,
}