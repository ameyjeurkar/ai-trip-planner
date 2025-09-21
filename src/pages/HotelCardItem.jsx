import { GetPlaceDetails, PHOTO_REF_URL } from "../service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "./Hotels.css";

// ✅ Array of fallback hotel images (from Unsplash/Google Hotels style)
const fallbackImages = [
  "https://www.cvent.com/en/blog/hospitality/what-is-a-five-star-hotel",
  "https://yazzcollective.com/wp-content/uploads/2025/04/f0ebebb3thumbnail.jpeg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/31/31/4e/caption.jpg?w=1200&h=-1&s=1",
  "https://www.facebook.com/5starhotelsnewdelhi/",
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/103705059.webp?k=89dd20eac13acc9155bd7508ffba5f7f56673e9a21a623a137f1ef9eac500356&o=",
];

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: hotel?.name };
      await GetPlaceDetails(data).then((resp) => {
        const name =
          resp.data.places[0].photos?.[3]?.name ||
          resp.data.places[0].photos?.[0]?.name; // fallback to first photo
        const PhotoUrl = name
          ? PHOTO_REF_URL.replace("{NAME}", name)
          : fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
        setPhotoUrl(PhotoUrl);
      });
    } catch (error) {
      // Use random fallback image if API fails
      setPhotoUrl(
        fallbackImages[Math.floor(Math.random() * fallbackImages.length)]
      );
      toast("Unable to fetch Hotel details, using default image");
    }
  };

  // Ensure always have an image
  const hotelImage =
    photoUrl ||
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel?.name +
        "," +
        hotel?.address
      }
      target="_blank"
      className="hotel-link"
    >
      <div className="hotel-item">
        <img src={hotelImage} alt={hotel?.name} className="hotel-item-img" />
        <div className="hotel-item-details">
          <p className="hotel-item-title">{hotel?.hotel_name}</p>
          <p className="hotel-item-address">📍 {hotel?.address}</p>
          <p className="hotel-item-price">💰 {hotel?.price}</p>
          <p className="hotel-item-rating">⭐ {hotel?.rating}</p>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
