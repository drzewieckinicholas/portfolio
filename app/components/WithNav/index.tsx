import { Nav } from '~/components';
import { navLinks } from '~/constants';

export default function WithNav() {
  return <Nav links={navLinks} />;
}
