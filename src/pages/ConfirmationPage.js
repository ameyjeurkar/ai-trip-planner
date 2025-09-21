import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const plan = location.state?.plan;
  const bookingId = `TRIP${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✅</div>
        <h2>Booking Confirmed!</h2>
        <p>Your booking ID is <strong>{bookingId}</strong>.</p>
        {plan && (
          <div className="trip-details">
            <h3>{plan.title}</h3>
            <p>A confirmation email has been sent to your registered email address.</p>
          </div>
        )}
        <div className="confirmation-actions">
          <button className="share-button">Share Itinerary</button>
          <Link to="/" className="home-button">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
