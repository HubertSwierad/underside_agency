import { useCallback, useLayoutEffect, useRef, useState } from 'react';

export function useSliderNavigation(view: unknown) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [navigation, setNavigation] = useState({ canSlideLeft: false, canSlideRight: false });
  const updateNavigation = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const left = slider.scrollLeft > 2;
    const right = slider.scrollWidth - slider.clientWidth - slider.scrollLeft > 2;
    setNavigation(current => current.canSlideLeft === left && current.canSlideRight === right
      ? current : { canSlideLeft: left, canSlideRight: right });
  }, []);

  useLayoutEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    updateNavigation();
    // Tile sizes can change as lazy images/video metadata load or the viewport resizes.
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(updateNavigation);
    observer?.observe(slider);
    Array.from(slider.children).forEach(child => observer?.observe(child));
    window.addEventListener('resize', updateNavigation);
    return () => { observer?.disconnect(); window.removeEventListener('resize', updateNavigation); };
  }, [view, updateNavigation]);

  return { sliderRef, ...navigation, updateNavigation };
}
