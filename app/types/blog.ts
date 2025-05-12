export type PostFrontmatter = {
  date: string;
  description: string;
  title: string;
};

export type Post = {
  frontmatter: PostFrontmatter;
  slug: string;
};
