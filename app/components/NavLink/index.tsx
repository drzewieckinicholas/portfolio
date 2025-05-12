import { NavLink as RemixNavLink } from '@remix-run/react';

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
};

export default function NavLink({ children, to }: NavLinkProps) {
  return (
    <RemixNavLink
      className={({ isActive }) => (isActive ? 'underline' : undefined)}
      prefetch='intent'
      to={to}
      viewTransition
    >
      {children}
    </RemixNavLink>
  );
}
