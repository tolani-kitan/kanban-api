const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const httpStatus = require('http-status');

const ApiError = require('./helpers/ApiError');
const connectDB = require('./config/db');
const routes = require('./routes');
const config = require('./config');
const logger = require('./config/logger');
const User = require('./models/user');
const { errorConverter, errorHandler } = require('./middlewares/error');

require('dotenv').config();

const app = express();

connectDB();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.options('*', cors());

app.use(cookieParser());
app.get('/', (req, res) => res.send({ msg: 'Welcome to Olive Agro' }));

app.use('/api', routes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) =>
  res.status(200).send({
    message: 'Welcome to OLIVE AGRO API',
  })
);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
// app.use('/api/payment', payment);

const PORT = config.port || 8080;

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
