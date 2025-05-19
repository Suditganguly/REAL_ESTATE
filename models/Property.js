const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  address: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
  },
  images: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

propertySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Property', propertySchema);
