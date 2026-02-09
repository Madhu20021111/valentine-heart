import React, { useEffect, useState } from 'react';
import './Valentine.css';

const Valentine = () => {
  const [particles, setParticles] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const fullMessage = "Happy Valentine's Day! You filled my heart with love."; // Your custom message
  
  useEffect(() => {
    // 1. Heart Generation Logic (Filling the inside)
    const heartData = [];
    const totalParticles = 400; 
    for (let i = 0; i < totalParticles; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()); 
      const x = 16 * Math.pow(Math.sin(t), 3) * r;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;

      heartData.push({
        id: i,
        x: x * 15,
        y: y * 15,
        size: Math.random() * 10 + 8,
        delay: Math.random() * 3
      });
    }
    setParticles(heartData);

    // 2. Typewriter Logic
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => fullMessage.slice(0, index + 1));
      index++;
      if (index >= fullMessage.length) clearInterval(typingInterval);
    }, 50); // Adjust speed here (ms per letter)

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="valentine-screen">
      <div className="heart-canvas">
        {particles.map((p) => (
          <span key={p.id} className="mini-heart" style={{
              transform: `translate(${p.x}px, ${p.y}px)`,
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`
          }}>❤️</span>
        ))}
        
        <div className="text-overlay">
          <h1 className="typewriter">{displayedText}<span className="cursor">|</span></h1>
        </div>
      </div>
    </div>
  );
};

export default Valentine;