import React from 'react';
import './HiddenGems.css';

const hiddenGems = [
  {
    id: 1,
    title: 'Secret Beach',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Local Food Tour',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Mountain Viewpoint',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const HiddenGems = ({ onAddToItinerary }) => {
  const handleAdd = (gem) => {
    onAddToItinerary(gem);
    alert(`${gem.title} has been added to your itinerary!`);
  };

  return (
    <div className="hidden-gems">
      <h3>Hidden Gems & Local Events</h3>
      <div className="gems-carousel">
        {hiddenGems.map((gem) => (
          <div key={gem.id} className="gem-card">
            <img src={gem.image} alt={gem.title} className="gem-image" />
            <div className="gem-info">
              <h4>{gem.title}</h4>
              <p>⭐ {gem.rating}</p>
              <button onClick={() => handleAdd(gem)} className="add-button">
                Add to Itinerary
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiddenGems;
