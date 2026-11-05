import { render, screen } from '@testing-library/react';
import PortfolioImage from './PortfolioImage';
import { projects } from '../../data/workDatabase';

test('YouTube filename stays an image path instead of becoming a query string', () => {
  render(<PortfolioImage src="/Portfolio/Vali/watch?v=kSmcqsy7MTA.png" alt="Film cover" />);
  expect(screen.getByAltText('Film cover')).toHaveAttribute('src', '/Portfolio/Vali/watch%3Fv=kSmcqsy7MTA.png');
});

test('discovered covers are added once to the matching project', () => {
  const vali = projects.find(project => project.slug === 'vali-theater-lab');
  const film = vali?.media.filter(media => media.type === 'youtube' && media.url === 'https://www.youtube.com/watch?v=kSmcqsy7MTA');
  expect(film).toHaveLength(1);
  expect(projects.find(project => project.slug === 'horizon-festival')?.media.some(media => media.type === 'youtube' && media.url.endsWith('kSmcqsy7MTA'))).toBe(false);
});
