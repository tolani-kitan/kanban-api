const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const card = require('../models/card');
const cardService = require('../services/card');

exports.create = async (req, res) => {
  try {
    const card = await cardService.create(req.body);
    
    res.status(201).json(card);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
}

exports.update = async (req, res) => {
  try {
    const card = await cardService.update(req.params, req.body);
    
    res.status(200).json(card)
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
}

exports.delete = async (req, res) => {
  try {
    const card = await cardService.delete(req.params);
    
    res.status(200).json(card)
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
}

exports.updatePosition = async (req, res) => {
  try {
    const card = await cardService.updatePosition(req.body);
    
    res.status(200).json(card);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }  
}