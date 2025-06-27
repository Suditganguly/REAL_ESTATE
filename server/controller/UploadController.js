const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary'); // Make sure this exists

// Controller for handling image upload to Cloudinary
const uploadImage = (req, res) => {
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
        imageUrl: result.secure_url, // Use imageUrl for frontend
        public_id: result.public_id,
      });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = { uploadImage };