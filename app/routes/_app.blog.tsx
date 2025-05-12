import type { MetaFunction } from '@remix-run/node';

import { Card } from '~/components';
import type { Handle } from '~/types';

export const meta: MetaFunction = () => {
  return [{ title: 'Blog' }];
};

export const handle: Handle = {
  heading: 'Blog',
};

export default function Blog() {
  return (
    <section className='prose'>
      <h2>Posts</h2>
      <div className='grid gap-4'>
        <Card heading='Foo' content='Lorem ipsum dolor sit amet' />
        <Card heading='Bar' content='Lorem ipsum dolor sit amet' />
        <Card heading='Baz' content='Lorem ipsum dolor sit amet' />
      </div>
    </section>
  );
}
