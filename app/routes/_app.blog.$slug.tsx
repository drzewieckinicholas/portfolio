import { type LoaderFunctionArgs } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo } from 'react';

import type { Handle } from '~/types';
import { getPost } from '~/utils';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.post?.frontmatter?.title || 'Post Not Found' }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;

  if (!slug) {
    throw new Response('Post not found', { status: 404 });
  }

  try {
    const post = await getPost(slug);

    return { post };
  } catch (error) {
    throw new Response('Post not found', { status: 404 });
  }
}

export const handle: Handle = {
  heading: 'Post',
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  const Component = useMemo(() => {
    return getMDXComponent(post.code);
  }, [post.code]);

  return (
    <article className='prose'>
      <Component />
    </article>
  );
}
