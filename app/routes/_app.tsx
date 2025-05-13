import { Outlet, useMatches } from '@remix-run/react';

import { Header, WithNav } from '~/components';
import type { Match } from '~/types';

export default function App() {
  const matches = useMatches() as Match[];

  const match = matches[matches.length - 1];
  const loaderData = match.data;
  const postTitle = loaderData?.post?.frontmatter?.title;
  const heading = postTitle || match.handle.heading;

  return (
    <>
      <WithNav />
      <Header heading={heading} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
