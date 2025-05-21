const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure the uploads/ folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Safe for nested paths
}

// Set up disk storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Route: POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  console.log('Received file:', req.file); // 🔍 Log uploaded file for debugging

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;

  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    path: imageUrl,
  });
});

module.exports = router;