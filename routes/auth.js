const router = require('express').Router();
const userController = require('../controllers/auth')
const userValidation = require('../validations/user.validation');
const tokenHandler = require('../middlewares/auth');
const validate = require('../middlewares/validate');

router.route('/create/user').post(validate(userValidation.createUser), userController.register);

router.post('/login', userController.login);

router.post(
  '/verify-token',
  tokenHandler.verifyToken,
  (req, res) => {
    res.status(200).json({ user: req.user })
  }
)

module.exports = router