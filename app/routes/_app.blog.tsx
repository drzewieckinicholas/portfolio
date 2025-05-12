import type { MetaFunction } from '@remix-run/node';

import type { Handle } from '~/types';

export const meta: MetaFunction = () => {
  return [{ title: 'Blog' }];
};

export const handle: Handle = {
  heading: 'Blog',
};

export default function Blog() {
  return <p>Lorem ipsum dolor sit amet</p>;
}
