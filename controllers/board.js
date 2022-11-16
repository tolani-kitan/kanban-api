const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const boardService = require('../services/board');

exports.create = async (req, res) => {
    try {
      const {user} = req;
      const board = await boardService.create(user);

      res.status(200).json(board)
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
  }
  
  exports.getAll = async (req, res) => {
    try {
      const boards = await boardService.getAll(req.user);
      res.status(200).json(boards)
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
  }

  exports.updatePosition = async (req, res) => {
    try {
        const board = await boardService.updatePosition(req.body);
        res.status(200).json(board);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
  }
  
  exports.getOne = async (req, res) => {
    try {
        const board = await boardService.getOne(req.user, req.params);
      res.status(200).json(board)
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
  }
  
  exports.update = async (req, res) => {
    try {
    const board = await boardService.update(req.params, req.body);
      res.status(200).json(board)
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
  }
  
  exports.getFavourites = async (req, res) => {
    try {
        const favourites = await boardService.getFavourites(req.user);
      res.status(200).json(favourites)
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
  }
  
  exports.updateFavouritePosition = async (req, res) => {
    try {
        const boards = await boardService.updateFavouritePosition(req.body);
      res.status(200).json(boards)
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
  }
  
  exports.delete = async (req, res) => {
    try {
        const board = await boardService.delete(req.params);
      
      res.status(200).json(board);
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
  }