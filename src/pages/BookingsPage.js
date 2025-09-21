import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BookingsPage.css';

const flightBookings = [
  {
    id: 'FL123',
    details: 'Indigo 6E123 | BLR → GOI',
    date: '12 Oct, 10:30 AM',
    status: 'Confirmed ✅',
    payment: 'Paid ✅',
  },
];

const hotelBookings = [
  {
    id: 'HO456',
    details: 'Taj Vivanta, Goa',
    date: 'Check-in: 12 Oct | 4 Nights',
    guests: '2 Adults',
    status: 'Confirmed ✅',
    payment: 'Paid ✅',
  },
];

const activityBookings = [
  {
    id: 'AC789',
    details: 'Sunset Cruise 🌅',
    date: '13 Oct, 6:00 PM',
    price: '₹1,500 (2 persons)',
    status: 'Confirmed ✅',
    payment: 'Paid ✅',
  },
];

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('flights');

  const handleViewTicket = (bookingId) => {
    alert(`Viewing ticket for booking ID: ${bookingId}`);
  };

  const handleCancelModify = (bookingId) => {
    alert(`Initiating cancel/modify for booking ID: ${bookingId}`);
  };

  const renderBookings = (bookings) => {
    if (bookings.length === 0) {
      return (
        <div className="no-bookings-fallback">
          <div className="fallback-illustration">🎟️</div>
          <h3>No bookings yet. Plan your trip and confirm your first booking!</h3>
          <Link to="/planner" className="plan-trip-button">Plan a Trip</Link>
        </div>
      );
    }

    return bookings.map((booking) => (
      <div className="booking-card" key={booking.id}>
        <div className="booking-card-details">
          <h4>{booking.details}</h4>
          <p>{booking.date}</p>
          {booking.guests && <p>Guests: {booking.guests}</p>}
          {booking.price && <p>Price: {booking.price}</p>}
          <p>Status: {booking.status} | Payment: {booking.payment}</p>
        </div>
        <div className="booking-card-actions">
          <button className="action-button" onClick={() => handleViewTicket(booking.id)}>View Ticket</button>
          <button className="action-button" onClick={() => handleCancelModify(booking.id)}>Cancel/Modify</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bookings-page">
      <header className="bookings-header">
        <h1>My Bookings</h1>
        <div className="bookings-filter">
          <select>
            <option>Sort by Date</option>
            <option>Sort by Type</option>
          </select>
        </div>
      </header>
      <div className="bookings-tabs">
        <button onClick={() => setActiveTab('flights')} className={activeTab === 'flights' ? 'active' : ''}>Flights ✈️</button>
        <button onClick={() => setActiveTab('hotels')} className={activeTab === 'hotels' ? 'active' : ''}>Hotels 🏨</button>
        <button onClick={() => setActiveTab('activities')} className={activeTab === 'activities' ? 'active' : ''}>Activities 🎟️</button>
      </div>
      <div className="bookings-list">
        {activeTab === 'flights' && renderBookings(flightBookings)}
        {activeTab === 'hotels' && renderBookings(hotelBookings)}
        {activeTab === 'activities' && renderBookings(activityBookings)}
      </div>
    </div>
  );
};

export default BookingsPage;
