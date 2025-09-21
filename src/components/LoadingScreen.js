import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="ai-animation">✨</div>
        <h2>Building your personalized trip...</h2>
        <div className="skeleton-cards">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
