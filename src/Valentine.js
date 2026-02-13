import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Autoplay, FreeMode } from 'swiper/modules';
import photo1 from './components/images/poto1.jpeg';
import photo2 from './components/images/poto2.jpg';
import photo3 from './components/images/poto3.jpg';
import photo4 from './components/images/poto4.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import './Valentine.css';

const Valentine = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [particles, setParticles] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  const fullMessage = "Happy Valentine's Day Sudu ❤️ Love you so much and Thank you for everything 🥰"; 

  const couplePhotos = [
    photo1,photo2,photo3,photo4
  ];

  useEffect(() => {
    const heartData = [];
    for (let i = 0; i < 1000; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()); 
      const x = 16 * Math.pow(Math.sin(t), 3) * r;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
      heartData.push({ id: i, x: x * 15, y: y * 15, size: Math.random() * 8 + 6, delay: Math.random() * 3 });
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
      {isRevealed && (
        <div className="gallery-wrapper">
          {/* Main Display Swiper */}
          <Swiper
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Thumbs, Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="main-swiper"
          >
            {couplePhotos.map((img, i) => (
              <SwiperSlide key={i}><img src={img} alt="Us" /></SwiperSlide>
            ))}
          </Swiper>

          {/* Vertical Thumbnails Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            loop={true}
            spaceBetween={10}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="thumbs-swiper"
          >
            {couplePhotos.map((img, i) => (
              <SwiperSlide key={i}><img src={img} alt="Thumb" /></SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="heart-canvas">
        {particles.map((p) => (
          <span key={p.id} className="mini-heart" style={{ transform: `translate(${p.x}px, ${p.y}px)`, fontSize: `${p.size}px`, animationDelay: `${p.delay}s` }}>❤️</span>
        ))}
        {isRevealed && <div className="text-overlay"><h1 className="typewriter">{displayedText}<span className="cursor">|</span></h1></div>}
      </div>

      {!isRevealed && <button className="reveal-btn" onClick={handleReveal}>Love❤️</button>}
    </div>
  );
};

export default Valentine;