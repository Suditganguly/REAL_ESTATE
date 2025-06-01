const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const userRegister = async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 0, msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
    });

    await newUser.save();

    res.status(201).json({
      status: 1,
      msg: 'User registered successfully',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 0, msg: 'Server error', error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: 0, msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 0, msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      status: 1,
      msg: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ status: 0, msg: 'Server error', error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ status: 0, msg: 'User not found' });
    }
    res.json({ status: 1, msg: 'User profile fetched successfully', user });
  } catch (error) {
    res.status(500).json({ status: 0, msg: 'Server error', error: error.message });
  }
};


const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 0, message: 'Image not provided' });
    }

    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'user-profiles',
            public_id: `${req.user._id}-profile`, // optional: consistent public_id
            overwrite: true,
            transformation: [{ width: 300, height: 300, crop: 'limit' }],
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      { profilePic: result.secure_url },
      { new: true }
    );

    res.json({
      status: 1,
      message: 'Image uploaded successfully',
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ status: 0, message: 'Server error', error: error.message });
  }
};

// delete profile image
const deleteProfileImage = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user || !user.profilePic) {
      return res.status(404).json({ status: 0, message: 'User or profile image not found' });
    }

    const publicId = user.profilePic.split('/').pop().split('.')[0]; // Extract public_id from URL

    await cloudinary.uploader.destroy(`user-profiles/${publicId}`);

    user.profilePic = null;
    await user.save();

    res.json({ status: 1, message: 'Profile image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ status: 0, message: 'Server error', error: error.message });
  }
};

module.exports = { userRegister, userLogin, getUserProfile , uploadProfileImage, deleteProfileImage };
