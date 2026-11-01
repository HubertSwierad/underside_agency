import React from 'react';

export default function SliderArrow({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <g transform={direction === 'left' ? 'rotate(180 10 10)' : undefined}>
        <path d="M4 10H16M11 5L16 10L11 15" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="square" strokeLinejoin="miter" />
      </g>
    </svg>
  );
}
