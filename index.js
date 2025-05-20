const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/property');
const uploadRoutes = require('./routes/upload');

const app = express();

console.log('Upload route loaded');


app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/upload', uploadRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


 

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


 app.use((err, req, res, next) => {
  console.error('Global error handler:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});
