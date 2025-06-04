require('dotenv').config(); // Make sure .env loads first

const express = require('express');
const path = require('path');
const dbConnect = require('./config/db');
const cors = require('cors');
const corsOptions = require('./middlewares/cors');

const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const propertyRoute = require('./routes/propertyRoutes');
<<<<<<< HEAD
const uploadRoute = require('./routes/uploadRoute');
=======
// const uploadRoute = require('./routes/uploadRoute');
const bookingRoute = require('./routes/bookingRoutes'); 
>>>>>>> ea6a69f00052fbdfd658ebaa3045195082875c5a

const app = express();

// ✅ Connect to MongoDB
dbConnect();

// ✅ Middleware
app.use(express.json());
app.use(cors(corsOptions));

<<<<<<< HEAD
// ✅ Serve local uploads (if still needed — optional with Cloudinary)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// ✅ Routes
app.use(process.env.USER_ROUTE, userRoute);          // e.g. /real-estate/users
app.use(process.env.ADMIN_ROUTE, adminRoute);        // e.g. /real-estate/admin
app.use('/real-estate/properties', propertyRoute);   // Give property route its own base path
app.use('/api/upload', uploadRoute);                 // For image uploads
=======
// Serve static uploads folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Routes
app.use(process.env.USER_ROUTE, userRoute); // User routes for authentication and profile management
app.use(process.env.ADMIN_ROUTE, adminRoute); // Admin routes for managing properties and users
app.use(process.env.USER_ROUTE , propertyRoute); // Property routes for listing and searching properties
// app.use(process.env.USER_ROUTE , uploadRoute); // Upload route for images
app.use(process.env.BOOKING_ROUTE, bookingRoute); // Booking route for visit scheduling
>>>>>>> ea6a69f00052fbdfd658ebaa3045195082875c5a

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
