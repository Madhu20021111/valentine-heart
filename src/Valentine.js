import React, { useEffect, useState } from 'react';
import './Valentine.css';

const Valentine = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [particles, setParticles] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const fullMessage = "Happy Valentine's Day! You occupy 100% of my heart's RAM."; 

  useEffect(() => {
    const heartData = [];
    const totalParticles = 1000; 

    for (let i = 0; i < totalParticles; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()); 
      const x = 16 * Math.pow(Math.sin(t), 3) * r;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;

      heartData.push({
        id: i,
        x: x * 15,
        y: y * 15,
        size: Math.random() * 8 + 6,
        delay: Math.random() * 3
      });
    }
    setParticles(heartData);
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(fullMessage.slice(0, index + 1));
      index++;
      if (index >= fullMessage.length) clearInterval(typingInterval);
    }, 80);
  };

  return (
    <div className="valentine-screen">
      <div className="code-background">
        <pre>
          <code>
{`const Love = {
  from: "Me",
  to: "My_Valentine",
  status: "Infinite",
  loop: () => {
    while(true) {
      keepLoving();
    }
  }
};`}
          </code>
        </pre>
      </div>

      <div className="heart-canvas">
        {particles.map((p) => (
          <span
            key={p.id}
            className="mini-heart"
            style={{
              transform: `translate(${p.x}px, ${p.y}px)`,
              fontSize: `${p.size}px`,
              animationDelay: `${p.delay}s`
            }}
          >
            ❤️
          </span>
        ))}
        
        {isRevealed && (
          <div className="text-overlay">
            <h1 className="typewriter">{displayedText}<span className="cursor">|</span></h1>
          </div>
        )}
      </div>

      {/* Changed to a standard button element */}
      {!isRevealed && (
          <button className="reveal-btn" onClick={handleReveal}>
            For more love❤️
          </button>
      )}
    </div>
  );
};

export default Valentine;