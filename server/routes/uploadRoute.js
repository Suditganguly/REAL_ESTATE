const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controller/UploadController');

const router = express.Router();

// Use memory storage for direct upload to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/image/upload', upload.single('image'), uploadImage);

module.exports = router;