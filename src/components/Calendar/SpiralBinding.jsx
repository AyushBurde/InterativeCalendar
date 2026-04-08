import React from 'react';
import './SpiralBinding.css';

export default function SpiralBinding() {
  const spirals = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className="spiral-binding" id="spiral-binding" aria-hidden="true">
      <div className="spiral-hook">
        <div className="hook-nail" />
        <div className="hook-wire" />
      </div>
      <div className="spiral-row">
        {spirals.map((i) => (
          <div key={i} className="spiral-ring">
            <div className="ring-inner" />
          </div>
        ))}
      </div>
    </div>
  );
}
