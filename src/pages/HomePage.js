import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const allTripsData = [
  {
    title: "Himalayan Adventure",
    price: "25,000",
    image:
      "https://images.unsplash.com/photo-1616527963293-0a2c9c45d3e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Adventure",
  },
  {
    title: "Kerala Backwaters",
    price: "18,000",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40402497b8?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Foodie",
  },
  {
    title: "Rajasthan Royal Tour",
    price: "30,000",
    image:
      "https://images.unsplash.com/photo-1599661046223-e06587261427?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Heritage",
  },
  {
    title: "Goa Beach Party",
    price: "15,000",
    image:
      "https://images.unsplash.com/photo-1570222649931-c2d16f6a3827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Nightlife",
  },
  {
    title: "Luxury Udaipur Stay",
    price: "50,000",
    image:
      "https://images.unsplash.com/photo-1593693397649-3d843e3a6dd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Luxury",
  },
];

const popularDestinationsData = [
  "Goa, India",
  "Jaipur, India",
  "Kerala, India",
  "Shimla, India",
  "Udaipur, India",
];

const HomePage = () => {
  const [allTrips, setAllTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [isCarouselActive, setIsCarouselActive] = useState(true);

  useEffect(() => {
    setAllTrips(allTripsData);
    setFilteredTrips(allTripsData);
    setPopularDestinations(popularDestinationsData);
  }, []);

  const handleFilter = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredTrips(allTrips);
      setIsCarouselActive(true);
    } else {
      setFilteredTrips(allTrips.filter((trip) => trip.category === category));
      setIsCarouselActive(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const tripTitles = allTrips.map((trip) => trip.title);
    const combinedSuggestions = [
      ...new Set([...popularDestinations, ...tripTitles]),
    ];

    if (query.length > 0) {
      const filteredSuggestions = combinedSuggestions.filter((dest) =>
        dest.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setIsCarouselActive(false);
    } else {
      setSuggestions([]);
      setFilteredTrips(allTrips);
      setIsCarouselActive(true);
    }
  };

  const handleSearchFocus = () => {
    const tripTitles = allTrips.map((trip) => trip.title);
    const combinedSuggestions = [
      ...new Set([...popularDestinations, ...tripTitles]),
    ];
    setSuggestions(combinedSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedDestination(suggestion);
    setSearchQuery(suggestion);
    setSuggestions([]);
    const destinationName = suggestion.split(",")[0];
    setFilteredTrips(
      allTrips.filter((trip) =>
        trip.title.toLowerCase().includes(destinationName.toLowerCase())
      )
    );
    setIsCarouselActive(false);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="quick-filters">
          <button
            onClick={() => handleFilter("All")}
            className={activeFilter === "All" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("Adventure")}
            className={activeFilter === "Adventure" ? "active" : ""}
          >
            🎒 Adventure
          </button>
          <button
            onClick={() => handleFilter("Foodie")}
            className={activeFilter === "Foodie" ? "active" : ""}
          >
            🍲 Food
          </button>
          <button
            onClick={() => handleFilter("Heritage")}
            className={activeFilter === "Heritage" ? "active" : ""}
          >
            🏛️ Heritage
          </button>
          <button
            onClick={() => handleFilter("Nightlife")}
            className={activeFilter === "Nightlife" ? "active" : ""}
          >
            🌃 Nightlife
          </button>
          <button
            onClick={() => handleFilter("Luxury")}
            className={activeFilter === "Luxury" ? "active" : ""}
          >
            💎 Luxury
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="plan-trip-section">
          <h2>Ready for your next adventure?</h2>
          <Link to="/create-trip" className="plan-trip-button">
            Generate Customized AI Trip
          </Link>
        </div>

        <h2>All Trips</h2>
        <div className="carousel-container">
          <div
            className={`featured-trips ${isCarouselActive ? "animated" : ""}`}
          >
            {(isCarouselActive
              ? [...filteredTrips, ...filteredTrips]
              : filteredTrips
            ).map((trip, index) => (
              <Link
                to="/itinerary"
                state={{ plan: trip }}
                className="trip-card-link"
                key={index}
              >
                <div className="trip-card">
                  <img src={trip.image} alt={trip.title} />
                  <h3>{trip.title}</h3>
                  <p>₹{trip.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
