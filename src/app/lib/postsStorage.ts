import { createClient } from '@supabase/supabase-js';

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

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL ?? '',
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
);

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

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('id', { ascending: false });

  if (error || !data) return [];

  return data.map((row) =>
    normalizePost({
      id: row.id,
      title: row.title,
      content: row.content,
      createdAt: row.created_at,
      images: row.images,
      seo: row.seo,
    })
  );
}

export async function savePost(post: Post): Promise<boolean> {
  const { error } = await supabase.from('posts').upsert({
    id: post.id,
    title: post.title,
    content: post.content,
    created_at: post.createdAt,
    images: post.images,
    seo: post.seo,
  });
  return !error;
}

export async function deletePost(id: number): Promise<boolean> {
  const { error } = await supabase.from('posts').delete().eq('id', id);
  return !error;
}
