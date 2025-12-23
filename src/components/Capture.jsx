import React from 'react';
import './capture.css';

import Cap1 from '../assets/Cap1.jpeg';
import Cap2 from '../assets/Cap2.jpeg';
import Cap3 from '../assets/Cap3.jpeg';
import Cap4 from '../assets/Cap4.jpeg';
import Cap5 from '../assets/Cap5.jpeg';
import Cap6 from '../assets/Cap6.jpeg';
import Cap7 from '../assets/Cap7.jpeg';
import Cap8 from '../assets/Cap8.jpeg';
import Cap9 from '../assets/Cap9.jpeg';
import Cap10 from '../assets/Cap10.jpeg';
import Cap11 from '../assets/Cap11.jpeg';
import Cap12 from '../assets/Cap12.jpeg';
import Cap13 from '../assets/Cap13.jpeg';
import Cap14 from '../assets/Cap14.jpeg';

const images = [
  Cap1, Cap2, Cap3, Cap4, Cap5, Cap6, Cap7,
  Cap8, Cap9, Cap10, Cap11, Cap12, Cap13, Cap14,
];

export default function Capture() {
  const renderTitle = (text) =>
    text.split('').map((char, index) => (
      <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
    ));

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h1 className="carousel-title">
          {renderTitle('From Moments To Stories')}
        </h1>
        <p className="carousel-subtitle">
          A glimpse into our moments and creations
        </p>
      </div>

      <div
        className="carousel-wrapper"
        role="region"
        aria-label="Image carousel"
      >
        <div
          className="carousel-track"
          style={{ ['--slides']: images.length }}
        >
          {[...images, ...images].map((src, index) => (
            <div
              key={index}
              className="carousel-slide"
              aria-hidden={index >= images.length}
            >
              <img
                src={src}
                alt={`Slide ${index % images.length + 1}`}
                className="slide-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
