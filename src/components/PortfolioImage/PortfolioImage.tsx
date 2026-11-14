import imageDimensions from '../../data/imageDimensions.json';
import { useEffect, useRef, useState } from 'react';
import './PortfolioImage.css';

type Props = { src: string; alt: string; eager?: boolean };
const dimensions: Record<string, { width: number; height: number }> = imageDimensions;
const loadedImages = new Set<string>();

export default function PortfolioImage({ src, alt, eager = false }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);
  const imageSrc = src.startsWith('/') ? encodeURI(src).replace(/\?/g, '%3F').replace(/#/g, '%23') : src;
  const [loadedSrc, setLoadedSrc] = useState(() => loadedImages.has(imageSrc) ? imageSrc : '');
  const loaded = loadedSrc === imageSrc;
  const size = dimensions[src];
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
    }
  }, [imageSrc]);

  const markLoaded = () => {
    loadedImages.add(imageSrc);
    setLoadedSrc(imageSrc);
  };

  return <img ref={imageRef} className={`portfolio-image${loaded ? ' is-loaded' : ''}`}
    src={imageSrc} srcSet={srcSet || undefined} sizes="(max-width: 700px) 100vw, 50vw"
    alt={alt} width={size?.width} height={size?.height} loading={eager ? 'eager' : 'lazy'}
    fetchPriority={eager ? 'high' : 'auto'} decoding="async" draggable={false}
    onLoad={markLoaded} onError={markLoaded} />;
}
