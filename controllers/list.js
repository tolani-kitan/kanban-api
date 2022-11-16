const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const listService = require('../services/list');

exports.create = async (req, res) => {
  try {
    const list = await listService.create(req.params);
    
    res.status(200).json(list)
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
}
}

exports.update = async (req, res) => {
  try {
    const list = await listService.update(req.params, req.body);
    
    res.status(200).json(list)
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
}
}

exports.delete = async (req, res) => {
  try {
    const list = await listService.delete(req.params);
    res.status(200).json(list);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
}
}