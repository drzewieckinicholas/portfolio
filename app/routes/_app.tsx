import { Outlet, useMatches } from '@remix-run/react';

import { Header } from '~/components';
import type { Match } from '~/types';

export default function App() {
  const matches = useMatches() as Match[];
  const heading = matches[matches.length - 1].handle.heading;

  return (
    <>
      <nav>Nav</nav>
      <Header heading={heading} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
