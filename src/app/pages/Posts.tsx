import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { getPosts, type Post } from '../lib/postsStorage';

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [highlightedPostId, setHighlightedPostId] = useState<number | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  useEffect(() => {
    const targetPostTitle = searchParams.get('post')?.trim().toLowerCase();
    if (!targetPostTitle || posts.length === 0) return;

    const matchedPost =
      posts.find((post) => post.title.trim().toLowerCase() === targetPostTitle) ??
      posts.find((post) => post.title.trim().toLowerCase().includes(targetPostTitle));

    if (!matchedPost) return;

    const postElement = document.getElementById(`post-${matchedPost.id}`);
    if (!postElement) return;

    postElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlightedPostId(matchedPost.id);

    const timer = window.setTimeout(() => {
      setHighlightedPostId(null);
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [posts, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary to-white">
      <section className="relative py-16 lg:py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl mb-4">Posts</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Updates and stories from GaVi Homestay.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-4">
            {posts.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 text-center text-muted-foreground">
                No posts available yet.
              </div>
            )}

            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                id={`post-${post.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className={`bg-white rounded-xl shadow-md p-6 lg:p-7 transition-colors ${
                  highlightedPostId === post.id ? 'ring-2 ring-primary/60 bg-primary/5' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-2xl text-primary">{post.title}</h3>
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    {post.createdAt}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
