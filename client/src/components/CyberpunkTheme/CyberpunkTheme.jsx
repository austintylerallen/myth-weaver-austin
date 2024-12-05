import React from 'react';
import './App.css';

const CyberpunkTheme = () => {
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <div key={i} className="star" style={{
        '--top-offset': `${Math.random() * 100}vh`,
        '--fall-duration': `${6 + Math.random() * 6}s`,
        '--fall-delay': `${Math.random() * 10}s`,
        '--star-tail-length': `${5 + Math.random() * 2}em`
      }} />
    ));
  };

  return (
    <div className="stars">
      {generateStars(50)} {/* Adjust the number of stars here */}
    </div>
  );
};

export default CyberpunkTheme;
