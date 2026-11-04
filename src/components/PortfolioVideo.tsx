import { PortfolioPlaybackContext } from './PortfolioPlaybackContext';
import React, { useContext, useEffect, useId, useRef, useState } from 'react';
import './PortfolioVideo.css';

interface PortfolioVideoProps {
  src: string;
  title: string;
  poster?: string;
  sizeBytes?: number;
  aspectRatio?: number;
  hasAudio?: boolean;
}

export default function PortfolioVideo({ src, title, poster, aspectRatio, hasAudio }: PortfolioVideoProps) {
  const reportPlayback = useContext(PortfolioPlaybackContext);
  const playerId = useId();
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [focused, setFocused] = useState(false);
  const [audible, setAudible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [autoStart, setAutoStart] = useState(false);
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [ratio, setRatio] = useState(aspectRatio ?? 16 / 9);

  useEffect(() => {
    reportPlayback(playerId, playing && audible && hasAudio !== false);
    return () => reportPlayback(playerId, false);
  }, [reportPlayback, playerId, playing, audible, hasAudio]);

  useEffect(() => {
    if (!tapped) return;
    const timer = window.setTimeout(() => setTapped(false), 3000);
    return () => window.clearTimeout(timer);
  }, [tapped]);

  useEffect(() => {
    if (!requested || !enabled) return;
    videoRef.current?.play().catch(() => {
      setLoading(false);
      setPlaying(false);
      setRequested(false);
      setError(true);
    });
  }, [requested, enabled]);

  useEffect(() => {
    if (hasAudio !== false) return;
    const player = videoRef.current?.parentElement;
    if (!player || typeof IntersectionObserver === 'undefined') return;
    const slider = player.closest('.project-slider');
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      setAutoStart(true);
      setEnabled(true);
      observer.disconnect();
    }, { root: slider, rootMargin: '0px 100% 0px 100%' });
    observer.observe(player);
    return () => observer.disconnect();
  }, [hasAudio]);

  useEffect(() => {
    if (!autoStart || !enabled) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => setError(true));
  }, [autoStart, enabled]);

  const play = () => {
    setError(false);
    setTapped(false);
    setFocused(false);
    setLoading(true);
    setEnabled(true);
    setRequested(true);
  };

  return (
    <div className="portfolio-video" style={{ aspectRatio: String(ratio) }} aria-busy={loading}
      tabIndex={playing ? 0 : -1} role="group" aria-label={`${title} playback`}
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onClick={event => {
        if (playing && !(event.target as HTMLElement).closest('button')) setTapped(value => !value);
      }}
      onFocus={() => setFocused(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false); }}>

      <video ref={videoRef} src={enabled ? src : undefined} poster={poster} aria-label={title}
        muted={hasAudio === false} loop={autoStart} preload={enabled ? 'auto' : 'none'} controls={false} playsInline disablePictureInPicture disableRemotePlayback
        onLoadedMetadata={event => {
          const video = event.currentTarget;
          if (video.videoWidth && video.videoHeight) setRatio(video.videoWidth / video.videoHeight);
        }}
        onVolumeChange={event => setAudible(!event.currentTarget.muted && event.currentTarget.volume > 0)}
        onPlay={event => {
          const activeVideo = event.currentTarget;
          document.querySelectorAll<HTMLVideoElement>('.portfolio-video video').forEach(video => {
            if (video !== activeVideo && !video.paused) video.pause();
          });
        }}
        onPlaying={() => { setLoading(false); setPlaying(true); }}
        onWaiting={() => { if (requested) setLoading(true); }}
        onPause={() => { setPlaying(false); setLoading(false); setRequested(false); }}
        onEnded={() => { setPlaying(false); setRequested(false); setLoading(false); }}
        onError={() => { setLoading(false); setPlaying(false); setRequested(false); setError(true); }} />
      {loading ? (
        <div className="video-loading" role="status">
          <span className="video-spinner" aria-hidden="true" />
          <span>LOADING VIDEO</span>
        </div>
      ) : (!playing || hovered || tapped || focused) && (
        <button type="button" className="video-play" onClick={() => {
          if (playing) videoRef.current?.pause();
          else play();
        }} aria-label={`${error ? 'Retry' : playing ? 'Pause' : 'Play'} ${title}`}>
          <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><path className="video-play-solid" fillRule="evenodd"
            d={playing ? 'M0 0H48V48H0ZM15 14H21V34H15ZM27 14H33V34H27Z' : 'M0 0H48V48H0ZM19 14 35 24 19 34Z'}
            fill="currentColor" />
            <rect className="video-play-outline" x="0.5" y="0.5" width="47" height="47" fill="none" stroke="currentColor" />
            <path className="video-play-outline" d={playing ? 'M15 14H21V34H15ZM27 14H33V34H27Z' : 'M19 14 35 24 19 34Z'} fill="currentColor" />
          </svg>
        </button>
      )}
      {error && <span className="video-error" role="alert">Couldn’t play this video. Please try again.</span>}
    </div>
  );
}
