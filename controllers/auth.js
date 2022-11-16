const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const catchAsync = require('../helpers/AsyncHandler');
const User = require('../models/user')
const userService = require('../services/auth');

exports.register = catchAsync(async (req, res) => {
try {
    const { username } = req.body;

  if ((await User.isUsernameTaken(username))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User already exists');
  }

  const user = await userService.register(req.body);
  res.status(200).json({
    success: true,
    message: 'User Created Successfully',
    data: user,
  });
} catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
}
  
});

exports.login = catchAsync(async (req, res) => {
    const credentials = req.body;
    const user = await userService.login(credentials);
  
    res.json({
      message: 'login successful',
      ...user,
    });
});