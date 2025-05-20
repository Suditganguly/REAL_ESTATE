const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/db');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const propertyRoute = require('./routes/propertyRoutes');

const app = express();

// Connect to MongoDB once
dbConnect();

// Middleware
app.use(express.json());

// Routes
app.use(process.env.USER_ROUTE, userRoute);
app.use(process.env.ADMIN_ROUTE, adminRoute);
app.use(process.env.USER_ROUTE, propertyRoute);

// Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
// http://localhost:5000/real-estate/admin/register
//t htp://localhost:5000/real-estate/admin/login
// http://localhost:5000/real-estate/admin/dashboard