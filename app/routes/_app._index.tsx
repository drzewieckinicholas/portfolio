import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Home' }];
};

export default function Index() {
  return <p>Lorem ipsum dolor sit amet</p>;
}
