import React from 'react';
import './capture.css';

const images = [
  'https://picsum.photos/id/1015/1200/800',
  'https://picsum.photos/id/1016/1200/800',
  'https://picsum.photos/id/1018/1200/800',
  'https://picsum.photos/id/1021/1200/800',
];

export default function Capture() {
  const renderTitle = (text) =>
    text.split('').map((char, index) => (
      <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
    ));

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h1 className="carousel-title">{renderTitle('Capturing Moments, Sharing Stories')}</h1>
        <p className="carousel-subtitle">A glimpse into our moments and creations</p>
      </div>

      <div className="carousel-wrapper" role="region" aria-label="Image carousel">
        <div className="carousel-track" style={{ ['--slides']: images.length }}>
          {[...images, ...images].map((src, index) => (
            <div key={index} className="carousel-slide" aria-hidden={index >= images.length ? 'true' : 'false'}>
              <img src={src} alt={`Slide ${index % images.length + 1}`} className="slide-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
