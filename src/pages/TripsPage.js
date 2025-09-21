import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TripsPage.css';

const upcomingTrips = [
  {
    destination: 'Goa',
    duration: '4D3N',
    dates: 'Oct 12–15',
    hotel: 'Taj Vivanta',
    flight: 'Indigo 6E123',
    budget: '25,000',
    status: 'Booked ✈️',
    image: 'https://images.unsplash.com/photo-1570222649931-c2d16f6a3827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const pastTrips = [
  {
    destination: 'Himalayan Adventure',
    duration: '7D6N',
    dates: 'Jan 5–11',
    budget: '35,000',
    status: 'Completed ✅',
    image: 'https://images.unsplash.com/photo-1616527963293-0a2c9c45d3e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const savedTrips = [
  {
    destination: 'Rajasthan Royal Tour',
    duration: '5D4N',
    budget: '30,000',
    status: 'Planned ✍️',
    image: 'https://images.unsplash.com/photo-1599661046223-e06587261427?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const TripsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const renderTrips = (trips) => {
    if (trips.length === 0) {
      return (
        <div className="no-trips-fallback">
          <div className="fallback-illustration">🧳</div>
          <h3>No trips yet. Start planning your first adventure!</h3>
          <Link to="/planner" className="plan-trip-button">Plan a Trip</Link>
        </div>
      );
    }

    return trips.map((trip, index) => (
      <div className="trip-card" key={index}>
        <img src={trip.image} alt={trip.destination} className="trip-card-image" />
        <div className="trip-card-details">
          <h3>{trip.destination}</h3>
          <p>{trip.duration} | {trip.dates}</p>
          <p>Budget: ₹{trip.budget}</p>
          <p>Status: {trip.status}</p>
          <div className="trip-card-actions">
            <Link to="/itinerary" className="action-button">View Itinerary</Link>
            {trip.status === 'Booked ✈️' && <Link to="/booking" className="action-button">Manage Booking</Link>}
            {trip.status === 'Completed ✅' && <button className="action-button">Rebook this trip 🔁</button>}
            {trip.status === 'Planned ✍️' && <Link to="/planner" className="action-button">Continue Planning</Link>}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="trips-page">
      <header className="trips-header">
        <h1>My Trips</h1>
        <Link to="/planner" className="plan-new-trip-button">➕ Plan New Trip</Link>
      </header>
      <div className="trips-tabs">
        <button onClick={() => setActiveTab('upcoming')} className={activeTab === 'upcoming' ? 'active' : ''}>Upcoming</button>
        <button onClick={() => setActiveTab('past')} className={activeTab === 'past' ? 'active' : ''}>Past</button>
        <button onClick={() => setActiveTab('saved')} className={activeTab === 'saved' ? 'active' : ''}>Saved / Drafts</button>
      </div>
      <div className="trips-list">
        {activeTab === 'upcoming' && renderTrips(upcomingTrips)}
        {activeTab === 'past' && renderTrips(pastTrips)}
        {activeTab === 'saved' && renderTrips(savedTrips)}
      </div>
    </div>
  );
};

export default TripsPage;
