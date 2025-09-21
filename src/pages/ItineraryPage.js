import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Itinerary from '../components/Itinerary';
import MapView from '../components/MapView';
import CostBreakdown from '../components/CostBreakdown';
import HiddenGems from '../components/HiddenGems';
import Notification from '../components/Notification';
import './ItineraryPage.css';

// Helper to generate a mock itinerary from a trip
const generateMockItinerary = (trip) => {
  if (!trip) return null;

  return {
    destination: trip.title,
    days: '3', // Mocked
    budget: trip.price,
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Exploration',
        activities: [
          { time: 'Morning', title: 'Arrive and Check-in', description: 'Settle into your hotel.', cost: 0 },
          { time: 'Afternoon', title: 'Local Market Visit', description: 'Explore the vibrant local markets.', cost: 500 },
          { time: 'Evening', title: 'Welcome Dinner', description: 'Enjoy a traditional dinner.', cost: 1500 },
        ],
      },
      {
        day: 2,
        title: 'Sightseeing',
        activities: [
          { time: 'Morning', title: 'Visit a Famous Landmark', description: 'Explore the iconic landmark of the city.', cost: 1000 },
          { time: 'Afternoon', title: 'Museum Tour', description: 'Discover the local history and art.', cost: 700 },
          { time: 'Evening', title: 'Cultural Show', description: 'Experience a traditional performance.', cost: 1200 },
        ],
      },
      {
        day: 3,
        title: 'Departure',
        activities: [
          { time: 'Morning', title: 'Relax at the Hotel', description: 'Enjoy the hotel amenities.', cost: 0 },
          { time: 'Afternoon', title: 'Souvenir Shopping', description: 'Buy some souvenirs to take back home.', cost: 800 },
          { time: 'Evening', title: 'Depart for Home', description: 'Head to the airport for your flight.', cost: 0 },
        ],
      },
    ],
  };
};

const ItineraryPage = () => {
  const location = useLocation();
  const [plan, setPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('day-wise');
  const [showEmergency, setShowEmergency] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (location.state && location.state.plan) {
      setPlan(generateMockItinerary(location.state.plan));
    }

    // Mock emergency trigger
    const timer = setTimeout(() => {
      setShowEmergency(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [location.state]);

  if (!plan) {
    return (
      <div className="itinerary-page">
        <h1>Itinerary</h1>
        <p>No itinerary generated. Please go back and create a plan first.</p>
        <Link to="/" className="back-button">
          Back to Home
        </Link>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'day-wise':
        return <Itinerary plan={plan} setPlan={setPlan} />;
      case 'map':
        return <MapView />;
      case 'cost':
        return <CostBreakdown plan={plan} />;
      default:
        return <Itinerary plan={plan} setPlan={setPlan} />;
    }
  };

  const handleUpdateItinerary = () => {
    alert('Itinerary Updated!');
    setShowEmergency(false);
  };

  const handleAddToItinerary = (gem) => {
    const newActivity = {
      time: 'Evening',
      title: gem.title,
      description: 'A special hidden gem experience.',
      cost: 1000, // Mock cost
    };

    const updatedPlan = { ...plan };
    // Add to the last day for simplicity
    const lastDayIndex = updatedPlan.itinerary?.length - 1;
    updatedPlan.itinerary[lastDayIndex].activities.push(newActivity);

    setPlan(updatedPlan);
    setNotification({
      message: `${gem.title} added to your itinerary!`,
      actionText: 'View Itinerary',
      onAction: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setNotification(null);
      },
    });

    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="itinerary-page">
      {notification && (
        <Notification
          message={notification.message}
          actionText={notification.actionText}
          onAction={notification.onAction}
        />
      )}
      <div className="itinerary-header">
        <h2>{plan.destination}</h2>
        <p>{plan.days} Days | Total Budget: ₹{plan.budget}</p>
      </div>

      <div className="itinerary-tabs">
        <button onClick={() => setActiveTab('day-wise')} className={activeTab === 'day-wise' ? 'active' : ''}>
          🗓 Day-wise
        </button>
        <button onClick={() => setActiveTab('map')} className={activeTab === 'map' ? 'active' : ''}>
          📍 Map
        </button>
        <button onClick={() => setActiveTab('cost')} className={activeTab === 'cost' ? 'active' : ''}>
          💰 Cost Breakdown
        </button>
      </div>

      <div className="itinerary-content">
        {renderContent()}
      </div>

      <HiddenGems onAddToItinerary={handleAddToItinerary} />

      <div className="smart-alerts">
        <div className="alert">
          <span>🌧️</span>
          <p>Rain expected tomorrow. Here are some indoor options.</p>
        </div>
      </div>

      <Link to="/payment" state={{ plan }} className="book-now-button">
        Book Now
      </Link>
    </div>
  );
};

export default ItineraryPage;
