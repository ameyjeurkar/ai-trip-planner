import React, { useState, useEffect } from 'react';
import './IntroSlides.css';

const slides = [
  {
    title: 'Personalized Trips',
    text: 'Get an itinerary tailored to your interests and budget.',
  },
  {
    title: 'Real-Time Suggestions',
    text: 'Receive smart alerts and suggestions based on real-time conditions.',
  },
  {
    title: 'One-Click Booking',
    text: 'Book your entire trip with a single click.',
  },
];

const IntroSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="intro-slides-container">
      <div
        className="intro-slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>
          </div>
        ))}
      </div>
      <div className="slide-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator ${currentSlide === index ? 'active' : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default IntroSlides;
