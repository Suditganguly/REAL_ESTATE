import React, { useState } from 'react';
import './BookingSuccessModal.css';

const BookingSuccessModal = ({ appointment, onClose }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2000); // Auto-close after 2 seconds
  };

  if (!appointment) return null;

  return (
    <div className="booking-success-overlay" onClick={onClose}>
      <div className="booking-success-content" onClick={e => e.stopPropagation()}>
        <button className="booking-success-close" onClick={onClose}>&times;</button>
        <h2 className="booking-success-title">Booking Confirmed!</h2>
        <p className="booking-success-prop">{appointment.property.name} ({appointment.property.place})</p>
        <p className="booking-success-date">Date: <b>{appointment.date}</b></p>
        <p className="booking-success-time">Time: <b>{appointment.slot}</b></p>
        {!submitted ? (
          <form className="booking-success-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="booking-success-input"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
              className="booking-success-input"
            />
            <button type="submit" className="booking-success-btn">Confirm</button>
          </form>
        ) : (
          <div className="booking-success-message">
            <p>Thank you, <b>{username}</b>!<br />Your booking is confirmed.<br />We will contact you at <b>{phone}</b>.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccessModal;
