import { createContext, type ReactNode } from 'react';

type SidePanelContextType = {
  closePanel: () => void;
  isOpen: boolean;
  panelId: string;
  setContent: (content: ReactNode) => void;
  togglePanel: () => void;
};

const SidePanelContext = createContext<SidePanelContextType | null>(null);

export default SidePanelContext;
