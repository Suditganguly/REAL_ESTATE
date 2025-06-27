import React, { useState } from 'react';

export default function AddPropertyModal({ isOpen, onClose, onAdd }) {
  const [property, setProperty] = useState({
    name: '',
    location: '',
    price: '',
    status: 'Available',
    type: 'Apartment',
    availableFrom: ''
  });
  const [errors, setErrors] = useState({});

  const validatePrice = (price) => {
    const numericPrice = price.replace(/[$,]/g, '');
    if (isNaN(numericPrice)) {
      return false;
    }
    return true;
  };

  const formatPrice = (price) => {
    const numericPrice = price.replace(/[$,]/g, '');
    if (!isNaN(numericPrice) && numericPrice !== '') {
      return `$${Number(numericPrice).toLocaleString()}`;
    }
    return price;
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || validatePrice(value)) {
      setProperty({ ...property, price: value });
      setErrors({ ...errors, price: '' });
    } else {
      setErrors({ ...errors, price: 'Please enter a valid price' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors = {};
    if (!property.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!property.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!property.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (!validatePrice(property.price)) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!property.availableFrom) {
      newErrors.availableFrom = 'Available date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format price before submitting
    const formattedProperty = {
      ...property,
      price: formatPrice(property.price)
    };

    onAdd(formattedProperty);
    setProperty({ name: '', location: '', price: '', status: 'Available', type: 'Apartment', availableFrom: '' });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add New Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Property Name</label>
            <input
              type="text"
              value={property.name}
              onChange={(e) => {
                setProperty({ ...property, name: e.target.value });
                setErrors({ ...errors, name: '' });
              }}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.name ? 'border-red-500' : ''
              }`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Property Type</label>
            <select
              value={property.type}
              onChange={(e) => setProperty({ ...property, type: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Location</label>
            <input
              type="text"
              value={property.location}
              onChange={(e) => setProperty({ ...property, location: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Price</label>
            <input
              type="text"
              value={property.price}
              onChange={handlePriceChange}
              onBlur={(e) => {
                const formatted = formatPrice(e.target.value);
                setProperty({ ...property, price: formatted });
              }}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                errors.price ? 'border-red-500' : ''
              }`}
              placeholder="$0"
              required
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Available From</label>
            <input
              type="date"
              value={property.availableFrom}
              onChange={(e) => setProperty({ ...property, availableFrom: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={property.status}
              onChange={(e) => setProperty({ ...property, status: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Under Contract">Under Contract</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}