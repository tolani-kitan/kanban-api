const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../config/keys');

const tokenDecode = (req) => {
    //Get token from header
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }  
      try {
        const tokenDecoded = jsonwebtoken.verify(
          token,
          keys.jwtSecret
        );
  
        return tokenDecoded;
      } catch {
        return false;
  }
}

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req)

  if (tokenDecoded) {
    const user = await User.findById(tokenDecoded.user.id)
    if (!user) return res.status(401).json('Unathorized')
    req.user = user
    next()
  } else {
    res.status(401).json('Unathorized')
  }
}