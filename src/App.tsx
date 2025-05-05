import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // 👈 required by Safari
      video.play().catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }, []);

  return (
    <div className="App">
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          preload="auto"
        >
          <source src="/WaitingAnimation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default App;