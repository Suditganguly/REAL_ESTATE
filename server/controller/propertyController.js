const Property = require('../models/PropertyModel');

const addProperty = async (req, res) => {
try {
if (!req.user || !req.user.userId) {
return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
}



const newProperty = new Property({
  ...req.body,
  owner: req.user.userId
});

await newProperty.save();
res.status(201).json(newProperty);
} catch (err) {
res.status(400).json({ error: err.message });
}
};

const deleteProperty = async (req, res) => {
try {
if (!req.user || !req.user.userId) {
return res.status(401).json({ error: 'Unauthorized: User not authenticated' });
}


const property = await Property.findById(req.params.id);

if (!property) {
  return res.status(404).json({ error: 'Property not found' });
}

if (property.owner.toString() !== req.user.userId) {
  return res.status(403).json({ error: 'Unauthorized to delete this property' });
}

await Property.findByIdAndDelete(req.params.id);
res.json({ message: 'Property deleted' });
} catch (err) {
res.status(500).json({ error: err.message });
}
};

const getPropertyById = async (req, res) => {
try {
const property = await Property.findById(req.params.id);
if (!property) {
return res.status(404).json({ error: 'Property not found' });
}
res.json(property);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

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

const properties = await Property.find(filter).populate('owner', 'name email');
res.json(properties);
} catch (err) {
res.status(500).json({ error: err.message });
}
};

module.exports = {
    addProperty,

getPropertyById,
getAllProperties,
deleteProperty
}
