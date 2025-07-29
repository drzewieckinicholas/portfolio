import { Outlet, useMatches } from '@remix-run/react';

import type { HeaderProps } from '~/components';
import { Header, WithNav } from '~/components';
import type { Match } from '~/types';

export default function AppLayout() {
  const matches = useMatches() as Match[];
  const match = matches[matches.length - 1];
  const loaderData = match.data;

  const isBlogRoute = Boolean(loaderData?.post);

  const heading = loaderData?.post?.frontmatter?.title || match.handle.heading;
  const date = loaderData?.post?.frontmatter?.date
    ? new Date(loaderData.post.frontmatter.date)
    : undefined;

  const headerProps: HeaderProps = {
    heading,
    ...(isBlogRoute &&
      ({
        date,
      } satisfies Partial<HeaderProps>)),
  };

  return (
    <>
      <WithNav />
      <Header {...headerProps} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
