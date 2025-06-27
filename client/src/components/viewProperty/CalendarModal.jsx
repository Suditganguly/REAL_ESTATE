import React, { useState } from 'react';
import './CalendarModal.css';

const timeslots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

const CalendarModal = ({ onClose, onConfirm }) => {
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  const handleConfirm = () => {
    if (date && slot) {
      onConfirm(date, slot);
    }
  };

  return (
    <div className="calendar-overlay" onClick={onClose}>
      <div className="calendar-content" onClick={e => e.stopPropagation()}>
        <button className="calendar-close" onClick={onClose}>&times;</button>
        <h2 className="calendar-title">Book Appointment</h2>
        <label className="calendar-label">Select Date</label>
        <input
          type="date"
          className="calendar-date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <label className="calendar-label">Select Time Slot</label>
        <div className="calendar-slots">
          {timeslots.map(t => (
            <button
              key={t}
              className={`calendar-slot${slot === t ? ' selected' : ''}`}
              onClick={() => setSlot(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          className="calendar-confirm"
          onClick={handleConfirm}
          disabled={!date || !slot}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
