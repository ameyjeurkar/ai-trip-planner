import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../service/GlobalApi";
import { toast } from "sonner";
import "./PlacesToVisit.css";

// Fallback images in case API fails
const fallbackImages = [
  "https://images.unsplash.com/photo-1501117716987-c8e2a1c7d24c",
  "https://images.unsplash.com/photo-1551776235-dde6d4829808",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945"
];

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: place?.place };
      await GetPlaceDetails(data).then((resp) => {
        const name =
          resp.data.places[0].photos?.[3]?.name ||
          resp.data.places[0].photos?.[0]?.name;
        const PhotoUrl = name
          ? PHOTO_REF_URL.replace("{NAME}", name)
          : fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
        setPhotoUrl(PhotoUrl);
      });
    } catch (error) {
      setPhotoUrl(fallbackImages[Math.floor(Math.random() * fallbackImages.length)]);
      toast("Unable to fetch place details, using default image");
    }
  };

  const placeImage = photoUrl || fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.place}
      target="_blank"
      className="place-link"
    >
      <div className="place-card">
        <img src={placeImage} alt={place?.place} className="place-card-img" />
        <div className="place-card-details">
          <p className="place-card-title">{place.place}</p>
          <p className="place-card-text">{place.details}</p>
          <p className="place-card-ticket">🏷️ Ticket: {place.ticket_pricing}</p>
          <p className="place-card-day">{place.time}</p>
        </div>
        {
          place.rating.replace("stars", "").trim() != "N/A" && (
            <span
              className="rating-component"
              style={{
                backgroundColor:
                  place.rating.replace("stars", "").trim() >= 4 ? "green" : (place.rating.replace("stars", "").trim() >= 3 ? "orange" : "red")
              }}
            >{place.rating.replace("stars", "").trim()}</span>
          )
        }
      </div>
    </Link>
  );
}

export default PlaceCardItem;
