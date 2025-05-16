import { NavLink } from '~/components';
import { useSidePanel } from '~/hooks';
import type { NavLinks } from '~/types';

type MobileNavProps = {
  links: NavLinks;
};

export default function MobileNav({ links }: MobileNavProps) {
  const { closePanel } = useSidePanel();

  return (
    <nav aria-label='Site navigation' id='nav-site-mobile'>
      <ul className='flex flex-col gap-4'>
        <li>
          <NavLink
            onClick={closePanel}
            prefetch='intent'
            to={links.left.to}
            variant='pill'
          >
            {links.left.text}
          </NavLink>
        </li>
        {links.right.map(({ text, to }) => (
          <li key={text}>
            <NavLink
              onClick={closePanel}
              prefetch='intent'
              to={to}
              variant='pill'
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
