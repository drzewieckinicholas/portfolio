import { Outlet, useMatches } from '@remix-run/react';

import { Header, WithNav } from '~/components';
import avatarImage from '~/images/avatar.webp';
import type { Match } from '~/types';

export default function BlogLayout() {
  const matches = useMatches() as Match[];

  const match = matches[matches.length - 1];
  const loaderData = match.data;
  const postTitle = loaderData?.post?.frontmatter?.title;
  const postDate = loaderData?.post?.frontmatter?.date;
  const heading = postTitle || match.handle.heading;

  const date = postDate ? new Date(postDate) : undefined;
  const isPost = Boolean(loaderData?.post);

  return (
    <>
      <WithNav />
      <Header
        date={date}
        heading={heading}
        imageAlt={isPost ? 'Avatar of Nicholas' : undefined}
        imageUrl={isPost ? avatarImage : undefined}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}
