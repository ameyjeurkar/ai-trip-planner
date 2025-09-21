import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const allTripsData = 
[
  {
    "title": "Himalayan Adventure",
    "price": "25,000",
    "image": "https://www.shutterstock.com/image-photo/view-mount-everest-8848m-kala-260nw-2476521557.jpg",
    "category": "Adventure"
  },
  {
    "title": "Kerala Backwaters",
    "price": "18,000",
    "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D%3D",
    "category": "Foodie"
  },
  {
    "title": "Rajasthan Royal Tour",
    "price": "30,000",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTLwsW2D0dxvTGUAhcL4cdF6WpZQVlnZz3YOMEJdzOpS6ypVX6nF8rdLpAuctzfasRaZw&usqp=CAU",
    "category": "Heritage"
  },
  {
    "title": "Goa Beach Party",
    "price": "15,000",
    "image": "https://www.shutterstock.com/image-photo/goa-india-08-sep-2024-260nw-2532518447.jpg",
    "category": "Nightlife"
  },
  {
    "title": "Luxury Udaipur Stay",
    "price": "50,000",
    "image": "https://www.ahstatic.com/photos/b9t3_ho_00_p_1024x768.jpg",
    "category": "Luxury"
  }
]

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
