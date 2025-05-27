import { List } from '@phosphor-icons/react';

import { MobileNav, NavLink, SidePanel } from '~/components';
import type { NavLinks } from '~/types';

type NavProps = {
  links: NavLinks;
};

export default function Nav({ links }: NavProps) {
  return (
    <nav
      aria-label='Site navigation'
      className='flex h-20 items-center justify-end sm:justify-between'
      id='nav-site'
    >
      <NavLink
        className='hidden sm:block'
        prefetch='intent'
        to={links.left.to}
        variant='pill'
      >
        {links.left.text}
      </NavLink>
      <ul className='hidden gap-4 sm:flex'>
        {links.right.map(({ text, to }) => (
          <li key={text}>
            <NavLink prefetch='intent' to={to} variant='pill'>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className='flex sm:hidden'>
        <SidePanel ariaLabel='Mobile site navigation menu'>
          <SidePanel.Trigger ariaLabel='Open mobile site navigation menu'>
            <List className='text-rose-300' size={32} />
          </SidePanel.Trigger>
          <SidePanel.Content>
            <MobileNav links={links} />
          </SidePanel.Content>
        </SidePanel>
      </div>
    </nav>
  );
}
