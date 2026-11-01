import React from 'react';
import imageDimensions from '../data/imageDimensions.json';

type Props = { src: string; alt: string };
const dimensions: Record<string, { width: number; height: number }> = imageDimensions;

export default function PortfolioImage({ src, alt }: Props) {
  const size = dimensions[src];
  const imageSrc = src.startsWith('/') ? encodeURI(src).replace(/\?/g, '%3F').replace(/#/g, '%23') : src;
  return <img src={imageSrc} alt={alt} width={size?.width} height={size?.height}
    loading="lazy" decoding="async" draggable={false} />;
}
