import React from 'react';
import './PropertyModal.css';

const PropertyModal = ({ property, onClose, onBook }) => {
  if (!property) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <img src={property.image} alt={property.name} className="modal-image" />
        <h2 className="modal-title">{property.name}</h2>
        <p className="modal-place">{property.place}</p>
        <p className="modal-price">{property.price}</p>
        <div className="modal-details-row">
          <span title="Reviews" className="modal-reviews">⭐ {property.reviews}</span>
          <span title="Bedrooms" className="modal-bedrooms">🛏 {property.bedrooms}</span>
          <span title="Bathrooms" className="modal-bathrooms">🛁 {property.bathrooms}</span>
        </div>
        <div className="modal-extra-details">
          <p><b>Interior:</b> {property.interior}</p>
          <p><b>Washroom Type:</b> {property.washroomType}</p>
          <p><b>Bed Type:</b> {property.bedType}</p>
          <p><b>Description:</b> {property.description}</p>
          <p><b>Ground/Field:</b> {property.ground}</p>
        </div>
        <button className="modal-book-btn" onClick={onBook}>Book Your Appointment</button>
      </div>
    </div>
  );
};

export default PropertyModal;
