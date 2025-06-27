require('dotenv').config(); // Make sure .env loads first

const express = require('express');
const dbConnect = require('./config/db');
const cors = require('cors');
const corsOptions = require('./middlewares/cors');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const propertyRouter = require('./routes/propertyRoutes');
const uploadRouter = require('./routes/uploadRoute');
const bookingRouter = require('./routes/bookingRoutes'); 

const app = express();
// ✅ Connect to MongoDB
dbConnect();

// ✅ Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use(process.env.USER_ROUTE, userRouter); // User routes for authentication and profile management
app.use(process.env.ADMIN_ROUTE, adminRouter); // Admin routes for managing properties and users
app.use(process.env.USER_ROUTE , propertyRouter); // Property routes for listing and searching properties
app.use(process.env.USER_ROUTE , uploadRouter); // Upload route for images
app.use(process.env.BOOKING_ROUTE, bookingRouter); // Booking route for visit scheduling

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
