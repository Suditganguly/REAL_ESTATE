const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Authorization Header:', authHeader); // 🔍 Log the auth header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // 🔍 Log decoded payload

    req.user = { userId: decoded.userId };
    console.log('Authenticated user ID:', req.user.userId); // ✅ Confirm user assignment

    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    return res.status(400).json({ error: 'Invalid token' });
  }
};
