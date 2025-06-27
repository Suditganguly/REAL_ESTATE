const express = require('express');
const { adminRegister, adminLogin, adminDashboard } = require('../controller/adminController');
const router = express.Router();

// Middleware
const verifyAdminToken = require('../middlewares/AdminAuthMiddleware');

// Public routes
router.post('/admin/register', adminRegister);
router.post('/admin/login', adminLogin);

// Protected route
router.get('/admin/dashboard', verifyAdminToken, adminDashboard);

module.exports = router;
