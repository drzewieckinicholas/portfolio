import { X } from '@phosphor-icons/react';
import { FocusTrap } from 'focus-trap-react';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';

import { Portal } from '~/components';
import { SidePanelContext } from '~/contexts';
import { useSidePanel } from '~/hooks';

type SidePanelProps = {
  ariaLabel?: string;
  children: ReactNode;
};

function SidePanel({ ariaLabel = 'Side panel', children }: SidePanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const panelId = useId();

  const togglePanel = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePanel]);

  const contextValue = useMemo(
    () => ({
      closePanel,
      isOpen,
      panelId,
      setContent,
      togglePanel,
    }),
    [closePanel, isOpen, panelId, togglePanel],
  );

  const sidePanel = isOpen && (
    <Portal>
      <div
        aria-hidden='true'
        className='fixed inset-0 z-10 bg-black/50'
        onClick={closePanel}
      />
      <FocusTrap
        focusTrapOptions={{
          clickOutsideDeactivates: true,
        }}
      >
        <div
          aria-label={ariaLabel}
          aria-modal='true'
          className='fixed right-0 top-0 z-20 h-full w-full max-w-xs border-l border-violet-300 bg-neutral-900 px-4'
          id={panelId}
          role='dialog'
        >
          <div className='flex h-20 items-center justify-end py-4'>
            <button
              aria-label={`Close ${ariaLabel.toLowerCase()}`}
              onClick={closePanel}
            >
              <X className='text-rose-300' size={32} />
            </button>
          </div>
          <div className='py-4'>{content}</div>
        </div>
      </FocusTrap>
    </Portal>
  );

  return (
    <SidePanelContext.Provider value={contextValue}>
      {children}
      {sidePanel}
    </SidePanelContext.Provider>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { setContent } = useSidePanel();

  useEffect(() => {
    setContent(children);
  }, [children, setContent]);

  return null;
}

function Trigger({
  ariaLabel,
  children,
}: {
  ariaLabel: string;
  children: ReactNode;
}) {
  const { isOpen, panelId, togglePanel } = useSidePanel();

  return (
    <button
      aria-controls={panelId}
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      className='sm:hidden'
      onClick={togglePanel}
    >
      {children}
    </button>
  );
}

SidePanel.Content = Content;
SidePanel.Trigger = Trigger;

export default SidePanel;
