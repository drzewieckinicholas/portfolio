import {
  NavLink as RemixNavLink,
  type NavLinkProps as RemixNavLinkProps,
} from '@remix-run/react';
import clsx from 'clsx';

type NavLinkVariant = 'default' | 'pill';

type NavLinkProps = RemixNavLinkProps & {
  variant?: NavLinkVariant;
};

export default function NavLink({
  children,
  className,
  variant = 'default',
  ...props
}: NavLinkProps) {
  return (
    <RemixNavLink
      className={({ isActive, isPending, isTransitioning }) => {
        const classes = clsx(
          variant === 'pill' && 'nav-pill',
          variant === 'pill' && isActive && 'active',

          typeof className === 'function'
            ? className({ isActive, isPending, isTransitioning })
            : className,
        );

        return classes || undefined;
      }}
      {...props}
    >
      {children}
    </RemixNavLink>
  );
}
