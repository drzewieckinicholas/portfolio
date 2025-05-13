import type { BlogPostLoaderData } from '~/types';

export type Handle = {
  heading: string;
};

export type Match = {
  data?: BlogPostLoaderData;
  handle: Handle;
};
