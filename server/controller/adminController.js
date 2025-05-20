const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');

// Admin registration
const adminRegister = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ status: 0, msg: 'Admin already exists' });
    }

    // Create new admin (password hashing done in model pre-save hook)
    const newAdmin = new AdminModel({ fullName, email, password });
    await newAdmin.save();

    res.status(201).json({
      status: 1,
      msg: 'Admin registered successfully',
      admin: {
        id: newAdmin._id,
        fullName: newAdmin.fullName,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 0, msg: 'Server error', error: error.message });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ status: 0, msg: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ status: 0, msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      status: 1,
      msg: 'Login successful',
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ status: 0, msg: 'Server error', error: error.message });
  }
};

// Admin dashboard - protected route
const adminDashboard = async (req, res) => {
  try {
    // req.admin is attached by adminProtect middleware
    res.json({
      status: 1,
      msg: 'Welcome to Admin Dashboard',
      admin: {
        id: req.admin._id,
        fullName: req.admin.fullName,
        email: req.admin.email,
        role: req.admin.role,
      },
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ status: 0, msg: 'Server error', error: error.message });
  }
};


module.exports = { adminRegister, adminLogin, adminDashboard };
