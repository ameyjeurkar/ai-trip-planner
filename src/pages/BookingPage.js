import React from 'react';
import { Link } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  return (
    <div className="booking-page">
      <h2>Booking Details</h2>
      <div className="trip-summary">
        <h3>Trip Summary</h3>
        <div className="summary-card">
          <h4>Flights + Hotels + Experiences</h4>
          <p>Total Price: ₹50,000</p>
          <Link to="/payment" className="confirm-booking-button">
            Proceed to Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
