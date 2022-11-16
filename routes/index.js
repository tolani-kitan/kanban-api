const express = require('express');
const authRoute = require('./auth');
const boardRoute = require('./board');
const listRoute = require('./list');
const cardRoute = require('./card');
const router = express.Router();

router.use('/auth', authRoute);
router.use('/board', boardRoute);
router.use('/boards/:boardId/lists', listRoute);
router.use('/boards/:boardId/cards', cardRoute);

module.exports = router;
