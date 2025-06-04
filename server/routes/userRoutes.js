const express = require('express');
const {
  userRegister,
  userLogin,
  getUserProfile,
  uploadProfileImage,
  deleteProfileImage,
} = require('../controller/userController');

const router = express.Router();
const verifyUserToken = require('../middlewares/UserAuthMiddleware');
const upload = require('../middlewares/multer');

// Public routes
router.post('/register', userRegister);
router.post('/login', userLogin);

// Protected routes
router.get('/profile', verifyUserToken, getUserProfile);

// Image upload route
router.post(
  '/upload-profile-image',
  verifyUserToken,
  upload.single('image'), // this is correct here
  uploadProfileImage
);

// image delete route
router.delete(
  '/delete-profile-image',
  verifyUserToken,
  deleteProfileImage // Use the correct controller here
);

module.exports = router;
