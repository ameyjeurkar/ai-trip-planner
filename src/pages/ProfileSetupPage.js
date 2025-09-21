import React from 'react';
import './ProfileSetupPage.css';

const ProfileSetupPage = () => {
  return (
    <div className="profile-setup-page">
      <h2>Setup Your Profile</h2>
      <p>Tell us your travel preferences to get personalized recommendations.</p>

      <form className="profile-form">
        <div className="avatar-section">
          <img src="https://via.placeholder.com/100" alt="Avatar" className="avatar" />
          <input type="file" id="avatar-upload" />
          <label htmlFor="avatar-upload">Change Avatar</label>
          <input type="text" placeholder="Your Name" />
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget Range</label>
          <input type="range" id="budget" min="5000" max="100000" step="1000" />
        </div>

        <div className="form-group">
          <label>Travel Style</label>
          <div className="checkbox-group">
            <label><input type="checkbox" name="style" value="adventure" /> Adventure</label>
            <label><input type="checkbox" name="style" value="luxury" /> Luxury</label>
            <label><input type="checkbox" name="style" value="heritage" /> Heritage</label>
            <label><input type="checkbox" name="style" value="foodie" /> Foodie</label>
            <label><input type="checkbox" name="style" value="eco" /> Eco</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Preferred Duration</label>
          <select id="duration">
            <option>1-3 Days</option>
            <option>4-7 Days</option>
            <option>1-2 Weeks</option>
            <option>2+ Weeks</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preferred Destinations</label>
          <div className="tags-input">
            {/* Placeholder for tags */}
            <span className="tag">Goa</span>
            <span className="tag">Kerala</span>
            <input type="text" placeholder="Add a destination" />
          </div>
        </div>

        <button type="submit" className="save-button">Save & Continue</button>
      </form>
    </div>
  );
};

export default ProfileSetupPage;
