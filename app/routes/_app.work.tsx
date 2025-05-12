import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Work' }];
};

export default function Work() {
  return <p>Lorem ipsum dolor sit amet</p>;
}
