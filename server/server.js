require('dotenv').config(); // Make sure .env loads first

const express = require('express');
const path = require('path');
const dbConnect = require('./config/db');
const cors = require('cors');
const corsOptions = require('./middlewares/cors');

const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const propertyRoute = require('./routes/propertyRoutes');
const uploadRoute = require('./routes/uploadRoute');

const app = express();

// ✅ Connect to MongoDB
dbConnect();

// ✅ Middleware
app.use(express.json());
app.use(cors(corsOptions));

// ✅ Serve local uploads (if still needed — optional with Cloudinary)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// ✅ Routes
app.use(process.env.USER_ROUTE, userRoute);          // e.g. /real-estate/users
app.use(process.env.ADMIN_ROUTE, adminRoute);        // e.g. /real-estate/admin
app.use('/real-estate/properties', propertyRoute);   // Give property route its own base path
app.use('/api/upload', uploadRoute);                 // For image uploads

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
