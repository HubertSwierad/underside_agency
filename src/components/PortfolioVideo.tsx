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

const PRELOAD_LIMIT = 5_000_000;

export default function PortfolioVideo({ src, title, poster, sizeBytes, aspectRatio, hasAudio }: PortfolioVideoProps) {
  const reportPlayback = useContext(PortfolioPlaybackContext);
  const playerId = useId();
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [focused, setFocused] = useState(false);
  const [audible, setAudible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(sizeBytes !== undefined && sizeBytes < PRELOAD_LIMIT);
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
    if (sizeBytes !== undefined) return;
    const controller = new AbortController();
    // HEAD checks the size without downloading the video itself.
    fetch(src, { method: 'HEAD', signal: controller.signal })
      .then(response => {
        const length = Number(response.headers.get('content-length'));
        if (response.ok && length > 0 && length < PRELOAD_LIMIT) setEnabled(true);
      })
      .catch(() => { /* Unknown sizes stay on demand. */ });
    return () => controller.abort();
  }, [src, sizeBytes]);

  useEffect(() => {
    if (!requested || !enabled) return;
    videoRef.current?.play().catch(() => {
      setLoading(false);
      setPlaying(false);
      setRequested(false);
      setError(true);
    });
  }, [requested, enabled]);

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
        preload={enabled ? 'auto' : 'none'} controls={false} loop playsInline disablePictureInPicture disableRemotePlayback
        onLoadedMetadata={event => {
          const video = event.currentTarget;
          if (video.videoWidth && video.videoHeight) setRatio(video.videoWidth / video.videoHeight);
        }}
        onVolumeChange={event => setAudible(!event.currentTarget.muted && event.currentTarget.volume > 0)}
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
          <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><path fillRule="evenodd"
            d={playing ? 'M0 0H48V48H0ZM15 14H21V34H15ZM27 14H33V34H27Z' : 'M0 0H48V48H0ZM19 14 35 24 19 34Z'}
            fill="currentColor" /></svg>
        </button>
      )}
      {error && <span className="video-error" role="alert">Couldn’t play this video. Please try again.</span>}
    </div>
  );
}
