const jwt = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');

const adminProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await AdminModel.findById(decoded.id).select('-password');

      if (!admin) {
        return res.status(401).json({ status: 0, msg: 'Admin not found' });
      }

      req.admin = admin; // Attach admin to request

      next();
    } catch (error) {
      console.error('Auth middleware error:', error.message);
      res.status(401).json({ status: 0, msg: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ status: 0, msg: 'No token, authorization denied' });
  }
};

module.exports = adminProtect;
