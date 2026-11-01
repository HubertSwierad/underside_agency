import { createContext } from 'react';

// Track every audible portfolio player so the background stays muted until all stop.
export const PortfolioPlaybackContext = createContext<(id: string, audible: boolean) => void>(() => {});
