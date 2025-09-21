import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TripForm.css';

const personas = [
  { name: 'Solo', icon: '👤' },
  { name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { name: 'Group', icon: '👥' },
  { name: 'Luxury', icon: '💎' },
  { name: 'Backpacker', icon: '🎒' },
];

const TripForm = ({ setItinerary, setLoading, step, nextStep, prevStep }) => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: new Date(),
    days: '3',
    budget: '20000',
    style: 'Solo',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      const mockItinerary = {
        destination: formData.destination,
        days: formData.days,
        budget: formData.budget,
        plan: [
          { day: 1, activities: ['Activity 1', 'Activity 2'] },
          { day: 2, activities: ['Activity 3', 'Activity 4'] },
        ],
      };
      setItinerary(mockItinerary);
      setLoading(false);
    }, 2000);
  };

  const renderStep1 = () => (
    <>
      <h2>Destination & Dates</h2>
      <div className="form-group">
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="e.g., Goa, India"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <DatePicker
          selected={formData.startDate}
          onChange={handleDateChange}
          className="date-picker"
        />
      </div>
      <div className="form-group">
        <label htmlFor="days">Duration (days)</label>
        <input
          type="range"
          id="days"
          name="days"
          min="1"
          max="30"
          value={formData.days}
          onChange={handleChange}
        />
        <span>{formData.days} days</span>
      </div>
      <button type="button" onClick={nextStep} className="next-button">Next</button>
    </>
  );

  const renderStep2 = () => (
    <>
      <h2>Budget & Style</h2>
      <div className="form-group">
        <label htmlFor="budget">Budget (₹)</label>
        <input
          type="range"
          id="budget"
          name="budget"
          min="5000"
          max="100000"
          step="1000"
          value={formData.budget}
          onChange={handleChange}
        />
        <span>₹{formData.budget}</span>
      </div>
      <div className="form-group">
        <label>Travel Persona</label>
        <div className="persona-selector">
          {personas.map(persona => (
            <div
              key={persona.name}
              className={`persona-card ${formData.style === persona.name ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, style: persona.name })}
            >
              <span className="persona-icon">{persona.icon}</span>
              <span className="persona-name">{persona.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="prev-button">Back</button>
        <button type="button" onClick={nextStep} className="next-button">Next</button>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <h2>Generate Plan</h2>
      <p>Ready to build your personalized trip?</p>
      <div className="form-navigation">
        <button type="button" onClick={prevStep} className="prev-button">Back</button>
        <button type="submit" className="generate-button">Generate Plan ✨</button>
      </div>
    </>
  );

  return (
    <form onSubmit={handleSubmit} className="trip-form">
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </form>
  );
};

export default TripForm;
