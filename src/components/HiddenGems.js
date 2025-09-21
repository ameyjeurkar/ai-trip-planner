import React from "react";
import "./HiddenGems.css";

const hiddenGems = [
  {
    id: 1,
    title: "Secret Beach",
    rating: 4.8,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/d0/1d/b4/pic-from-the-rock-just.jpg?w=900&h=-1&s=1",
  },
  {
    id: 2,
    title: "Local Food Tour",
    rating: 4.9,
    image:
      "https://i.pinimg.com/564x/be/8f/1e/be8f1e7059364e9e949d1cfa365cc827.jpg",
  },
  {
    id: 3,
    title: "Mountain Viewpoint",
    rating: 4.7,
    image:
      "https://media.istockphoto.com/id/1443409611/photo/man-on-stone-on-the-hill-and-beautiful-mountains-in-haze-at-colorful-sunset-in-autumn.jpg?s=612x612&w=0&k=20&c=dcyDpPqlhCWMZYgqgHSrJZdoaH_ARrlgkpUcARp1_GU=",
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
