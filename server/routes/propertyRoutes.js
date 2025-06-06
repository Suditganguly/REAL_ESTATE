const express = require('express');
const router = express.Router();
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty,
  createResidency,
} = require('../controller/propertyController');

const verifyUserToken = require('../middlewares/UserAuthMiddleware');

// Add a property (Protected)
router.post('/add/property', verifyUserToken, addProperty);

// Get all properties (Public)
router.get('/view/property', getAllProperties);

// Get property by ID (Public)
router.get('/view/property/:id', getPropertyById);

// Delete property (Protected)
router.delete('/user/remove/property/:id', verifyUserToken, deleteProperty);

// create residential property
router.post('/add/residential', verifyUserToken, createResidency);

module.exports = router;