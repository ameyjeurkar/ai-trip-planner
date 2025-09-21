import React, { useState } from 'react';
import './Itinerary.css';

const alternativeActivities = [
  { title: 'Yoga Session', description: 'A relaxing yoga session by the beach.', cost: 800 },
  { title: 'Cooking Class', description: 'Learn to cook local delicacies.', cost: 1200 },
  { title: 'Art Gallery Visit', description: 'Explore contemporary art from local artists.', cost: 400 },
  { title: 'Kayaking Adventure', description: 'A thrilling kayaking experience in the backwaters.', cost: 1500 },
];

const Itinerary = ({ plan, setPlan }) => {
  const [openDay, setOpenDay] = useState(1); // Keep the first day open by default

  if (!plan || !plan.itinerary) {
    return <p>No itinerary details available.</p>;
  }

  const toggleDay = (day) => {
    setOpenDay(openDay === day ? null : day);
  };

  const handleSwap = (dayIndex, activityIndex) => {
    const newActivity = alternativeActivities[Math.floor(Math.random() * alternativeActivities.length)];
    const updatedPlan = { ...plan };
    updatedPlan.itinerary[dayIndex].activities[activityIndex] = {
      ...updatedPlan.itinerary[dayIndex].activities[activityIndex],
      ...newActivity,
    };
    setPlan(updatedPlan);
  };

  return (
    <div className="itinerary">
      {plan.itinerary?.map((dayPlan, dayIndex) => (
        <div key={dayPlan.day} className="day-card">
          <div className="day-header" onClick={() => toggleDay(dayPlan.day)}>
            <h3>Day {dayPlan.day}: {dayPlan.title}</h3>
            <span>{openDay === dayPlan.day ? '−' : '+'}</span>
          </div>
          {openDay === dayPlan.day && (
            <div className="day-content">
              {dayPlan.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="time-slot">
                  <h4>{activity.time}</h4>
                  <div className="activity-tile">
                    <div className="activity-details">
                      <h5>{activity.title}</h5>
                      <p>{activity.description}</p>
                      <span>₹{activity.cost}</span>
                    </div>
                    <button onClick={() => handleSwap(dayIndex, activityIndex)} className="swap-button">
                      Swap
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
