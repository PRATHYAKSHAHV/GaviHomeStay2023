export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

const POSTS_STORAGE_KEY = 'gavi_posts';

export function getPosts(): Post[] {
  const rawPosts = localStorage.getItem(POSTS_STORAGE_KEY);
  if (!rawPosts) return [];

  try {
    const parsedPosts = JSON.parse(rawPosts) as Post[];
    return Array.isArray(parsedPosts) ? parsedPosts : [];
  } catch {
    return [];
  }
}

export function savePosts(posts: Post[]) {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}
