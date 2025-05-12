import type { MetaFunction } from '@remix-run/node';

import type { Handle } from '~/types';

export const meta: MetaFunction = () => {
  return [{ title: 'Nicholas Drzewiecki' }];
};

export const handle: Handle = {
  heading: 'Nicholas Drzewiecki',
};

export default function Index() {
  return (
    <article className='prose'>
      <h2>Foo</h2>
      <p>Lorem ipsum dolor sit amet</p>
    </article>
  );
}
