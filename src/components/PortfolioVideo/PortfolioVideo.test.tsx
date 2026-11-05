import { PortfolioPlaybackContext } from '../../contexts/PortfolioPlaybackContext';
import { act, fireEvent, render, screen } from '@testing-library/react';
import PortfolioVideo from './PortfolioVideo';

afterEach(() => jest.restoreAllMocks());

test('does not download videos before Play', () => {
  const play = jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  render(<PortfolioVideo src="/small.mp4" title="Small film" />);
  const video = screen.getByLabelText('Small film');
  expect(video).not.toHaveAttribute('src');
  expect(video).toHaveAttribute('preload', 'none');
  expect(play).not.toHaveBeenCalled();
});

test('loads on Play and shows loading until playback starts', async () => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  render(<PortfolioVideo src="/large.mp4" title="Large film" />);
  const video = screen.getByLabelText('Large film');
  expect(video).not.toHaveAttribute('src');
  expect(video).toHaveAttribute('preload', 'none');
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Play Large film' })); });
  expect(video).toHaveAttribute('src', '/large.mp4');
  expect(screen.getByRole('status')).toHaveTextContent('LOADING VIDEO');
  fireEvent.playing(video);
  expect(video).not.toHaveAttribute('controls');
  expect(video).not.toHaveAttribute('loop');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  fireEvent.waiting(video);
  expect(screen.getByRole('status')).toBeVisible();
  fireEvent.error(video);
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Retry Large film' })).toBeVisible();
});

test('does not probe video headers before Play', async () => {
  const originalFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({ ok: true, headers: { get: () => '123456' } });
  try {
    await act(async () => { render(<PortfolioVideo src="/check.mp4" title="Checked film" />); });
    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Checked film')).not.toHaveAttribute('src');
  } finally { global.fetch = originalFetch; }
});


test('play overlay disappears during playback and returns when the video ends', async () => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  render(<PortfolioVideo src="/loop.mp4" title="Loop film" />);
  const video = screen.getByLabelText('Loop film');
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Play Loop film' })); });
  fireEvent.playing(video);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(video).not.toHaveAttribute('loop');
  expect(video).not.toHaveAttribute('controls');
  fireEvent.ended(video);
  expect(screen.getByRole('button', { name: 'Play Loop film' })).toBeVisible();
});

test('reveals pause on desktop hover and mobile tap, then pauses through the icon', async () => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  const pause = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  render(<PortfolioVideo src="/controls.mp4" title="Controls film" />);
  const video = screen.getByLabelText('Controls film');
  const player = screen.getByRole('group', { name: 'Controls film playback' });
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Play Controls film' })); });
  fireEvent.playing(video);
  expect(screen.queryByRole('button', { name: 'Pause Controls film' })).not.toBeInTheDocument();
  const hover = new Event('pointerover', { bubbles: true });
  Object.defineProperty(hover, 'pointerType', { value: 'mouse' });
  fireEvent(player, hover);
  expect(screen.getByRole('button', { name: 'Pause Controls film' })).toBeVisible();
  fireEvent.pointerLeave(player);
  expect(screen.queryByRole('button', { name: 'Pause Controls film' })).not.toBeInTheDocument();
  fireEvent.click(player);
  fireEvent.click(screen.getByRole('button', { name: 'Pause Controls film' }));
  expect(pause).toHaveBeenCalledTimes(1);
  fireEvent.pause(video);
  expect(screen.getByRole('button', { name: 'Play Controls film' })).toBeVisible();
});

test('silent clips do not mute the background audio', () => {
  const report = jest.fn();
  render(<PortfolioPlaybackContext.Provider value={report}>
    <PortfolioVideo src="/silent.mp4" title="Silent film" hasAudio={false} />
  </PortfolioPlaybackContext.Provider>);
  fireEvent.playing(screen.getByLabelText('Silent film'));
  expect(report).not.toHaveBeenCalledWith(expect.any(String), true);
});


test('starting another portfolio video pauses the previous one, including silent clips', () => {
  const pause = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
    fireEvent.pause(this);
  });
  render(<>
    <PortfolioVideo src="/first.mp4" title="First film" hasAudio={false} />
    <PortfolioVideo src="/second.mp4" title="Second film" />
    <video aria-label="Background film" />
  </>);
  const first = screen.getByLabelText('First film');
  const second = screen.getByLabelText('Second film');
  const background = screen.getByLabelText('Background film');
  Object.defineProperty(first, 'paused', { configurable: true, value: false });
  Object.defineProperty(background, 'paused', { configurable: true, value: false });
  fireEvent.playing(first);
  fireEvent.play(second);
  fireEvent.playing(second);
  expect(pause.mock.instances).toEqual([first]);
  expect(screen.getByRole('button', { name: 'Play First film' })).toBeVisible();
  expect(screen.queryByRole('button', { name: 'Play Second film' })).not.toBeInTheDocument();

  pause.mockClear();
  Object.defineProperty(first, 'paused', { configurable: true, value: true });
  Object.defineProperty(second, 'paused', { configurable: true, value: false });
  fireEvent.play(first);
  expect(pause.mock.instances).toEqual([second]);
  expect(screen.getByRole('button', { name: 'Play Second film' })).toBeVisible();
});
