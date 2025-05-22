const express = require('express');
const router = express.Router();
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty
} = require('../controller/propertyController');

const verifyUserToken = require('../middlewares/UserAuthMiddleware');

// Add a property (Protected)
router.post('/add/property', verifyUserToken, addProperty);

// Get all properties (Public)
router.get('/view/property', getAllProperties);

// Get property by ID (Public)
router.get('/property/:id', getPropertyById);

// Delete property (Protected)
router.delete('/propertydelete/:id', verifyUserToken, deleteProperty);

module.exports = router;
