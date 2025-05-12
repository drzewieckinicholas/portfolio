import { NavLink as RemixNavLink } from '@remix-run/react';
import clsx from 'clsx';

type NavLinkProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  to: string;
};

export default function NavLink({
  children,
  className,
  onClick,
  to,
}: NavLinkProps) {
  return (
    <RemixNavLink
      className={({ isActive }) => {
        if (isActive) {
          return clsx('underline', className);
        }

        return className || undefined;
      }}
      onClick={onClick}
      prefetch='intent'
      to={to}
      viewTransition
    >
      {children}
    </RemixNavLink>
  );
}
