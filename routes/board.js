const router = require('express').Router()
const { param } = require('express-validator')
const validation = require('../helpers/validation');
const auth = require('../middlewares/auth');
const boardController = require('../controllers/board')

router.post(
  '/create',
  auth.verifyToken,
  boardController.create
);

router.get(
  '/all',
  auth.verifyToken,
  boardController.getAll
);

router.put(
  '/update/position',
  auth.verifyToken,
  boardController.updatePosition
);

router.get(
  '/favourites',
  auth.verifyToken,
  boardController.getFavourites
);

router.put(
  '/favourites',
  auth.verifyToken,
  boardController.updateFavouritePosition
);

router.get(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  boardController.getOne
);

router.put(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  boardController.update
);

router.delete(
  '/:boardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  boardController.delete
);


module.exports = router;