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
          <NavLink onClick={closePanel} to={links.left.to}>
            {links.left.text}
          </NavLink>
        </li>
        {links.right.map(({ text, to }) => (
          <li key={text}>
            <NavLink onClick={closePanel} to={to}>
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
