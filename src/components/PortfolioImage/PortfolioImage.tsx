import imageDimensions from '../../data/imageDimensions.json';
import imagePlaceholders from '../../data/imagePlaceholders.json';
import { useEffect, useRef, useState } from 'react';
import './PortfolioImage.css';

type Props = {
  src: string;
  alt: string;
  eager?: boolean;
  loadEnabled?: boolean;
  onLoaded?: () => void;
};
const dimensions: Record<string, { width: number; height: number }> = imageDimensions;
const placeholders: Record<string, string> = imagePlaceholders;
const loadedImages = new Set<string>();

export default function PortfolioImage({ src, alt, eager = false, loadEnabled = true, onLoaded }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageSrc = src.startsWith('/') ? encodeURI(src).replace(/\?/g, '%3F').replace(/#/g, '%23') : src;
  const [loadedSrc, setLoadedSrc] = useState(() => loadedImages.has(imageSrc) ? imageSrc : '');
  const [shouldLoad, setShouldLoad] = useState(eager || loadedImages.has(imageSrc));
  const [fallbackToOriginal, setFallbackToOriginal] = useState(false);
  const [failed, setFailed] = useState(false);
  const loaded = loadedSrc === imageSrc;
  const size = dimensions[src];
  const placeholder = placeholders[src];
  const responsiveSrc = (width: number) =>
    `${imageSrc.replace(/^\//, '/optimized/').replace(/\.(jpe?g|png)$/i, '')}-${width}w.webp`;
  // Only advertise variants the image generation script actually creates.
  const srcSet = size && [800, 1600, 2200]
    .filter(width => width < size.width)
    .map(width => `${responsiveSrc(width)} ${width}w`).join(', ');
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      loadedImages.add(imageSrc);
      setLoadedSrc(imageSrc);
      onLoaded?.();
    }
  }, [imageSrc, loadEnabled, onLoaded]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || eager || !loadEnabled || loadedImages.has(imageSrc)) return;
    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    // Horizontal sliders need a wider lead-in than the browser's default
    // lazy-load threshold, so upcoming photos begin downloading before a swipe.
    const slider = image.closest('.work-slider, .project-slider, .about-slider');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, {
      root: slider,
      rootMargin: '0px 100% 0px 100%',
      threshold: 0,
    });

    observer.observe(image);
    return () => observer.disconnect();
  }, [eager, imageSrc, loadEnabled]);

  const markLoaded = () => {
    loadedImages.add(imageSrc);
    setLoadedSrc(imageSrc);
    onLoaded?.();
  };

  const handleError = () => {
    if (!fallbackToOriginal && imageRef.current?.currentSrc.includes('/optimized/')) {
      setFallbackToOriginal(true);
      return;
    }
    setFailed(true);
    onLoaded?.();
  };

  return <span className="portfolio-image-frame" aria-busy={!loaded && !failed}
    style={{ aspectRatio: size ? `${size.width} / ${size.height}` : undefined }}>
    {placeholder && <img className="portfolio-image-placeholder" src={placeholder} alt="" aria-hidden="true" />}
    <img ref={imageRef} className={`portfolio-image${loaded ? ' is-loaded' : ''}`}
      src={loadEnabled ? imageSrc : undefined} srcSet={loadEnabled && !fallbackToOriginal ? srcSet || undefined : undefined} sizes="(max-width: 700px) 100vw, 50vw"
      alt={alt} width={size?.width} height={size?.height}
      loading={eager || (onLoaded ? loadEnabled : shouldLoad) ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'} decoding="async" draggable={false}
      onLoad={markLoaded} onError={handleError} />
  </span>;
}
