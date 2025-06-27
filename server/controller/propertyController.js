const Property = require('../models/propertyModel');

// Add a new property
const addProperty = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const newProperty = new Property({
      ...req.body,
      owner: req.user._id
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this property' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'fullName email');
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all properties with optional filters
const getAllProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, keyword } = req.query;
    const filter = {};

    if (location) {
      filter.address = { $regex: location, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }

    const properties = await Property.find(filter).populate('owner', 'fullName email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create residency
const createResidency = async (req, res) => {
  try {
    const { title, description, price, country, city, address, image, facilities } = req.body;
    const userEmail = req.user.email;

    const newProperty = new Property({
      title,
      description,
      price,
      country,
      city,
      address,
      image,
      facilities,
      userEmail
    });

    await newProperty.save();
    res.status(201).json({ status: 1, message: 'Property added successfully', property: newProperty });
  } catch (error) {
    res.status(500).json({ status: 0, message: 'Error while adding property', error: error.message });
  }
};

module.exports = {
  addProperty,
  getPropertyById,
  getAllProperties,
  deleteProperty,
  createResidency,
};