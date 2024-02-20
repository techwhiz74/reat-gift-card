const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const secretKey = 'password';

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, secretKey);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized token failed');
    }
  }
  if (!token) {
    res.status(404);
    throw new Error('Not authorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(404);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { protect, admin };
