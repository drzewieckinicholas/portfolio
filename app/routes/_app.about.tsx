import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'About' }];
};

export default function About() {
  return <p>Lorem ipsum dolor sit amet</p>;
}
