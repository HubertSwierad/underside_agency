import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(600);
  jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(1800);
  window.history.replaceState(null, '', '/');
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
});
afterEach(() => jest.restoreAllMocks());

test('shows and hides work with a service introduction and linked project covers', async () => {
  await act(async () => { render(<App />); });
  const toggle = screen.getByRole('button', { name: 'SHOW WORK' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  expect(screen.getByRole('button', { name: 'HIDE WORK' })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('heading', { name: /visual direction for artists, live moments, and more./i })).toBeVisible();
  expect(screen.getByRole('link', { name: /HORIZON FESTIVAL portfolio HORIZON FESTIVAL/ })).toHaveAttribute('href', '/work/horizon-festival');
  expect(screen.getByRole('link', { name: /SEKTION portfolio SEKTION/ })).toHaveAttribute('href', '/work/sektion');
  fireEvent.click(toggle);
  expect(toggle).toHaveTextContent('SHOW WORK');
});

test('opens a project directly from its portfolio address', async () => {
  window.history.replaceState(null, '', '/work/horizon-festival');
  await act(async () => { render(<App />); });
  expect(screen.getByRole('heading', { name: 'HORIZON FESTIVAL' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'BACK' })).toHaveAttribute('href', '/work');
});


test('keeps work open inside the slider and closes it when the backdrop is clicked', async () => {
  await act(async () => { render(<App />); });
  fireEvent.click(screen.getByRole('button', { name: 'SHOW WORK' }));
  fireEvent.click(screen.getByRole('heading', { name: /visual direction for artists, live moments, and more./i }));
  expect(screen.getByRole('button', { name: 'HIDE WORK' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('region', { name: 'Portfolio slider' }));
  expect(screen.getByRole('button', { name: 'HIDE WORK' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('region', { name: 'Selected work' }));
  expect(screen.getByRole('button', { name: 'SHOW WORK' })).toHaveAttribute('aria-expanded', 'false');
});


test('main work navigation advances the slider without closing it and Hide restores the logo view', async () => {
  await act(async () => { render(<App />); });
  fireEvent.click(screen.getByRole('button', { name: 'SHOW WORK' }));
  const slider = screen.getByRole('region', { name: 'Portfolio slider' });
  slider.scrollTo = jest.fn();
  slider.scrollLeft = 1200;
  fireEvent.scroll(slider);
  expect(screen.queryByRole('button', { name: 'Next work slide' })).not.toBeInTheDocument();
  slider.scrollLeft = 0;
  fireEvent.scroll(slider);
  expect(screen.queryByRole('button', { name: 'Previous work slide' })).not.toBeInTheDocument();
  slider.scrollLeft = 250;
  fireEvent.scroll(slider);
  fireEvent.click(screen.getByRole('button', { name: 'Previous work slide' }));
  slider.scrollLeft = 0;
  fireEvent.scroll(slider);
  expect(screen.queryByRole('button', { name: 'Previous work slide' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Next work slide' }));
  expect(slider.scrollTo).toHaveBeenCalled();
  expect(screen.getByRole('button', { name: 'HIDE WORK' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'HIDE' }));
  expect(screen.getByRole('button', { name: 'SHOW WORK' })).toHaveAttribute('aria-expanded', 'false');
});

test('mutes background sound during audible portfolio playback and restores it on pause or close', async () => {
  window.history.replaceState(null, '', '/work/sona');
  const { container } = await act(async () => render(<App />));
  const audio = container.querySelector('audio')!;
  const video = screen.getByLabelText('Sona Workshop 01 film');
  expect(audio.muted).toBe(false);
  fireEvent.playing(video);
  expect(audio.muted).toBe(true);
  fireEvent.pause(video);
  expect(audio.muted).toBe(false);
  fireEvent.playing(video);
  expect(audio.muted).toBe(true);
  await act(async () => { window.history.pushState(null, '', '/work'); window.dispatchEvent(new PopStateEvent('popstate')); });
  expect(audio.muted).toBe(false);
});

test('opens the work address directly and navigates between project and work', async () => {
  window.history.replaceState(null, '', '/work');
  await act(async () => { render(<App />); });
  expect(screen.getByRole('button', { name: 'HIDE WORK' })).toBeVisible();
  fireEvent.click(screen.getByRole('link', { name: /HORIZON FESTIVAL portfolio HORIZON FESTIVAL/ }));
  expect(window.location.pathname).toBe('/work/horizon-festival');
  expect(screen.getByRole('heading', { name: 'HORIZON FESTIVAL' })).toBeVisible();
  fireEvent.click(screen.getByRole('link', { name: 'BACK' }));
  expect(window.location.pathname).toBe('/work');
  await act(async () => {
    window.history.replaceState(null, '', '/work/sektion');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(screen.getByRole('heading', { name: 'SEKTION' })).toBeVisible();
});

test('converts an old hash link to a clean project address', async () => {
  window.history.replaceState(null, '', '/#/work/horizon-festival');
  await act(async () => { render(<App />); });
  expect(window.location.pathname).toBe('/work/horizon-festival');
  expect(window.location.hash).toBe('');
  expect(screen.getByRole('heading', { name: 'HORIZON FESTIVAL' })).toBeVisible();
});


test('restores the work slider position after project Back and browser navigation', async () => {
  window.history.replaceState(null, '', '/work');
  await act(async () => { render(<App />); });
  let slider = screen.getByRole('region', { name: 'Portfolio slider' });
  slider.scrollLeft = 725;
  fireEvent.scroll(slider);
  fireEvent.click(screen.getByRole('link', { name: /HORIZON FESTIVAL portfolio HORIZON FESTIVAL/ }));
  fireEvent.click(screen.getByRole('link', { name: 'BACK' }));
  slider = screen.getByRole('region', { name: 'Portfolio slider' });
  expect(slider.scrollLeft).toBe(725);
  expect(screen.getByRole('button', { name: 'Previous work slide' })).toBeVisible();
  slider.scrollLeft = 1100;
  fireEvent.scroll(slider);
  fireEvent.click(screen.getByRole('link', { name: /SEKTION portfolio SEKTION/ }));
  await act(async () => {
    window.history.replaceState(null, '', '/work');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  expect(screen.getByRole('region', { name: 'Portfolio slider' }).scrollLeft).toBe(1100);
});


test.each(['HIDE', 'HIDE WORK', 'backdrop'])('resets the work slider after closing with %s', async (label) => {
  window.history.replaceState(null, '', '/work');
  await act(async () => { render(<App />); });
  const slider = screen.getByRole('region', { name: 'Portfolio slider' });
  slider.scrollLeft = 725;
  fireEvent.scroll(slider);
  fireEvent.click(label === 'backdrop'
    ? screen.getByRole('region', { name: 'Selected work' })
    : screen.getByRole('button', { name: label }));
  expect(slider.scrollLeft).toBe(725);
  const panel = document.getElementById('work-panel')!;
  const transition = new Event('transitionend', { bubbles: true });
  Object.defineProperty(transition, 'propertyName', { value: 'opacity' });
  fireEvent(panel, transition);
  expect(slider.scrollLeft).toBe(0);
  fireEvent.click(screen.getByRole('button', { name: 'SHOW WORK' }));
  expect(screen.getByRole('region', { name: 'Portfolio slider' }).scrollLeft).toBe(0);
  expect(screen.queryByRole('button', { name: 'Previous work slide' })).not.toBeInTheDocument();
});

test('resets before a quick reopen without waiting for the closing transition', async () => {
  window.history.replaceState(null, '', '/work');
  await act(async () => { render(<App />); });
  const slider = screen.getByRole('region', { name: 'Portfolio slider' });
  slider.scrollLeft = 725;
  fireEvent.scroll(slider);
  fireEvent.click(screen.getByRole('button', { name: 'HIDE' }));
  expect(slider.scrollLeft).toBe(725);
  fireEvent.click(screen.getByRole('button', { name: 'SHOW WORK' }));
  expect(slider.scrollLeft).toBe(0);
});
