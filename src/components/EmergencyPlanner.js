import React from 'react';
import './EmergencyPlanner.css';

const EmergencyPlanner = ({ onUpdate }) => {
  return (
    <div className="emergency-popup">
      <div className="popup-content">
        <h3>Flight Delayed!</h3>
        <p>Your flight is delayed by 3 hours. Would you like to replan Day 1?</p>
        <div className="suggested-alternatives">
          <h4>Suggested Alternatives:</h4>
          <ul>
            <li>Visit a local museum</li>
            <li>Go for a movie</li>
          </ul>
        </div>
        <button onClick={onUpdate} className="update-button">Update Itinerary</button>
      </div>
    </div>
  );
};

export default EmergencyPlanner;
