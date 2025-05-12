import { type ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

export default function Portal({ children }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const portalRoot = document.createElement('div');
    document.body.appendChild(portalRoot);

    portalRef.current = portalRoot;
    setMounted(true);

    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);

  return mounted && portalRef.current
    ? createPortal(children, portalRef.current)
    : null;
}
