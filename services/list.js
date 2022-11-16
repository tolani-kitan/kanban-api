const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const List = require('../models/list');
const Card = require('../models/card');

exports.create = async (data) => {
  const { boardId } = data;
  console.log('data', data);
  try {
    const list = await List.create({ board: boardId });
    console.log('list', list);
    list._doc.cards = [];
   return list;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  
    }
}

exports.update = async (data, body) => {
  const { listId } = data
  try {
    const list = await List.findByIdAndUpdate(
      listId,
      { $set: body }
    )
    list._doc.cards = []
    return list;
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  }
}

exports.delete = async (data) => {
  const { listId } = data
  try {
    await Card.deleteMany({ list: listId })
    await List.deleteOne({ _id: listId })
    return "Deleted";
  } catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  }
}