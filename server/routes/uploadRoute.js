const express = require('express');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary'); // Make sure this exists

const router = express.Router();

// Use memory storage for direct upload to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Upload to Cloudinary via stream
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'uploads' }, // Optional: set folder in Cloudinary
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ error: 'Upload to Cloudinary failed' });
      }

      return res.status(200).json({
        message: 'File uploaded successfully',
        url: result.secure_url,
        public_id: result.public_id,
      });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
});

module.exports = router;
