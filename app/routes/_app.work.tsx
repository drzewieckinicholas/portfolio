import type { MetaFunction } from '@remix-run/node';

import type { Handle } from '~/types';

export const meta: MetaFunction = () => {
  return [{ title: 'Work' }];
};

export const handle: Handle = {
  heading: 'Work',
};

export default function Work() {
  return <p>Lorem ipsum dolor sit amet</p>;
}
