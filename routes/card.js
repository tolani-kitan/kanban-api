const router = require('express').Router({ mergeParams: true });
const { param, body } = require('express-validator');
const cardController = require('../controllers/card');
const validation = require('../helpers/validation');
const auth = require('../middlewares/auth');

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  body('listId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid list id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  cardController.create
)

router.put(
  '/update-position',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  cardController.updatePosition
)

router.delete(
  '/:cardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('cardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid card id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  cardController.delete
)

router.put(
  '/:cardId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('cardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid card id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  cardController.update
)

module.exports = router;