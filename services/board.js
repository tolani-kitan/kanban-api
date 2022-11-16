const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const Board = require('../models/board')
const List = require('../models/list')
const Card = require('../models/card')

exports.create = async (data) => {
  try {
    const boardsCount = await Board.find().count()
    const board = await Board.create({
      user: data._id,
      position: boardsCount > 0 ? boardsCount : 0
    })

    return board;
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
  }
}

exports.getAll = async (data) => {
  try {
    const boards = await Board.find({ user: data._id }).sort('-position')
    return boards;
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
  }
}

exports.updatePosition = async (data) => {
  const { boards } = data
  try {
    for (const key in boards.reverse()) {
      const board = boards[key]
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { position: key } }
      )
    }
    return "Board Updated Successfully";
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  }
}

exports.getOne = async (data, body) => {
  const { boardId } = body;

  try {
    const board = await Board.findOne({ user: data.id, _id: boardId })
    if (!board)  {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Board not found');
    }    
    const lists = await List.find({ board: boardId })
    for (const list of lists) {
      const cards = await Card.find({ list: list.id }).populate('list').sort('-position')
      list._doc.cards = cards
    }
    board._doc.lists = lists
   return board;
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  }
}

exports.update = async (data, body) => {
  const { boardId } = data
  const { title, description } = body

  try {
    if (title === '') body.title = 'Untitled'
    if (description === '') body.description = 'Add description here'
    const currentBoard = await Board.findById(boardId)
    if (!currentBoard) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Board not found');
    }

    const board = await Board.findByIdAndUpdate(
      boardId,
      { $set: body }
    )
   return board;
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  }
}


exports.delete = async (data) => {
  const { boardId } = data
  try {
    const lists = await List.find({ board: boardId })
    for (const list of lists) {
      await Card.deleteMany({ list: list.id })
    }
    await List.deleteMany({ board: boardId })

    await Board.deleteOne({ _id: boardId })

    const boards = await Board.find().sort('position')
    for (const key in boards) {
      const board = boards[key]
      await Board.findByIdAndUpdate(
        board.id,
        { $set: { position: key } }
      )
    }

    return "deleted";
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  }
}