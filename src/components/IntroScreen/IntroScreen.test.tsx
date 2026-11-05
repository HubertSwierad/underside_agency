import { act, fireEvent, render } from '@testing-library/react';
import IntroScreen from './IntroScreen';

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

function finishReveal(container: HTMLElement) {
  const event = new Event('animationend', { bubbles: true });
  Object.defineProperty(event, 'animationName', { value: 'intro-logo-finish' });
  fireEvent(container.querySelector('.intro-logo')!, event);
}

test('fully reveals the logo and holds it visible before starting the fade', () => {
  const { container } = render(<IntroScreen ready />);
  act(() => { jest.advanceTimersByTime(1699); });
  expect(container.firstChild).not.toHaveClass('is-finishing', 'is-exiting');
  act(() => { jest.advanceTimersByTime(1); });
  expect(container.firstChild).toHaveClass('is-finishing');
  expect(container.firstChild).not.toHaveClass('is-exiting');
  finishReveal(container);
  expect(container.firstChild).toHaveClass('is-revealed');
  expect(container.firstChild).not.toHaveClass('is-exiting');
  act(() => { jest.advanceTimersByTime(119); });
  expect(container.firstChild).not.toHaveClass('is-exiting');
  act(() => { jest.advanceTimersByTime(1); });
  expect(container.firstChild).toHaveClass('is-exiting');
  act(() => { jest.advanceTimersByTime(300); });
  expect(container).toBeEmptyDOMElement();
});

test('keeps the logo visible while waiting and finishes its reveal when the video becomes ready', () => {
  const { container, rerender } = render(<IntroScreen ready={false} />);
  act(() => { jest.advanceTimersByTime(4000); });
  expect(container.firstChild).not.toHaveClass('is-finishing', 'is-exiting');
  rerender(<IntroScreen ready />);
  expect(container.firstChild).toHaveClass('is-finishing');
  finishReveal(container);
  act(() => { jest.advanceTimersByTime(120); });
  expect(container.firstChild).toHaveClass('is-exiting');
  act(() => { jest.advanceTimersByTime(300); });
  expect(container).toBeEmptyDOMElement();
});

test('finishes the intro after the loading deadline even if animation events are unavailable', () => {
  const { container } = render(<IntroScreen ready={false} />);
  act(() => { jest.advanceTimersByTime(7999); });
  expect(container.firstChild).not.toHaveClass('is-finishing', 'is-exiting');
  act(() => { jest.advanceTimersByTime(1); });
  expect(container.firstChild).toHaveClass('is-finishing');
  act(() => { jest.advanceTimersByTime(400); });
  expect(container.firstChild).toHaveClass('is-revealed');
  expect(container.firstChild).not.toHaveClass('is-exiting');
  act(() => { jest.advanceTimersByTime(120); });
  expect(container.firstChild).toHaveClass('is-exiting');
  act(() => { jest.advanceTimersByTime(300); });
  expect(container).toBeEmptyDOMElement();
});

test('finishes the logo reveal from its current position when the video becomes ready', () => {
  jest.spyOn(window, 'getComputedStyle').mockReturnValue({
    clipPath: 'inset(0px 37% 0px 0px)',
  } as CSSStyleDeclaration);
  const { container, rerender } = render(<IntroScreen ready={false} />);
  act(() => { jest.advanceTimersByTime(4000); });
  rerender(<IntroScreen ready />);
  expect(container.querySelector<HTMLElement>('.intro-logo')!.style.getPropertyValue('--intro-reveal-start'))
    .toBe('inset(0px 37% 0px 0px)');
  expect(container.firstChild).toHaveClass('is-finishing');
  expect(container.firstChild).not.toHaveClass('is-exiting');
});
