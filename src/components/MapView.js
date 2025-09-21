import React from 'react';
import './MapView.css';

const MapView = () => {
  // Bounding box for Goa, India. Replace with dynamic coordinates.
  const bbox = '73.7,15.2,74.2,15.6';
  const destination = 'Goa, India';

  return (
    <div className="map-view">
      <iframe
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=15.4,73.95`}
      ></iframe>
      <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
        Map showing {destination}
      </p>
    </div>
  );
};

export default MapView;
