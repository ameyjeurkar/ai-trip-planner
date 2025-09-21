import React from "react";
import HotelCardItem from "./HotelCardItem";
import "./Hotels.css";

function Hotels({ trip }) {
  return (
    <div className="hotels-wrapper">
      <div className="hotels-card">
        <p className="hotels-title">Hotel Recommendation</p>
        <div className="hotels-grid">
          {trip?.tripData?.hotel_options?.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
