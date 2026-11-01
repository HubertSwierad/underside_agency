import React from 'react';
import SliderArrow from './SliderArrow';
import './SliderNavigation.css';

interface Props {
  canSlideLeft: boolean;
  canSlideRight: boolean;
  label: string;
  onPrevious: () => void;
  onNext: () => void;
}

export default function SliderNavigation({ canSlideLeft, canSlideRight, label, onPrevious, onNext }: Props) {
  return (
    <div className={`slider-arrows${!canSlideRight ? ' is-at-end' : ''}`}>
      <button type="button" className={`project-hint slider-previous${!canSlideLeft ? ' is-unavailable' : ''}`}
        aria-label={`Previous ${label} slide`} aria-hidden={!canSlideLeft} disabled={!canSlideLeft} onClick={onPrevious}>
        <SliderArrow direction="left" />
      </button>
      <button type="button" className={`project-hint slider-next${!canSlideRight ? ' is-unavailable' : ''}`}
        aria-label={`Next ${label} slide`} aria-hidden={!canSlideRight} disabled={!canSlideRight} onClick={onNext}>
        <SliderArrow />
      </button>
    </div>
  );
}
