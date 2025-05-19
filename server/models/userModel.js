const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      // Password is required for traditional login,
      // but not for social login
      required: function () {
        return !this.googleId;
      },
    },

    googleId: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: '',
    },

    address: {
      type: String,
      default: '',
    },

    profilePic: {
      type: String, // URL or filename
      default: 'default-profile.png',
    },

    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin'],
      default: 'buyer',
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
