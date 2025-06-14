const multer = require('multer');

const storage = multer.memoryStorage(); // use memory storage to get `buffer` for streamifier

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // optional: limit to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed!'), false);
  },
});

module.exports = upload;
