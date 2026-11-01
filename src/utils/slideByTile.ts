// Align the next tile with the first tile's original inset, regardless of tile width.
export function slideByTile(slider: HTMLDivElement, direction: 1 | -1 = 1) {
  const tiles = Array.from(slider.children) as HTMLElement[];
  if (!tiles.length) return;
  const origin = tiles[0].offsetLeft;
  const positions = tiles.map(tile => tile.offsetLeft - origin);
  const current = slider.scrollLeft;
  const target = direction === 1
    ? positions.find(position => position > current + 2)
    : positions.reverse().find(position => position < current - 2);
  slider.scrollTo({
    left: Math.max(0, Math.min(target ?? (direction === 1 ? slider.scrollWidth : 0), slider.scrollWidth - slider.clientWidth)),
    behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
}
