import React, { useState } from 'react';
import { getMonthName } from '../../utils/dateUtils';
import './HeroImage.css';

export default function HeroImage({ month, year, theme, flipDirection }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`hero-image-container ${flipDirection ? `flip-${flipDirection}` : ''}`} id="hero-image">
      <div className="hero-image-wrapper">
        {/* Loading skeleton */}
        {!imageLoaded && <div className="hero-skeleton" />}
        <img
          src={theme.heroImage}
          alt={`${theme.seasonLabel} - ${getMonthName(month)}`}
          className={`hero-img ${imageLoaded ? 'loaded' : ''}`}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
        />
        {/* Gradient overlay for text readability */}
        <div className="hero-gradient-overlay" />

        {/* SVG wave transition to calendar body */}
        <div className="hero-overlay">
          <svg className="hero-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,120 L0,60 C200,100 400,20 600,60 C800,100 1000,30 1200,50 L1200,120 Z"
              fill={theme.waveColor}
              opacity="0.7"
            />
            <path
              d="M0,120 L0,80 C150,40 350,90 550,60 C750,30 950,80 1200,70 L1200,120 Z"
              className="wave-white"
            />
          </svg>
        </div>

        {/* Month/Year text badge */}
        <div className="hero-text">
          <span className="hero-year">{year}</span>
          <h1 className="hero-month">{getMonthName(month).toUpperCase()}</h1>
          <span className="hero-season-badge" style={{ backgroundColor: theme.primaryColor }}>
            {theme.seasonLabel}
          </span>
        </div>

        {/* Decorative corner */}
        <div className="hero-corner-decor" style={{ borderColor: `${theme.primaryColor}40` }} />
      </div>
    </div>
  );
}
