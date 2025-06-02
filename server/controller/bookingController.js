const Booking = require('../models/bookingModel');

const bookVisit = async (req, res) => {
  try {
    const { propertyId, visitDate } = req.body;
    const userId = req.user.id;

    const booking = new Booking({
      user: userId,
      property: propertyId,
      visitDate,
    });

    await booking.save();

    res.status(201).json({
      status: 1,
      message: 'Visit booked successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: 'Booking failed',
      error: error.message,
    });
  }
};

module.exports =  {bookVisit} ;