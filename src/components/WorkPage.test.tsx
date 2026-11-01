import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import WorkPage from './WorkPage';

beforeEach(() => {
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(600);
  jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(1800);
});
afterEach(() => jest.restoreAllMocks());

test('renders project story, additional photographs and playable videos', () => {
  render(<WorkPage onBack={() => {}} project={{
    slug: 'example', title: 'Example', year: '2026', cover: '/cover.jpg',
    story: 'A story about this project.', tags: ['PHOTO', 'VIDEO'],
    media: [
      { type: 'image', src: '/detail.jpg', alt: 'Behind the scenes', caption: 'On set' },
      { type: 'text', title: 'Photoshoot & atmosphere', body: 'The mood of the shoot.' },
      { type: 'youtube', src: '/youtube-cover.jpg', url: 'https://www.youtube.com/watch?v=example', title: 'Full film' },
      { type: 'video', src: '/film.mp4', title: 'Project film', poster: '/poster.jpg', sizeBytes: 6_000_000 },
    ],
  }} />);
  expect(screen.getByText('A story about this project.')).toBeVisible();
  expect(screen.getByRole('list', { name: 'Project details' })).toHaveTextContent('2026PHOTOVIDEO');
  expect(screen.getByAltText('Behind the scenes')).toHaveAttribute('src', '/detail.jpg');
  expect(screen.getByAltText('Behind the scenes')).toHaveAttribute('loading', 'lazy');
  expect(screen.getByAltText('Behind the scenes')).toHaveAttribute('decoding', 'async');
  expect(screen.getByAltText('Example')).toHaveAttribute('loading', 'lazy');
  expect(screen.getByText('On set')).toBeVisible();
  const slider = screen.getByRole('region', { name: 'Example slides' });
  slider.scrollTo = jest.fn();
  slider.scrollLeft = 1200;
  fireEvent.scroll(slider);
  expect(screen.queryByRole('button', { name: 'Next project slide' })).not.toBeInTheDocument();
  slider.scrollLeft = 0;
  fireEvent.scroll(slider);
  expect(screen.queryByRole('button', { name: 'Previous project slide' })).not.toBeInTheDocument();
  slider.scrollLeft = 250;
  fireEvent.scroll(slider);
  fireEvent.click(screen.getByRole('button', { name: 'Previous project slide' }));
  slider.scrollLeft = 0;
  fireEvent.scroll(slider);
  expect(screen.queryByRole('button', { name: 'Previous project slide' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next project slide' }));
  expect(slider.scrollTo).toHaveBeenCalled();
  const slides = slider.children;
  expect(slides[0]).toContainElement(screen.getByRole('heading', { name: 'Example' }));
  expect(slides[3]).toContainElement(screen.getByRole('heading', { name: 'Photoshoot & atmosphere' }));
  expect(slides[5]).toContainElement(screen.getByLabelText('Project film'));
  const youtube = screen.getByRole('link', { name: /Play on YouTube: Full film/ });
  expect(youtube).toHaveAttribute('href', 'https://www.youtube.com/watch?v=example');
  expect(youtube).toHaveAttribute('target', '_blank');
  expect(youtube).toHaveTextContent('PLAY ON YOUTUBE');
  expect(screen.getByAltText('Full film')).toHaveAttribute('loading', 'lazy');
  expect(screen.getByRole('button', { name: 'Play Project film' })).toBeVisible();
  expect(screen.getByLabelText('Project film')).not.toHaveAttribute('src');
  expect(screen.getByLabelText('Project film')).toHaveAttribute('poster', '/poster.jpg');
});
