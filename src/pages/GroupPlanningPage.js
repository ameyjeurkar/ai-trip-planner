import React, { useState } from 'react';
import './GroupPlanningPage.css';

const GroupPlanningPage = () => {
  const [activities, setActivities] = useState([
    { id: 1, title: 'Calangute Beach', votes: { up: 0, down: 0 } },
    { id: 2, title: 'Old Goa Churches', votes: { up: 0, down: 0 } },
    { id: 3, title: 'Spice Plantation Tour', votes: { up: 0, down: 0 } },
  ]);

  const handleVote = (id, type) => {
    setActivities(activities.map(act =>
      act.id === id ? { ...act, votes: { ...act.votes, [type]: act.votes[type] + 1 } } : act
    ));
  };

  const getBestMatch = () => {
    const sortedActivities = [...activities].sort((a, b) => (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down));
    return sortedActivities.slice(0, 2); // Get top 2 activities
  };

  return (
    <div className="group-planning-page">
      <h2>Group Trip to Goa</h2>
      <div className="invite-section">
        <button>Invite Friends (Link)</button>
        <button>Invite via WhatsApp</button>
      </div>

      <div className="voting-board">
        <h3>Vote for Activities</h3>
        {activities.map(activity => (
          <div key={activity.id} className="activity-vote-card">
            <p>{activity.title}</p>
            <div className="vote-buttons">
              <button onClick={() => handleVote(activity.id, 'up')}>👍 {activity.votes.up}</button>
              <button onClick={() => handleVote(activity.id, 'down')}>👎 {activity.votes.down}</button>
            </div>
          </div>
        ))}
      </div>

      <div className="best-match-plan">
        <h3>Best Match Plan</h3>
        <ul>
          {getBestMatch().map(act => <li key={act.id}>{act.title}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default GroupPlanningPage;
