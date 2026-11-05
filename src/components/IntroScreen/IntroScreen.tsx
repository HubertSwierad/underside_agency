import { useEffect, useState } from 'react';
import './IntroScreen.css';

const LOGO_ANIMATION_MS = 2000;
const FADE_DURATION_MS = 400;

export default function IntroScreen() {
  const [stage, setStage] = useState<'visible' | 'exiting' | 'done'>('visible');

  useEffect(() => {
    // The logo intro has its own timing and never waits for the background video.
    const animationTimer = window.setTimeout(() => setStage('exiting'), LOGO_ANIMATION_MS);
    return () => window.clearTimeout(animationTimer);
  }, []);

  useEffect(() => {
    if (stage !== 'exiting') return;
    const fadeTimer = window.setTimeout(() => setStage('done'), FADE_DURATION_MS);
    return () => window.clearTimeout(fadeTimer);
  }, [stage]);

  if (stage === 'done') return null;
  return <div className={`intro-screen${stage === 'exiting' ? ' is-exiting' : ''}`} aria-hidden="true">
    <img className="intro-logo" src="/Logo_reverse.png" alt=""
      onAnimationEnd={() => setStage('exiting')} />
  </div>;
}
