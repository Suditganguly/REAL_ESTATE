const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const dbConnect = require('./config/db');
const cors = require('cors');
const corsOptions = require('./middlewares/cors');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const propertyRoute = require('./routes/propertyRoutes');
// const uploadRoute = require('./routes/uploadRoute');
const bookingRoute = require('./routes/bookingRoutes'); 

const app = express();

// Connect to MongoDB
dbConnect();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Serve static uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Routes
app.use(process.env.USER_ROUTE, userRoute); // User routes for authentication and profile management
app.use(process.env.ADMIN_ROUTE, adminRoute); // Admin routes for managing properties and users
app.use(process.env.USER_ROUTE , propertyRoute); // Property routes for listing and searching properties
// app.use(process.env.USER_ROUTE , uploadRoute); // Upload route for images
app.use(process.env.BOOKING_ROUTE, bookingRoute); // Booking route for visit scheduling

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);