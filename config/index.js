const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    // env
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),

    // port
    PORT: Joi.any().default(4000),

    // mongo
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),

    // client url
    CLIENT_URL: Joi.string().required().description('Client URL'),
    // jwt
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_TOKEN_VALIDATON_DURATION: Joi.string()
      .default('1h')
      .description('duration for access tokens to expire')
      .required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire')
      .required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire')
      .required(),
      APP_URL: Joi.string().required().description('Application URL'),


  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`);
// }

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  client: {
    url: envVars.CLIENT_URL,
  },
  app: {
    url: envVars.APP_URL,
  },
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
    token_validation_period: envVars.JWT_TOKEN_VALIDATON_DURATION,
  },
};
