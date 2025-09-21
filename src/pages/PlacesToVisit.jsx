import React from "react";
import PlaceCardItem from "./PlaceCardItem";
import "./PlacesToVisit.css";

function PlacesToVisit({ trip }) {
  // Convert itinerary to array if it's an object
  const itinerary = trip?.tripData?.itinerary
    ? Array.isArray(trip.tripData.itinerary)
      ? trip.tripData.itinerary
      : Object.values(trip.tripData.itinerary)
    : [];

  return (
    <div className="places-wrapper">
      <div className="places-card">
        <p className="places-title">Places to Visit</p>

        {itinerary.length === 0 ? (
          <p className="no-itinerary">No places to display</p>
        ) : (
          itinerary.map((item, index) => {
            const plan = item.plan
              ? Array.isArray(item.plan)
                ? item.plan
                : Object.values(item.plan)
              : [];

            return (
              <div key={index} className="day-section">
                <p className="day-title">{item.day}</p>
                <div className="places-grid">
                  {plan.map((place, idx) => (
                    <PlaceCardItem key={idx} place={place} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
