import type { MetaFunction } from '@remix-run/node';

import type { Handle } from '~/types';

export const meta: MetaFunction = () => {
  return [{ title: 'About' }];
};

export const handle: Handle = {
  heading: 'About',
};

export default function About() {
  return <p>Lorem ipsum dolor sit amet</p>;
}
