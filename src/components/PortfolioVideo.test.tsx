import { PortfolioPlaybackContext } from './PortfolioPlaybackContext';
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import PortfolioVideo from './PortfolioVideo';

afterEach(() => jest.restoreAllMocks());

test('preloads small videos but does not autoplay', () => {
  const play = jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  render(<PortfolioVideo src="/small.mp4" title="Small film" sizeBytes={4_999_999} />);
  const video = screen.getByLabelText('Small film');
  expect(video).toHaveAttribute('src', '/small.mp4');
  expect(video).toHaveAttribute('preload', 'auto');
  expect(play).not.toHaveBeenCalled();
});

test('waits for Play at the size boundary, then shows loading until playback starts', async () => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  render(<PortfolioVideo src="/large.mp4" title="Large film" sizeBytes={5_000_000} />);
  const video = screen.getByLabelText('Large film');
  expect(video).not.toHaveAttribute('src');
  expect(video).toHaveAttribute('preload', 'none');
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Play Large film' })); });
  expect(video).toHaveAttribute('src', '/large.mp4');
  expect(screen.getByRole('status')).toHaveTextContent('LOADING VIDEO');
  fireEvent.playing(video);
  expect(video).not.toHaveAttribute('controls');
  expect(video).toHaveAttribute('loop');
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  fireEvent.waiting(video);
  expect(screen.getByRole('status')).toBeVisible();
  fireEvent.error(video);
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Retry Large film' })).toBeVisible();
});

test('checks only headers before preloading a small video of unknown size', async () => {
  const originalFetch = global.fetch;
  global.fetch = jest.fn().mockResolvedValue({ ok: true, headers: { get: () => '123456' } });
  try {
    await act(async () => { render(<PortfolioVideo src="/check.mp4" title="Checked film" />); });
    expect(global.fetch).toHaveBeenCalledWith('/check.mp4', expect.objectContaining({ method: 'HEAD' }));
    expect(screen.getByLabelText('Checked film')).toHaveAttribute('src', '/check.mp4');
  } finally { global.fetch = originalFetch; }
});


test('play overlay disappears during looping playback', async () => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  render(<PortfolioVideo src="/loop.mp4" title="Loop film" sizeBytes={1000} />);
  const video = screen.getByLabelText('Loop film');
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Play Loop film' })); });
  fireEvent.playing(video);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(video).toHaveAttribute('loop');
  expect(video).not.toHaveAttribute('controls');
});

test('reveals pause on desktop hover and mobile tap, then pauses through the icon', async () => {
  jest.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  const pause = jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  render(<PortfolioVideo src="/controls.mp4" title="Controls film" sizeBytes={1000} />);
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
    <PortfolioVideo src="/silent.mp4" title="Silent film" sizeBytes={1000} hasAudio={false} />
  </PortfolioPlaybackContext.Provider>);
  fireEvent.playing(screen.getByLabelText('Silent film'));
  expect(report).not.toHaveBeenCalledWith(expect.any(String), true);
});
