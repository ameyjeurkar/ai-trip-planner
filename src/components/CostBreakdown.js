import React from 'react';
import './CostBreakdown.css';

const CostBreakdown = ({ plan }) => {
  const flightCost = 15000;
  const hotelCost = 20000;
  const activityCost = 5000;
  const totalCost = flightCost + hotelCost + activityCost;

  return (
    <div className="cost-breakdown">
      <h3>Cost Breakdown</h3>
      <div className="cost-item">
        <span>Flights ✈️</span>
        <span>₹{flightCost.toLocaleString()}</span>
      </div>
      <div className="cost-item">
        <span>Hotels 🏨</span>
        <span>₹{hotelCost.toLocaleString()}</span>
      </div>
      <div className="cost-item">
        <span>Activities 🎟️</span>
        <span>₹{activityCost.toLocaleString()}</span>
      </div>
      <div className="cost-total">
        <span>Total</span>
        <span>₹{totalCost.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CostBreakdown;
