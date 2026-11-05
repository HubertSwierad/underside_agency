import { useSliderNavigation } from '../../hooks/useSliderNavigation';
import SliderNavigation from '../SliderNavigation';
import PortfolioVideo from '../PortfolioVideo';
import PortfolioImage from '../PortfolioImage';
import { useRef } from 'react';
import { WorkProject } from '../../data/workDatabase';
import './WorkPage.css';
import './WorkLayout.css';
import { slideByTile } from '../../utils/slideByTile';

interface WorkPageProps {
  project: WorkProject;
  onBack: () => void;
}

export default function WorkPage({ project, onBack }: WorkPageProps) {
  const coverFilm = project.media.find(media => media.type === 'youtube' && media.src === project.cover);
  const { sliderRef, canSlideLeft, canSlideRight, updateNavigation } = useSliderNavigation(project.slug);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  return (
    <article className="project-view work-view" aria-label={project.title}>
      <div className="project-heading">
        <a href="/work" onClick={event => {
          if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
            event.preventDefault();
            onBack();
          }
        }}>BACK</a>
        <SliderNavigation label="project" canSlideLeft={canSlideLeft} canSlideRight={canSlideRight}
                  onPrevious={() => { if (sliderRef.current) slideByTile(sliderRef.current, -1); }}
                  onNext={() => { if (sliderRef.current) slideByTile(sliderRef.current); }} />
      </div>
      <div ref={sliderRef} onScroll={updateNavigation} onLoadCapture={updateNavigation} className="project-slider" role="region" aria-label={`${project.title} slides`} tabIndex={0}
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
        onLostPointerCapture={event => {
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
        <section className="project-slide project-text-slide">
          <h2>{project.title}</h2>
          {project.story && <p>{project.story}</p>}
          {Boolean(project.year || project.tags?.length) && (
            <ul className="project-tags" aria-label="Project details">
              {project.year && <li>{project.year}</li>}
              {project.tags?.map(tag => <li key={tag}>{tag}</li>)}
            </ul>
          )}
        </section>
        <figure className="project-slide project-media-slide">
          {coverFilm?.type === 'youtube' ? (
            <a className="youtube-tile" href={coverFilm.url} target="_blank" rel="noopener noreferrer"
              draggable={false} aria-label={`Play on YouTube: ${coverFilm.title} (opens in a new tab)`}>
              <PortfolioImage src={project.cover} alt={project.title} />
              <span className="youtube-play">PLAY ON YOUTUBE</span>
            </a>
          ) : <PortfolioImage src={project.cover} alt={project.title} />}
        </figure>
        {project.media.filter(media => media !== coverFilm).map((media, index) => media.type === 'text' ? (
          <section className="project-slide project-text-slide" key={`text-${index}`}>
            <h2>{media.title}</h2>
            <p>{media.body}</p>
          </section>
        ) : (
          <figure className="project-slide project-media-slide" key={`${media.src}-${index}`}>
            {media.type === 'image' ? (
              <PortfolioImage src={media.src} alt={media.alt} />
            ) : media.type === 'youtube' ? (
              <a className="youtube-tile" href={media.url} target="_blank" rel="noopener noreferrer"
                draggable={false} aria-label={`Play on YouTube: ${media.title} (opens in a new tab)`}>
                <PortfolioImage src={media.src} alt={media.title} />
                <span className="youtube-play">PLAY ON YOUTUBE</span>
              </a>
            ) : (
              <PortfolioVideo src={media.src} poster={media.poster} title={media.title} aspectRatio={media.aspectRatio} hasAudio={media.hasAudio} />
            )}
            {media.caption && <figcaption>{media.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </article>
  );
}
