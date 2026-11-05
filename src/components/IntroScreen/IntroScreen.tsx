import { type CSSProperties, useEffect, useRef, useState } from 'react';
import './IntroScreen.css';

interface IntroScreenProps {
  ready: boolean;
}

const LOGO_DURATION_MS = 1700;
const MAX_WAIT_MS = 8000;
const REVEAL_FINISH_FALLBACK_MS = 400;
const FULL_LOGO_HOLD_MS = 120;
const FADE_DURATION_MS = 300;

export default function IntroScreen({ ready }: IntroScreenProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const [revealStart, setRevealStart] = useState('inset(0 100% 0 0)');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [waitExpired, setWaitExpired] = useState(false);
  const [stage, setStage] = useState<'visible' | 'finishing' | 'revealed' | 'exiting' | 'done'>('visible');

  useEffect(() => {
    const animationTimer = window.setTimeout(() => setAnimationComplete(true), LOGO_DURATION_MS);
    const deadlineTimer = window.setTimeout(() => setWaitExpired(true), MAX_WAIT_MS);
    return () => {
      window.clearTimeout(animationTimer);
      window.clearTimeout(deadlineTimer);
    };
  }, []);

  useEffect(() => {
    if (stage !== 'visible' || !animationComplete || (!ready && !waitExpired)) return;
    // Finish from the current reveal position without restarting or reversing it.
    const clip = logoRef.current ? window.getComputedStyle(logoRef.current).clipPath : '';
    setRevealStart(clip || 'inset(0 0 0 0)');
    setStage('finishing');
  }, [animationComplete, ready, waitExpired, stage]);

  useEffect(() => {
    if (stage === 'visible' || stage === 'done') return;
    const transitions = {
      // Also finish when reduced motion disables the CSS animation, or its event is missed.
      finishing: { delay: REVEAL_FINISH_FALLBACK_MS, next: 'revealed' },
      revealed: { delay: FULL_LOGO_HOLD_MS, next: 'exiting' },
      exiting: { delay: FADE_DURATION_MS, next: 'done' },
    } as const;
    const { delay, next } = transitions[stage];
    const timer = window.setTimeout(() => setStage(next), delay);
    return () => window.clearTimeout(timer);
  }, [stage]);

  if (stage === 'done') return null;

  return (
    <div className={`intro-screen${stage === 'visible' ? '' : ` is-${stage}`}`} aria-hidden="true">
      <img ref={logoRef} className="intro-logo" src="/Logo_reverse.png" alt=""
        style={{ '--intro-reveal-start': revealStart } as CSSProperties}
        onAnimationEnd={event => {
          if (event.target === event.currentTarget && event.animationName === 'intro-logo-finish' && stage === 'finishing') {
            setStage('revealed');
          }
        }} />
    </div>
  );
}
