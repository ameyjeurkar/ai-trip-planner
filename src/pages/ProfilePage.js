import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src="https://tse1.mm.bing.net/th/id/OIP.FnoGjSeBXsYPusb9hi5HnAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Avatar" className="profile-avatar" />
        <h3>Test User</h3>
        <p>test@example.com</p>
        <button className="edit-profile-btn">Edit Preferences</button>
      </div>

      <div className="rewards-section">
        <h3>Your Rewards</h3>
        <div className="rewards-bar">
          <div className="rewards-progress" style={{ width: '60%' }}></div>
        </div>
        <p>You are 400 points away from the next level!</p>
      </div>

      <div className="saved-items">
        <h3>Saved Itineraries</h3>
        <div className="saved-item-card">
          <p>Goa Adventure - 5 Days</p>
        </div>
        <h3>Past Bookings</h3>
        <div className="saved-item-card">
          <p>Kerala Backwaters - 7 Days</p>
        </div>
      </div>

      <div className="settings-section">
        <h3>Settings</h3>
        <div className="setting-option">
          <span>Currency</span>
          <span>INR (₹)</span>
        </div>
        <div className="setting-option">
          <span>Language</span>
          <span>English</span>
        </div>
        <div className="setting-option">
          <span>Dark Mode</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
