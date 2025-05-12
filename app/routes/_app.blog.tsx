import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Blog' }];
};

export default function Blog() {
  return <p>Lorem ipsum dolor sit amet</p>;
}
