import { NavLink } from '~/components';
import type { NavLinks } from '~/types';

type NavProps = {
  links: NavLinks;
};

export default function Nav({ links }: NavProps) {
  return (
    <nav className='flex justify-between py-4'>
      <NavLink to={links.left.to}>{links.left.text}</NavLink>
      <ul className='flex gap-4'>
        {links.right.map(({ text, to }) => (
          <li key={text}>
            <NavLink to={to}>{text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
