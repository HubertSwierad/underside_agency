import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(600);
  jest.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(1800);
  window.history.replaceState(null, '', '/');
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

test('shows and hides work with a service introduction and linked project covers', async () => {
  await act(async () => { render(<App />); });
  const toggle = screen.getByRole('button', { name: 'WORK' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(toggle);
  expect(screen.getByRole('button', { name: 'WORK' })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('heading', { name: /selected work for music, culture and independent brands./i })).toBeVisible();
  expect(screen.getByRole('link', { name: /HORIZON FESTIVAL portfolio HORIZON FESTIVAL/ })).toHaveAttribute('href', '/work/horizon-festival');
  expect(screen.getByRole('link', { name: /SEKTION portfolio SEKTION/ })).toHaveAttribute('href', '/work/sektion');
  fireEvent.click(toggle);
  expect(toggle).toHaveTextContent('WORK');
});

test('opens a project directly from its portfolio address', async () => {
  window.history.replaceState(null, '', '/work/horizon-festival');
  await act(async () => { render(<App />); });
  expect(screen.getByRole('heading', { name: 'HORIZON FESTIVAL' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'BACK' })).toHaveAttribute('href', '/work');
  fireEvent.click(screen.getByRole('region', { name: 'Selected work' }));
  expect(screen.getByRole('heading', { name: /selected work for music, culture and independent brands./i })).toBeVisible();
});


test('keeps work open inside the slider and closes it when the backdrop is clicked', async () => {
  await act(async () => { render(<App />); });
  fireEvent.click(screen.getByRole('button', { name: 'WORK' }));
  fireEvent.click(screen.getByRole('heading', { name: /selected work for music, culture and independent brands./i }));
  expect(screen.getByRole('button', { name: 'WORK' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('region', { name: 'Portfolio slider' }));
  expect(screen.getByRole('button', { name: 'WORK' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('region', { name: 'Selected work' }));
  expect(screen.getByRole('button', { name: 'WORK' })).toHaveAttribute('aria-expanded', 'false');
});


test('main work navigation advances the slider without closing it and Hide restores the logo view', async () => {
  await act(async () => { render(<App />); });
  fireEvent.click(screen.getByRole('button', { name: 'WORK' }));
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
  expect(screen.getByRole('button', { name: 'WORK' })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'HIDE' }));
  expect(screen.getByRole('button', { name: 'WORK' })).toHaveAttribute('aria-expanded', 'false');
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
  expect(screen.getByRole('button', { name: 'WORK' })).toBeVisible();
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

test('opens About with service media and returns home when its backdrop is clicked', async () => {
  await act(async () => { render(<App />); });
  fireEvent.click(screen.getByRole('button', { name: 'ABOUT' }));
  expect(window.location.pathname).toBe('/about');
  expect(screen.getByRole('heading', { name: 'Visuals that stay under your skin.' })).toBeVisible();
  expect(screen.getByRole('region', { name: 'About slides' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'Next about slide' })).toBeEnabled();
  expect(screen.getByRole('link', { name: /VIA Fashion Show film/ })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=pepfv6cDHf8');
  expect(screen.getByRole('link', { name: /Vali Theater Lab campaign film/ })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=kSmcqsy7MTA');
  expect(screen.getByText(/VAT: PL7292752531/)).toBeVisible();
  const background = document.querySelector<HTMLVideoElement>('.video-container > video')!;
  expect(background).not.toHaveAttribute('autoplay');
  fireEvent.click(screen.getByRole('region', { name: 'About Underside' }));
  expect(window.location.pathname).toBe('/');
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


test.each(['HIDE', 'WORK', 'backdrop'])('resets the work slider after closing with %s', async (label) => {
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
  fireEvent.click(screen.getByRole('button', { name: 'WORK' }));
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
  fireEvent.click(screen.getByRole('button', { name: 'WORK' }));
  expect(slider.scrollLeft).toBe(0);
});


test('defers portfolio images until Work opens and preloads music during the intro', async () => {
  const { container } = await act(async () => render(<App />));
  expect(container.querySelector('#work-panel img')).toBeNull();
  expect(container.querySelector('audio')).toHaveAttribute('preload', 'auto');
  expect(container.querySelector('.video-container > video')).toHaveAttribute('poster', '/BackgroundVideo-poster-v1.jpg');
  expect(container.querySelector('.video-container > video source')).toHaveAttribute('src', '/BackgroundVideo-compressed-v1.mp4');
  fireEvent.click(screen.getByRole('button', { name: 'WORK' }));
  expect(container.querySelector('#work-panel img')).not.toBeNull();
});

function mockMobileViewport(matches: boolean) {
  const listeners = new Set<() => void>();
  const media = {
    matches,
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  };
  const original = window.matchMedia;
  window.matchMedia = jest.fn().mockReturnValue(media);
  return {
    resize: (mobile: boolean) => { media.matches = mobile; listeners.forEach(listener => listener()); },
    restore: () => { window.matchMedia = original; },
  };
}

test.each([true, false])('pauses the background video while Work is open and resumes on close (mobile: %s)', async (mobile) => {
  const viewport = mockMobileViewport(mobile);
  const pause = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  const play = HTMLMediaElement.prototype.play as jest.Mock;
  try {
    const { container } = await act(async () => render(<App />));
    const video = container.querySelector('.video-container > video')!;
    const audio = container.querySelector('audio')!;
    play.mockClear();
    fireEvent.click(screen.getByRole('button', { name: 'WORK' }));
    expect(pause).toHaveBeenCalledTimes(1);
    expect(pause.mock.instances[0]).toBe(video);
    expect(video).not.toHaveAttribute('autoplay');
    fireEvent.pause(video);
    fireEvent.canPlay(video);
    expect(screen.queryByRole('button', { name: 'PLAY' })).not.toBeInTheDocument();
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Turn music on' })); });
    expect(play.mock.instances).toEqual([audio]);
    expect(pause).toHaveBeenCalledTimes(1);
    play.mockClear();
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'WORK' })); });
    expect(play.mock.instances).toEqual([video]);
    expect(video).toHaveAttribute('autoplay');
  } finally { viewport.restore(); }
});

test('direct project links stay paused through canplay and viewport changes', async () => {
  const viewport = mockMobileViewport(true);
  const pause = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  const play = HTMLMediaElement.prototype.play as jest.Mock;
  window.history.replaceState(null, '', '/work/sona');
  try {
    const { container } = await act(async () => render(<App />));
    const video = container.querySelector('.video-container > video')!;
    fireEvent.canPlay(video);
    expect(play).not.toHaveBeenCalled();
    expect(pause.mock.instances).toEqual([video]);
    await act(async () => { viewport.resize(false); });
    expect(play).not.toHaveBeenCalled();
    await act(async () => { viewport.resize(true); });
    expect(play).not.toHaveBeenCalled();
    expect(pause.mock.instances).toEqual([video]);
  } finally { viewport.restore(); }
});

test('desktop background remains paused during navigation within Work', async () => {
  const viewport = mockMobileViewport(false);
  const pause = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  try {
    const { container } = await act(async () => render(<App />));
    fireEvent.click(screen.getByRole('button', { name: 'WORK' }));
    const play = HTMLMediaElement.prototype.play as jest.Mock;
    play.mockClear();
    fireEvent.click(screen.getByRole('link', { name: /HORIZON FESTIVAL portfolio HORIZON FESTIVAL/ }));
    fireEvent.click(screen.getByRole('link', { name: 'BACK' }));
    expect(pause).toHaveBeenCalledTimes(1);
    expect(play).not.toHaveBeenCalled();
    expect(container.querySelector('.video-container > video')).not.toHaveAttribute('autoplay');
    expect(container.querySelector('.logo-overlay')).toHaveAttribute('fetchpriority', 'high');
  } finally { viewport.restore(); }
});

test('keeps the intro visible until the background video actually starts playing', async () => {
  jest.useFakeTimers();
  try {
    const { container } = await act(async () => render(<App />));
    act(() => { jest.advanceTimersByTime(2000); });
    expect(container.querySelector('.intro-screen')).not.toHaveClass('is-exiting');
    fireEvent.playing(container.querySelector('.video-container > video')!);
    expect(container.querySelector('.intro-screen')).toHaveClass('is-finishing');
    expect(container.querySelector('.intro-screen')).not.toHaveClass('is-exiting');
    const revealEnd = new Event('animationend', { bubbles: true });
    Object.defineProperty(revealEnd, 'animationName', { value: 'intro-logo-finish' });
    fireEvent(container.querySelector('.intro-logo')!, revealEnd);
    expect(container.querySelector('.intro-screen')).toHaveClass('is-revealed');
    act(() => { jest.advanceTimersByTime(120); });
    expect(container.querySelector('.intro-screen')).toHaveClass('is-exiting');
    act(() => { jest.advanceTimersByTime(300); });
    expect(container.querySelector('.intro-screen')).toBeNull();
  } finally {
    jest.useRealTimers();
  }
});
