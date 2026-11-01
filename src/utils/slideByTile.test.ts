import { slideByTile } from './slideByTile';

test('advances to each tile boundary even when widths differ, and stops at the end', () => {
  const slider = document.createElement('div');
  [40, 294, 838, 1092].forEach(offsetLeft => {
    const tile = document.createElement('div');
    Object.defineProperty(tile, 'offsetLeft', { value: offsetLeft });
    slider.appendChild(tile);
  });
  Object.defineProperties(slider, {
    scrollWidth: { value: 1700 }, clientWidth: { value: 600 },
  });
  slider.scrollTo = jest.fn();
  slideByTile(slider);
  expect(slider.scrollTo).toHaveBeenLastCalledWith({ left: 254, behavior: 'smooth' });
  slider.scrollLeft = 254;
  slideByTile(slider);
  expect(slider.scrollTo).toHaveBeenLastCalledWith({ left: 798, behavior: 'smooth' });
  slideByTile(slider, -1);
  expect(slider.scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: 'smooth' });
  slider.scrollLeft = 1100;
  slideByTile(slider);
  expect(slider.scrollTo).toHaveBeenLastCalledWith({ left: 1100, behavior: 'smooth' });
});
