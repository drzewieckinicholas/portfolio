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
          variant === 'pill' &&
            'rounded-xl px-2 py-1 text-inherit no-underline transition-colors hover:bg-white hover:bg-opacity-10',
          variant === 'pill' &&
            isActive &&
            'bg-white bg-opacity-10 text-rose-300',

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
