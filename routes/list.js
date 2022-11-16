const router = require('express').Router({ mergeParams: true })
const { param } = require('express-validator')
const listController = require('../controllers/list')
const validation = require('../helpers/validation');
const auth = require('../middlewares/auth');

router.post(
  '/',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  listController.create
)

router.put(
  '/:listId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('listId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid list id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  listController.update
)

router.delete(
  '/:listId',
  param('boardId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid board id')
    } else return Promise.resolve()
  }),
  param('listId').custom(value => {
    if (!validation.isObjectId(value)) {
      return Promise.reject('invalid list id')
    } else return Promise.resolve()
  }),
  validation.validate,
  auth.verifyToken,
  listController.delete
)

module.exports = router;