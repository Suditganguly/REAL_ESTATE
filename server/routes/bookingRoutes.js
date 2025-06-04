const express = require('express');
const router = express.Router();
const { bookVisit}  = require('../controller/bookingController');
const verifyUserToken = require('../middlewares/UserAuthMiddleware');

router.post('/book', verifyUserToken, bookVisit);

module.exports = router;