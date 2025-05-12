import { readdir, readFile } from 'fs/promises';
import { LRUCache } from 'lru-cache';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';

import type { Post, PostFrontmatter } from '~/types';

const POSTS_PATH = path.join(process.cwd(), 'app', 'posts');

const postsCache = new LRUCache({
  allowStale: false,
  max: 10,
  ttl: 1000 * 60 * 60,
});

const ALL_POSTS_CACHE_KEY = 'all-posts';

export async function getPostsSlugs() {
  try {
    const files = await readdir(POSTS_PATH);

    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Failed to read posts directory', error);

    return [];
  }
}

export async function getPosts() {
  const cachedPosts = postsCache.get(ALL_POSTS_CACHE_KEY) as Post[] | undefined;

  if (cachedPosts) {
    return cachedPosts;
  }

  const slugs = await getPostsSlugs();

  const postsPromises = slugs.map(async (slug) => {
    try {
      const cachedPost = postsCache.get(slug) as Post | undefined;

      if (cachedPost) {
        return { frontmatter: cachedPost.frontmatter, slug };
      }

      const source = await readFile(
        path.join(POSTS_PATH, `${slug}.mdx`),
        'utf8',
      );

      const { frontmatter } = await bundleMDX<PostFrontmatter>({
        cwd: path.join(process.cwd(), 'app'),
        source,
      });

      return { frontmatter, slug };
    } catch (error) {
      console.error('Failed to process post', error);

      return null;
    }
  });

  const posts = (await Promise.all(postsPromises)).filter(Boolean) as Post[];

  const sortedPosts = posts.sort((a, b) =>
    a.frontmatter.date && b.frontmatter.date
      ? new Date(b.frontmatter.date).valueOf() -
        new Date(a.frontmatter.date).valueOf()
      : 0,
  );

  postsCache.set(ALL_POSTS_CACHE_KEY, sortedPosts);

  return sortedPosts;
}

export async function getPost(slug: string) {
  const cachedPost = postsCache.get(slug);

  if (cachedPost) {
    return cachedPost;
  }

  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

  try {
    const source = await readFile(filePath, 'utf8');

    const { code, frontmatter } = await bundleMDX<PostFrontmatter>({
      cwd: path.join(process.cwd(), 'app'),
      source,
    });

    const post = { code, frontmatter, slug };

    postsCache.set(slug, post);

    return post;
  } catch (error) {
    console.error('Failed to load post', error);

    throw new Error('Post not found');
  }
}
