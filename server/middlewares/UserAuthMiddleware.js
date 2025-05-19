const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ status: 0, msg: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ status: 0, msg: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ status: 0, msg: 'No token, authorization denied' });
  }
};

module.exports = protect;