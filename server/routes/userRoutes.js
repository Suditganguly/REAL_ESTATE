const express = require('express');
const { userRegister, userLogin, getUserProfile } = require('../controller/userController');
const router = express.Router();
const verifyUserToken = require('../middlewares/UserAuthMiddleware');

// Public routes
router.post("/register", userRegister);
router.post("/login", userLogin);

// Protected route
router.get("/profile", verifyUserToken, getUserProfile);

module.exports = router;
