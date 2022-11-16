const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const Card = require('../models/card')
const List = require('../models/list')

exports.create = async (body) => {
  const { listId } = body
  try {
    const list = await List.findById(listId)
    const cardsCount = await Card.find({ list: listId }).count()
    const card = await Card.create({
      list: listId,
      position: cardsCount > 0 ? cardsCount : 0
    })
    card._doc.list = list
    return card;
  }  catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  
    }
}

exports.update = async (params, body) => {
  const { cardId } = params
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $set: body }
    )
    return card;
  }  catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  
    }
}

exports.delete = async (params) => {
  const { cardId } = params
  try {
    const currentcard = await Card.findById(cardId)
    await Card.deleteOne({ _id: cardId })
    const cards = await Card.find({ list: currentcard.list }).sort('position')
    for (const key in cards) {
      await Card.findByIdAndUpdate(
        cards[key].id,
        { $set: { position: key } }
      )
    }
    return 'deleted';
  }  catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  
    }
}

exports.updatePosition = async (body) => {
  const {
    resourceList,
    destinationList,
    resourcelistId,
    destinationlistId
  } = body
  const resourceListReverse = resourceList.reverse()
  const destinationListReverse = destinationList.reverse()
  try {
    if (resourcelistId !== destinationlistId) {
      for (const key in resourceListReverse) {
        await Card.findByIdAndUpdate(
          resourceListReverse[key].id,
          {
            $set: {
              list: resourcelistId,
              position: key
            }
          }
        )
      }
    }
    for (const key in destinationListReverse) {
      await Card.findByIdAndUpdate(
        destinationListReverse[key].id,
        {
          $set: {
            list: destinationlistId,
            position: key
          }
        }
      )
    }
    return 'updated';
  }  catch (error) {
    console.error(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, error.message);  
    }
}