const express = require('express');
const router = express.Router();
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  deleteProperty
} = require('../controllers/propertyController');

const authMiddleware = require('../middleware/authMiddleware');

// Add a property (Protected)
router.post('/', authMiddleware, addProperty);

// Get all properties (Public)
router.get('/', getAllProperties);

// Get property by ID (Public)
router.get('/:id', getPropertyById);

// Delete property (Protected)
router.delete('/:id', authMiddleware, deleteProperty);

module.exports = router;
