import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/WaitingAnimation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default App;
