import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';
import CalendarModal from './CalendarModal';
import BookingSuccessModal from './BookingSuccessModal';
import './PropertyPage.css';

// Mock property data
const mockProperties = [
  {
    id: 1,
    name: 'Sunset Villa',
    place: 'Goa',
    price: '₹2,50,00,000',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    reviews: 4.7,
    bedrooms: 4,
    bathrooms: 3,
    interior: 'Modern',
    washroomType: 'Attached',
    bedType: 'King & Queen',
    description: 'A luxurious villa with a sea view, modern interiors, and a private pool.',
    ground: 'Large garden, private parking',
  },
  {
    id: 2,
    name: 'Urban Heights',
    place: 'Mumbai',
    price: '₹3,10,00,000',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    reviews: 4.5,
    bedrooms: 3,
    bathrooms: 2,
    interior: 'Contemporary',
    washroomType: 'Common',
    bedType: 'Queen',
    description: 'High-rise apartment with city view, gym, and clubhouse access.',
    ground: 'Community park, children’s play area',
  },
  {
    id: 3,
    name: 'Green Acres',
    place: 'Bangalore',
    price: '₹1,80,00,000',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    reviews: 4.2,
    bedrooms: 2,
    bathrooms: 2,
    interior: 'Minimalist',
    washroomType: 'Attached',
    bedType: 'Double',
    description: 'Eco-friendly home with solar panels and a green backyard.',
    ground: 'Organic vegetable patch',
  },
  {
    id: 4,
    name: 'Palm Residency',
    place: 'Pune',
    price: '₹2,10,00,000',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    reviews: 4.6,
    bedrooms: 3,
    bathrooms: 2,
    interior: 'Classic',
    washroomType: 'Common',
    bedType: 'King',
    description: 'Spacious flat with palm-lined views and elegant interiors.',
    ground: 'Jogging track, open gym',
  },
  {
    id: 5,
    name: 'Lakeview Mansion',
    place: 'Udaipur',
    price: '₹4,00,00,000',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    reviews: 4.9,
    bedrooms: 5,
    bathrooms: 4,
    interior: 'Luxury',
    washroomType: 'Attached',
    bedType: 'King',
    description: 'Palatial mansion with a lake view, marble floors, and a home theater.',
    ground: 'Private dock, boathouse',
  },
  {
    id: 6,
    name: 'Royal Enclave',
    place: 'Delhi',
    price: '₹3,50,00,000',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80',
    reviews: 4.3,
    bedrooms: 4,
    bathrooms: 3,
    interior: 'Traditional',
    washroomType: 'Attached',
    bedType: 'Queen',
    description: 'Elegant home in a gated community with traditional decor.',
    ground: 'Tennis court, landscaped lawns',
  },
  {
    id: 7,
    name: 'Hilltop Cottage',
    place: 'Shimla',
    price: '₹1,20,00,000',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&w=400&q=80',
    reviews: 4.8,
    bedrooms: 2,
    bathrooms: 1,
    interior: 'Rustic',
    washroomType: 'Attached',
    bedType: 'Double',
    description: 'Cozy cottage with a fireplace and panoramic hill views.',
    ground: 'Outdoor deck, fire pit',
  },
  {
    id: 8,
    name: 'Seaside Retreat',
    place: 'Chennai',
    price: '₹2,80,00,000',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    reviews: 4.4,
    bedrooms: 3,
    bathrooms: 2,
    interior: 'Beach',
    washroomType: 'Common',
    bedType: 'Queen',
    description: 'Beachfront property with open interiors and a large patio.',
    ground: 'Direct beach access',
  },
];

const PropertyPage = () => {
  const [search, setSearch] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredProperties = mockProperties.filter((property) => {
    const searchText = search.toLowerCase();
    // If search is empty, show all
    if (!searchText) return true;
    // If search is a number, match price
    if (/^\d+$/.test(searchText)) {
      return property.price.replace(/[^0-9]/g, '').includes(searchText);
    }
    // If search is a letter, match name or place (starts with)
    return (
      property.name.toLowerCase().startsWith(searchText) ||
      property.place.toLowerCase().startsWith(searchText)
    );
  });

  const handleCardClick = (property) => setSelectedProperty(property);
  const handleModalClose = () => setSelectedProperty(null);
  const handleBook = () => {
    setShowCalendar(true);
  };
  const handleCalendarClose = () => setShowCalendar(false);
  const handleConfirm = (date, slot) => {
    setAppointment({ date, slot, property: selectedProperty });
    setShowCalendar(false);
    setSelectedProperty(null);
    setShowSuccess(true);
  };
  const handleSuccessClose = () => setShowSuccess(false);

  return (
    <div className="property-page">
      <h1>Property Listings</h1>
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by name, place, or price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <svg className="search-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke="#888" strokeWidth="2" fill="none" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#888" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="property-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} onClick={() => handleCardClick(property)} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
      <PropertyModal
        property={selectedProperty}
        onClose={handleModalClose}
        onBook={handleBook}
      />
      {showCalendar && (
        <CalendarModal
          onClose={handleCalendarClose}
          onConfirm={handleConfirm}
        />
      )}
      {showSuccess && (
        <BookingSuccessModal
          appointment={appointment}
          onClose={handleSuccessClose}
        />
      )}
    </div>
  );
};

export default PropertyPage;
