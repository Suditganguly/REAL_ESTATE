const mongoose = require('mongoose');

const facilitiesSchema = new mongoose.Schema({
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  parkings: { type: Number, default: 0 },
}, { _id: false });

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
  country: { type: String, required: true },
  city: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  facilities: facilitiesSchema,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

propertySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Property', propertySchema);