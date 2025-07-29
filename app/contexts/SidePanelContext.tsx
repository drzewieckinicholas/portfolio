import type { ReactNode } from 'react';
import { createContext } from 'react';

type SidePanelContextType = {
  closePanel: () => void;
  isOpen: boolean;
  panelId: string;
  setContent: (content: ReactNode) => void;
  togglePanel: () => void;
};

const SidePanelContext = createContext<SidePanelContextType | null>(null);

export default SidePanelContext;
