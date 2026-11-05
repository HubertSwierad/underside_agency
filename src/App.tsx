import { useSliderNavigation } from './hooks/useSliderNavigation';
import { PortfolioPlaybackContext } from './components/PortfolioPlaybackContext';
import PortfolioImage from './components/PortfolioImage';
import SliderNavigation from './components/SliderNavigation';
import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import './App.css';
import './components/WorkLayout.css';
import { slideByTile } from './utils/slideByTile';
import { projects } from './data/workDatabase';
import WorkPage from './components/WorkPage';
import AboutPage from './components/AboutPage';



function readPath() {
  const navigationEntries = typeof performance.getEntriesByType === 'function'
    ? performance.getEntriesByType('navigation')
    : [];
  const navigation = navigationEntries[0] as PerformanceNavigationTiming | undefined;
  if (navigation?.type === 'reload') {
    window.history.replaceState(null, '', '/');
    return '/';
  }
  const legacyPath = window.location.hash.slice(1);
  if (legacyPath === '/work' || legacyPath.startsWith('/work/')) {
    window.history.replaceState(null, '', legacyPath);
  }
  return window.location.pathname;
}

function App() {
  const [introStage, setIntroStage] = useState<'revealing' | 'exiting' | 'done'>('revealing');
  useEffect(() => {
    const revealTimer = window.setTimeout(() => setIntroStage('exiting'), 1700);
    const removeTimer = window.setTimeout(() => setIntroStage('done'), 2000);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);
  const [audibleVideos, setAudibleVideos] = useState<string[]>([]);
  const reportVideoPlayback = useCallback((id: string, audible: boolean) => {
    setAudibleVideos(current => audible
      ? current.includes(id) ? current : [...current, id]
      : current.includes(id) ? current.filter(value => value !== id) : current);
  }, []);
  const [path, setPath] = useState(readPath);
  let projectSlug = '';
  if (path.startsWith('/work/')) {
    try { projectSlug = decodeURIComponent(path.slice('/work/'.length)); } catch { /* Invalid address has no selected project. */ }
  }
  const navigate = (nextPath: string) => {
    if (window.location.pathname !== nextPath) window.history.pushState(null, '', nextPath);
    setPath(nextPath);
  };
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const selectedProject = projects.find(project => project.slug === projectSlug);
  const workVisible = path === '/work' || path === '/work/' || Boolean(selectedProject);
  const aboutVisible = path === '/about';

  const [workHasOpened, setWorkHasOpened] = useState(workVisible);
  useEffect(() => { if (workVisible) setWorkHasOpened(true); }, [workVisible]);

  const { sliderRef, canSlideLeft, canSlideRight, updateNavigation } = useSliderNavigation(`${workVisible}-${projectSlug}`);
  const workScrollLeft = useRef(0);
  const resetWorkAfterHide = useRef(false);
  const resetWorkPosition = useCallback(() => {
    resetWorkAfterHide.current = false;
    workScrollLeft.current = 0;
    if (sliderRef.current) sliderRef.current.scrollLeft = 0;
    updateNavigation();
  }, [sliderRef, updateNavigation]);

  useLayoutEffect(() => {
    if (selectedProject || !workVisible || !sliderRef.current) return;
    // A quick reopen must start at the beginning before the panel is painted.
    if (resetWorkAfterHide.current) resetWorkPosition();
    sliderRef.current.scrollLeft = workScrollLeft.current;
    updateNavigation();
  }, [selectedProject, workVisible, sliderRef, updateNavigation, resetWorkPosition]);

  useEffect(() => {
    if (!workVisible && resetWorkAfterHide.current && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      resetWorkPosition();
    }
  }, [workVisible, resetWorkPosition]);


  useEffect(() => {
    const onLocationChange = () => setPath(readPath());
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  const hideWork = () => {
    resetWorkAfterHide.current = true;
    navigate('/');
  };
  const toggleWork = () => workVisible ? hideWork() : navigate('/work');
  const closeAbout = () => {
    setWorkHasOpened(false);
    navigate('/');
  };
  const toggleAbout = () => {
    setWorkHasOpened(false);
    navigate(aboutVisible ? '/' : '/about');
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const backgroundPaused = workVisible || aboutVisible;
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audibleVideos.length > 0) {
      audio.pause();
      return;
    }
    if (isMusicOn) audio.play().catch(() => setIsMusicOn(false));
  }, [audibleVideos, isMusicOn]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (backgroundPaused) {
      video.pause();
      return;
    }
    let cancelled = false;
    video.muted = true;
    video.play()
      .then(() => { if (!cancelled) setShowPlayButton(false); })
      .catch(() => { if (!cancelled) setShowPlayButton(true); });
    return () => { cancelled = true; };
  }, [backgroundPaused]);

  const ensureVideoPlaying = async () => {
    const video = videoRef.current;
    if (!video || backgroundPaused) return;
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
    <PortfolioPlaybackContext.Provider value={reportVideoPlayback}>
    <div className={`App${workVisible || aboutVisible ? ' is-work-visible' : ''}`}>
      {introStage !== 'done' && (
        <div className={`intro-screen${introStage === 'exiting' ? ' is-exiting' : ''}`} aria-hidden="true">
          <img className="intro-logo" src="/Logo_reverse.png" alt="" />
        </div>
      )}
      <div className="video-container" style={{ backgroundImage: "url('/BackgroundVideo-poster-v1.jpg')" }}>
        <video
          ref={videoRef}
          autoPlay={!backgroundPaused}
          loop
          playsInline
          muted
          controls={false}
          controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          x-webkit-airplay="deny"
          poster="/BackgroundVideo-poster-v1.jpg"
          preload="auto"
          onPlay={event => {
            if (backgroundPaused) event.currentTarget.pause();
            else setShowPlayButton(false);
          }}
          onCanPlay={ensureVideoPlaying}
          onPause={() => {
            if (backgroundPaused) return;
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
          <source src="/BackgroundVideo-compressed-v1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Hidden audio element for background music; file should be placed in /public as Music.mp3 */}
        <audio ref={audioRef} src="/Music.mp3" preload="auto" loop />
        {showPlayButton && !backgroundPaused && (
          <img
            className="wait-overlay"
            src="/Wait.png"
            alt="Waiting placeholder"
            aria-hidden="true"
          />
        )}
        <div className="controls-bar" aria-hidden={false}>
          {showPlayButton && !backgroundPaused && (
              <button
                  type="button"
                  className="play-overlay"
                  aria-label="PLAY"
                  onClick={() => {
                    const video = videoRef.current;
                    if (video) {
                      video.muted = true;
                      video.play().then(() => setShowPlayButton(false)).catch(() => setShowPlayButton(true));
                    }
                  }}
              >
                PLAY
              </button>
          )}
          <button
              type="button"
              className="music-overlay"
              aria-label={isMusicOn ? 'Wyłącz muzykę' : 'Włącz muzykę'}
              onClick={toggleMusic}
          >
            {isMusicOn ? 'SOUND: ON' : 'SOUND: OFF'}
          </button>
          <button type="button" className="work-toggle about-toggle" aria-label="ABOUT" aria-expanded={aboutVisible}
                  aria-controls="work-panel" onClick={toggleAbout}>ABOUT</button>
          <button type="button" className="work-toggle" aria-label="WORK" aria-expanded={workVisible}
                  aria-controls="work-panel" onClick={toggleWork}>
            <span className="work-label-mobile" aria-hidden="true">WORK</span>
            <span className="work-label-desktop" aria-hidden="true">WORK</span>
          </button>
          <a
              className="social-button"
              href="mailto:contact@underside.agency"
              aria-label="Email"
          >
            MAIL
          </a>
          {/*<a*/}
          {/*    className="social-button"*/}
          {/*    href="https://underside.online"*/}
          {/*    aria-label="Underside Magazine"*/}
          {/*    target="_blank"*/}
          {/*    rel="noopener noreferrer"*/}
          {/*>*/}
          {/* MAGAZINE*/}
          {/*</a>*/}
          <a
              className="social-button"
              href="https://www.instagram.com/underside.agency/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
          >
            <span className="short-label">IG</span>
            <span className="long-label">INSTAGRAM</span>
          </a>
          <a
              className="social-button"
              href="https://www.facebook.com/profile.php?id=61584588110824"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
          >
            <span className="short-label">FB</span>
            <span className="long-label">FACEBOOK</span>
          </a>
          <a
              className="social-button"
              href="https://www.youtube.com/@UNDERSIDEAGENCY"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
          >
            <span className="short-label">YT</span>
            <span className="long-label">YOUTUBE</span>
          </a>
        </div>
        <section id="work-panel" className={`work-panel${selectedProject ? ' is-project-open' : ''}`} aria-label={aboutVisible ? 'About Underside' : 'Selected work'} aria-hidden={!workVisible && !aboutVisible}
                 inert={!workVisible && !aboutVisible}
                 onTransitionEnd={event => {
                   if (event.target === event.currentTarget && event.propertyName === 'opacity' && !workVisible && resetWorkAfterHide.current) {
                     resetWorkPosition();
                   }
                 }}
                 onClick={event => {
                   const target = event.target as HTMLElement;
            if (selectedProject) {
              if (!target.closest('.project-slider, .project-heading')) navigate('/work');
              return;
            }
            if (aboutVisible) {
              if (!target.closest('.about-slider, .about-heading')) closeAbout();
              return;
            }
            if (!target.closest('.work-slider, .project-heading')) hideWork();
          }}>
          {aboutVisible ? (
            <AboutPage onBack={closeAbout} />
          ) : (workVisible || workHasOpened) && (selectedProject ? (
            <WorkPage key={selectedProject.slug} project={selectedProject} onBack={() => navigate('/work')} />
          ) : (
            <div className="work-view">
              <div className="project-heading">
                <button type="button" className="work-hide" onClick={hideWork}>HIDE</button>
                <SliderNavigation label="work" canSlideLeft={canSlideLeft} canSlideRight={canSlideRight}
                  onPrevious={() => { if (sliderRef.current) slideByTile(sliderRef.current, -1); }}
                  onNext={() => { if (sliderRef.current) slideByTile(sliderRef.current); }} />
              </div>
              <div className="work-slider" ref={sliderRef}
                onScroll={event => {
                  workScrollLeft.current = event.currentTarget.scrollLeft;
                  updateNavigation();
                }} onLoadCapture={updateNavigation} tabIndex={0} role="region" aria-label="Portfolio slider"
                onKeyDown={event => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                    event.preventDefault();
                    slideByTile(event.currentTarget, event.key === 'ArrowRight' ? 1 : -1);
                  }
                }}
                onDragStart={event => event.preventDefault()}
                onPointerDown={event => {
                  if (event.pointerType !== 'mouse' || event.button !== 0) return;
                  drag.current = { active: true, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft, moved: false };
                }}
                onPointerMove={event => {
                  if (!drag.current.active) return;
                  const distance = event.clientX - drag.current.startX;
                  if (Math.abs(distance) > 6) {
                    drag.current.moved = true;
                    event.currentTarget.setPointerCapture(event.pointerId);
                    event.currentTarget.classList.add('is-dragging');
                    event.currentTarget.scrollLeft = drag.current.scrollLeft - distance;
                  }
                }}
                onPointerUp={event => {
                  drag.current.active = false;
                  event.currentTarget.classList.remove('is-dragging');
                }}
                onPointerCancel={event => {
                  drag.current.active = false;
                  drag.current.moved = false;
                  event.currentTarget.classList.remove('is-dragging');
                }}
                onPointerLeave={() => { drag.current.active = false; }}
                onClickCapture={event => {
                  if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; }
                }}>
                <div className="work-intro work-tile-description">
                  <h2>VISUAL DIRECTION <br/> FOR ARTISTS AND <br/> LIVE MOMENTS.</h2>
                  <p>Photography, film and brand direction. From artists and live performances to independent projects, we turn the moment into visuals that stay under your skin.</p>
                </div>
                {projects.map((project) => (
                  <a className="work-tile project-tile" href={`/work/${encodeURIComponent(project.slug)}`} onClick={event => {
                    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                      event.preventDefault();
                      navigate(`/work/${encodeURIComponent(project.slug)}`);
                    }
                  }} key={project.slug} draggable={false}>
                    <PortfolioImage src={project.cover} alt={`${project.title} portfolio`} />
                    <div className="tile-caption"><span>{project.title}</span></div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>
        <img
            className="logo-overlay"
            fetchPriority="high"
            src="/Logo_reverse.png"
            alt="Logo"
            aria-hidden="true"
        />
      </div>
    </div>
    </PortfolioPlaybackContext.Provider>
  );
}

export default App;
