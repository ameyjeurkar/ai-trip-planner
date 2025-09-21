import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TripsPage.css";

const upcomingTrips = [
  {
    destination: "Goa",
    duration: "4D3N",
    dates: "Oct 12–15",
    hotel: "Taj Vivanta",
    flight: "Indigo 6E123",
    budget: "25,000",
    status: "Booked ✈️",
    image:
      "https://www.shutterstock.com/image-photo/goa-india-08-sep-2024-260nw-2532518447.jpg",
  },
];

const pastTrips = [
  {
    destination: "Himalayan Adventure",
    duration: "7D6N",
    dates: "Jan 5–11",
    budget: "35,000",
    status: "Completed ✅",
    image:
      "https://www.shutterstock.com/image-photo/view-mount-everest-8848m-kala-260nw-2476521557.jpg",
  },
];

const savedTrips = [
  {
    destination: "Rajasthan Royal Tour",
    duration: "5D4N",
    budget: "30,000",
    status: "Planned ✍️",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLwsW2D0dxvTGUAhcL4cdF6WpZQVlnZz3YOMEJdzOpS6ypVX6nF8rdLpAuctzfasRaZw&usqp=CAU",
  },
];

const TripsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const renderTrips = (trips) => {
    if (trips.length === 0) {
      return (
        <div className="no-trips-fallback">
          <div className="fallback-illustration">🧳</div>
          <h3>No trips yet. Start planning your first adventure!</h3>
          <Link to="/planner" className="plan-trip-button">
            Plan a Trip
          </Link>
        </div>
      );
    }

    return trips.map((trip, index) => (
      <div className="trip-card" key={index}>
        <img
          src={trip.image}
          alt={trip.destination}
          className="trip-card-image"
        />
        <div className="trip-card-details">
          <h3>{trip.destination}</h3>
          <p>
            {trip.duration} | {trip.dates}
          </p>
          <p>Budget: ₹{trip.budget}</p>
          <p>Status: {trip.status}</p>
          <div className="trip-card-actions">
            <Link to="/itinerary" className="action-button">
              View Itinerary
            </Link>
            {trip.status === "Booked ✈️" && (
              <Link to="/booking" className="action-button">
                Manage Booking
              </Link>
            )}
            {trip.status === "Completed ✅" && (
              <button className="action-button">Rebook this trip 🔁</button>
            )}
            {trip.status === "Planned ✍️" && (
              <Link to="/planner" className="action-button">
                Continue Planning
              </Link>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="trips-page">
      <header className="trips-header">
        <h1>My Trips</h1>
        <Link to="/planner" className="plan-new-trip-button">
          ➕ Plan New Trip
        </Link>
      </header>
      <div className="trips-tabs">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={activeTab === "upcoming" ? "active" : ""}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={activeTab === "past" ? "active" : ""}
        >
          Past
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={activeTab === "saved" ? "active" : ""}
        >
          Saved / Drafts
        </button>
      </div>
      <div className="trips-list">
        {activeTab === "upcoming" && renderTrips(upcomingTrips)}
        {activeTab === "past" && renderTrips(pastTrips)}
        {activeTab === "saved" && renderTrips(savedTrips)}
      </div>
    </div>
  );
};

export default TripsPage;
