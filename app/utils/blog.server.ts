import { readdir, readFile } from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';

import type { Post, PostFrontmatter } from '~/types';

const POSTS_PATH = path.join(process.cwd(), 'app', 'posts');

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
  const slugs = await getPostsSlugs();

  const postsPromises = slugs.map(async (slug) => {
    try {
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

  return posts.sort((a, b) =>
    a.frontmatter.date && b.frontmatter.date
      ? new Date(b.frontmatter.date).valueOf() -
        new Date(a.frontmatter.date).valueOf()
      : 0,
  );
}

export async function getPost(slug: string) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);

  try {
    const source = await readFile(filePath, 'utf8');

    const { code, frontmatter } = await bundleMDX<PostFrontmatter>({
      cwd: path.join(process.cwd(), 'app'),
      source,
    });

    return { code, frontmatter, slug };
  } catch (error) {
    console.error('Failed to load post', error);

    throw new Error('Post not found');
  }
}
