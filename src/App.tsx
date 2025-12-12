import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // 👈 required by Safari
      video
        .play()
        .then(() => setShowPlayButton(false))
        .catch(err => {
          console.warn("Autoplay blocked:", err);
          setShowPlayButton(true);
        });
    }
  }, []);

  const ensureVideoPlaying = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setShowPlayButton(false);
    } catch (err) {
      setShowPlayButton(true);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    // Always try to start the video whenever the music button is pressed
    await ensureVideoPlaying();
    if (isMusicOn) {
      audio.pause();
      setIsMusicOn(false);
    } else {
      try {
        await audio.play();
        setIsMusicOn(true);
      } catch (err) {
        console.warn('Audio play failed:', err);
        setIsMusicOn(false);
      }
    }
  };

  return (
    <div className="App">
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted
          controls={false}
          controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          x-webkit-airplay="deny"
          preload="auto"
          onPlay={() => setShowPlayButton(false)}
          onCanPlay={() => {
            const video = videoRef.current;
            if (video) {
              video.play().then(() => setShowPlayButton(false)).catch(() => setShowPlayButton(true));
            }
          }}
          onPause={() => {
            setShowPlayButton(true);
            const audio = audioRef.current;
            if (audio) {
              audio.pause();
            }
            setIsMusicOn(false);
          }}
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (video) {
              video.controls = false;
            }
          }}
        >
          <source src="/BackgroundVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Hidden audio element for background music; file should be placed in /public as Music.mp3 */}
        <audio ref={audioRef} src="/Music.mp3" preload="auto" loop />
        {showPlayButton && (
          <img
            className="wait-overlay"
            src="/Wait.png"
            alt="Waiting placeholder"
            aria-hidden="true"
          />
        )}
        <div className="controls-bar" aria-hidden={false}>
          {showPlayButton && (
              <button
                  type="button"
                  className="play-overlay"
                  aria-label="Play video"
                  onClick={() => {
                    const video = videoRef.current;
                    if (video) {
                      video.muted = true;
                      video.play().then(() => setShowPlayButton(false)).catch(() => setShowPlayButton(true));
                    }
                  }}
              >
                play
              </button>
          )}
          <button
              type="button"
              className="music-overlay"
              aria-label={isMusicOn ? 'Wyłącz muzykę' : 'Włącz muzykę'}
              onClick={toggleMusic}
          >
            {isMusicOn ? 'sound: on' : 'sound: off'}
          </button>
          <a
              className="social-button"
              href="mailto:contact@underside.agency"
              aria-label="Email"
          >
            mail
          </a>
          <a
              className="social-button"
              href="https://underside.online"
              aria-label="Underside Magazine"
              target="_blank"
              rel="noopener noreferrer"
          >
            magazine
          </a>
          <a
              className="social-button"
              href="https://www.instagram.com/underside.agency/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
          >
            <span className="short-label">ig</span>
            <span className="long-label">instagram</span>
          </a>
          <a
              className="social-button"
              href="https://www.facebook.com/profile.php?id=61584588110824"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
          >
            <span className="short-label">fb</span>
            <span className="long-label">facebook</span>
          </a>
          <a
              className="social-button"
              href="https://www.youtube.com/@UNDERSIDEAGENCY"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
          >
            <span className="short-label">yt</span>
            <span className="long-label">youtube</span>
          </a>
        </div>
        <img
            className="logo-overlay"
            src="/Logo.png"
            alt="Logo"
            aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default App;