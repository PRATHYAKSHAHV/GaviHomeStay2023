export type PostSeo = {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  h1: string;
  focusKeyword: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  noindex: boolean;
  schemaType: 'Article' | 'BlogPosting';
};

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  images: string[];
  seo: PostSeo;
};

const POSTS_STORAGE_KEY = 'gavi_posts';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const normalizePost = (rawPost: Partial<Post> & { title?: string; content?: string; createdAt?: string }): Post => {
  const title = rawPost.title?.trim() || 'Untitled Post';
  const content = rawPost.content?.trim() || '';
  const slug = rawPost.seo?.slug?.trim() || slugify(title);

  return {
    id: Number(rawPost.id) || Date.now(),
    title,
    content,
    createdAt: rawPost.createdAt || new Date().toLocaleDateString('en-IN'),
    images: Array.isArray(rawPost.images)
      ? rawPost.images.filter((image): image is string => typeof image === 'string' && image.trim().length > 0)
      : [],
    seo: {
      seoTitle: rawPost.seo?.seoTitle?.trim() || title,
      metaDescription: rawPost.seo?.metaDescription?.trim() || content.slice(0, 160),
      slug,
      h1: rawPost.seo?.h1?.trim() || title,
      focusKeyword: rawPost.seo?.focusKeyword?.trim() || '',
      canonicalUrl: rawPost.seo?.canonicalUrl?.trim() || `/posts/${slug}`,
      ogTitle: rawPost.seo?.ogTitle?.trim() || title,
      ogDescription: rawPost.seo?.ogDescription?.trim() || content.slice(0, 200),
      ogImage: rawPost.seo?.ogImage?.trim() || '',
      noindex: Boolean(rawPost.seo?.noindex),
      schemaType: rawPost.seo?.schemaType === 'BlogPosting' ? 'BlogPosting' : 'Article',
    },
  };
};

export function getPosts(): Post[] {
  const rawPosts = localStorage.getItem(POSTS_STORAGE_KEY);
  if (!rawPosts) return [];

  try {
    const parsedPosts = JSON.parse(rawPosts) as Array<Partial<Post>>;
    if (!Array.isArray(parsedPosts)) return [];
    return parsedPosts.map((post) => normalizePost(post));
  } catch {
    return [];
  }
}

export function savePosts(posts: Post[]) {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}
