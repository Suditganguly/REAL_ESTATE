import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property, onClick }) => {
  return (
    <div className="property-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <img src={property.image} alt={property.name} className="property-image" />
      <div className="property-info">
        <h2 className="property-name">{property.name}</h2>
        <p className="property-place">{property.place}</p>
        <p className="property-price">{property.price}</p>
        <div className="property-details-row">
          <span title="Reviews" className="property-reviews">⭐ {property.reviews}</span>
          <span title="Bedrooms" className="property-bedrooms">🛏 {property.bedrooms}</span>
          <span title="Bathrooms" className="property-bathrooms">🛁 {property.bathrooms}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
