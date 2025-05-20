const express = require('express');
const { userRegister, userLogin, getUserProfile } = require('../controller/userController');
const router = express.Router();
const verifyUserToken = require('../middlewares/UserAuthMiddleware');

// Public routes
router.post("/user/register", userRegister);
router.post("/user/login", userLogin);

// Protected route
router.get("/user/profile", verifyUserToken, getUserProfile);

module.exports = router;
