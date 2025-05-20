const express = require('express');
const { adminRegister, adminLogin, adminDashboard } = require('../controller/adminController');
const router = express.Router();

// Middleware
const verifyAdminToken = require('../middlewares/AdminAuthMiddleware');

// Public routes
router.post('/register', adminRegister);
router.post('/login', adminLogin);

// Protected route
router.get('/dashboard', verifyAdminToken, adminDashboard);

module.exports = router;
