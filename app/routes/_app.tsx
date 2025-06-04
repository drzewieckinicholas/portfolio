import { Outlet, useMatches } from '@remix-run/react';

import { Header, WithNav } from '~/components';
import avatarImage from '~/images/avatar.webp';
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

  return (
    <>
      <WithNav />
      <Header
        {...(isBlogRoute && {
          date,
          imageAlt: 'Avatar of Nicholas',
          imageUrl: avatarImage,
        })}
        heading={heading}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}
