require('dotenv').config();
const jwt = require('jsonwebtoken');

const User = require('../api/models/userModel');
const { ACCESS_TOKEN_SECRET } = require('../config');

/**
 * New Auth Middleware
 * Checks for valid Auth JWT in Authorization header
 */
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
      status: 'active',
    });

    if (!user) {
      return res.status(404).json({ status: 404, error: 'User not found' });
      //throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ status: 400, error: 'Token error' });
    //next(error);
  }
};

/**
 * New Auth Middleware
 * Checks for valid Admin user
 */
const adminAuth = async (req, res, next) => {
  try {
    const userRole = req.user.role;
    if (userRole !== 'admin') {
      return res.status(404).json({ status: 404, error: 'only Admin Allow' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
  adminAuth,
};
