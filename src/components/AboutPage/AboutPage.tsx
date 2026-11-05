import React, { useRef } from 'react';
import { aboutTiles } from '../../data/aboutDatabase';
import { useSliderNavigation } from '../../hooks/useSliderNavigation';
import { slideByTile } from '../../utils/slideByTile';
import PortfolioImage from '../PortfolioImage';
import PortfolioVideo from '../PortfolioVideo';
import SliderNavigation from '../SliderNavigation';
import './AboutPage.css';

interface AboutPageProps {
  onBack: () => void;
}

function renderTextWithBreaks(text: string) {
  return text.split(/<br\s*\/?\s*>/i).map((line, lineIndex) => (
    <React.Fragment key={lineIndex}>{lineIndex > 0 && <br />}{line.trim()}</React.Fragment>
  ));
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const { sliderRef, canSlideLeft, canSlideRight, updateNavigation } = useSliderNavigation('about');
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const currentYear = new Date().getFullYear();

  return (
    <article className="about-view" aria-label="About Underside">
      <div className="about-heading">
        <a href="/" onClick={event => {
          if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            onBack();
          }
        }}>HIDE</a>
        <SliderNavigation label="about" canSlideLeft={canSlideLeft} canSlideRight={canSlideRight}
          onPrevious={() => { if (sliderRef.current) slideByTile(sliderRef.current, -1); }}
          onNext={() => { if (sliderRef.current) slideByTile(sliderRef.current); }} />
      </div>
      <div ref={sliderRef} onScroll={updateNavigation} onLoadCapture={updateNavigation}
        className="about-slider" role="region" aria-label="About slides" tabIndex={0}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            slideByTile(event.currentTarget, event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
        onDragStart={event => event.preventDefault()}
        onPointerDown={event => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          drag.current = { active: true, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={event => {
          if (!drag.current.active) return;
          const distance = event.clientX - drag.current.startX;
          if (Math.abs(distance) > 6) {
            drag.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.classList.add('is-dragging');
            event.currentTarget.scrollLeft = drag.current.scrollLeft - distance;
          }
        }}
        onPointerUp={event => {
          drag.current.active = false;
          event.currentTarget.classList.remove('is-dragging');
        }}
        onPointerCancel={event => {
          drag.current.active = false;
          drag.current.moved = false;
          event.currentTarget.classList.remove('is-dragging');
        }}
        onPointerLeave={() => { drag.current.active = false; }}
        onClickCapture={event => {
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}>
        {aboutTiles.map((tile, index) => {
          if (tile.type === 'text') {
            return (
              <section className={`about-slide about-text-slide${tile.className ? ` ${tile.className}` : ''}`} key={`text-${index}`}>
                {tile.eyebrow && <p className="tile-eyebrow">{tile.eyebrow}</p>}
                <h2>{renderTextWithBreaks(tile.title)}</h2>
                {tile.body && <p>{renderTextWithBreaks(tile.body)}</p>}
                {tile.email && <p><a href={`mailto:${tile.email}`}>{tile.email}</a></p>}
                {(tile.instagram || tile.facebook || tile.youtube) && <nav className="about-social-links" aria-label="Social media">
                  {tile.instagram && <a href={tile.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
                  {tile.facebook && <a href={tile.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
                  {tile.youtube && <a href={tile.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
                </nav>}
                {tile.legal && <p className="about-legal-details">
                  {tile.legal}{tile.company && <> <a href={tile.company.href} target="_blank" rel="noopener noreferrer">{tile.company.name}</a>{tile.companyDescription ? `, ${tile.companyDescription}` : '.'}</>}
                  {tile.copyright && <><br />© {currentYear} UNDERSIDE AGENCY.</>}
                </p>}
              </section>
            );
          }
          if (tile.type === 'image') {
            return (
              <figure className="about-slide about-media-slide" key={`image-${index}`}>
                <PortfolioImage src={tile.src} alt={tile.alt} />
                <figcaption>{tile.caption}</figcaption>
              </figure>
            );
          }
          if (tile.type === 'localVideo') {
            return (
              <figure className="about-slide about-media-slide" key={`video-${index}`}>
                <PortfolioVideo src={tile.src} poster={tile.poster} title={tile.title} aspectRatio={tile.aspectRatio} hasAudio={tile.hasAudio} />
                <figcaption>{tile.caption}</figcaption>
              </figure>
            );
          }
          return (
            <figure className="about-slide about-media-slide" key={`youtube-${index}`}>
              <a className="about-youtube-tile" href={tile.url} target="_blank" rel="noopener noreferrer" draggable={false} aria-label={`${tile.title} (opens in a new tab)`}>
                <PortfolioImage src={tile.src} alt={tile.title} />
                <span className="about-youtube-play">{tile.linkLabel}</span>
              </a>
              <figcaption>{tile.caption}</figcaption>
            </figure>
          );
        })}
      </div>
    </article>
  );
}
