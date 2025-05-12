import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useId } from 'react';

import { Card, NavLink } from '~/components';
import type { Handle } from '~/types';
import { getPosts } from '~/utils';

export const meta: MetaFunction = () => {
  return [{ title: 'Blog' }];
};

export const handle: Handle = {
  heading: 'Blog',
};

export async function loader() {
  try {
    const posts = await getPosts();

    return { posts };
  } catch (error) {
    console.error('Failed to load blog posts', error);

    return { posts: [] };
  }
}

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();
  const headingId = useId();

  const renderPosts = () => {
    if (posts.length === 0) {
      return <p>No posts found 🙁</p>;
    }

    return (
      <div className='grid gap-4'>
        {posts.map(({ frontmatter, slug }) => (
          <Card
            key={slug}
            heading={frontmatter.title}
            content={<p>{frontmatter.description}</p>}
            footer={<NavLink to={`/blog/${slug}`}>Read article</NavLink>}
          />
        ))}
      </div>
    );
  };

  return (
    <section aria-labelledby={headingId} className='prose'>
      <h2 id={headingId}>Posts</h2>
      {renderPosts()}
    </section>
  );
}
