const cors = require('cors');
require('dotenv').config()
const corsOptions = {
  origin: process.env.CLIENT_ROUTE,
  credentials: true // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports= corsOptions;