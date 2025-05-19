const User = require('../models/User');const jwt = require('jsonwebtoken');

// Register Controller
exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

const secret = process.env.JWT_SECRET;
console.log("Signing token with secret:", secret, "Type:", typeof secret);

if (!secret) {
  return res.status(500).json({ error: 'JWT secret missing on server' });
}

const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });



    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
