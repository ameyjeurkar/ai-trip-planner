import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
      <p>Generating your personalized itinerary...</p>
    </div>
  );
};

export default LoadingSpinner;
