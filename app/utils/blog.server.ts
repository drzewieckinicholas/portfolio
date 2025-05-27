import { type Options as MdxOptions } from '@mdx-js/esbuild';
import { readdir, readFile } from 'fs/promises';
import { LRUCache } from 'lru-cache';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import {
  type Options as RehypePrettyCodeOptions,
  rehypePrettyCode,
} from 'rehype-pretty-code';

import type { Post, PostFrontmatter, PostWithCode } from '~/types';

const POSTS_PATH = path.join(process.cwd(), 'app', 'posts');
const POSTS_CACHE_KEY = 'posts';

const postsCache = new LRUCache({
  allowStale: false,
  max: 10,
  ttl: 1000 * 60 * 60,
});

const rehypePrettyCodeOptions: RehypePrettyCodeOptions = {
  keepBackground: false,
  theme: 'github-dark',
};

function getMDXOptions(options: MdxOptions) {
  options.rehypePlugins = [
    ...(options.rehypePlugins ?? []),
    [rehypePrettyCode, rehypePrettyCodeOptions],
  ];
  return options;
}

async function getPostSlugs() {
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
  const cachedPosts = postsCache.get(POSTS_CACHE_KEY) as Post[] | undefined;

  if (cachedPosts) {
    return cachedPosts;
  }

  const slugs = await getPostSlugs();

  const postPromises = slugs.map(async (slug) => {
    const cachedPost = postsCache.get(slug) as Post | undefined;

    if (cachedPost) {
      return { frontmatter: cachedPost.frontmatter, slug };
    }

    return createPostFromSlug(slug);
  });

  const postResults = await Promise.all(postPromises);
  const posts = postResults.filter(Boolean) as Post[];
  const sortedPosts = sortPostsByDate(posts);

  postsCache.set(POSTS_CACHE_KEY, sortedPosts);

  return sortedPosts;
}

export async function getPost(slug: string) {
  const cachedPost = postsCache.get(slug) as PostWithCode | undefined;

  if (cachedPost) {
    return cachedPost;
  }

  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

  try {
    const source = await readFile(filePath, 'utf8');
    const { code, frontmatter } = await bundleMDX<PostFrontmatter>({
      cwd: path.join(process.cwd(), 'app'),
      mdxOptions: getMDXOptions,
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

async function createPostFromSlug(slug: string) {
  try {
    const source = await readFile(path.join(POSTS_PATH, `${slug}.mdx`), 'utf8');
    const { frontmatter } = await bundleMDX<PostFrontmatter>({
      cwd: path.join(process.cwd(), 'app'),
      mdxOptions: getMDXOptions,
      source,
    });

    return { frontmatter, slug };
  } catch (error) {
    console.error('Failed to process post', error);

    return null;
  }
}

function sortPostsByDate(posts: Post[]) {
  return posts.sort((a, b) => {
    const hasDateA = Boolean(a.frontmatter.date);
    const hasDateB = Boolean(b.frontmatter.date);

    if (!hasDateA || !hasDateB) return 0;

    return (
      new Date(b.frontmatter.date).valueOf() -
      new Date(a.frontmatter.date).valueOf()
    );
  });
}
