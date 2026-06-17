import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { CalendarDays } from 'lucide-react';
import { getPosts, type Post } from '../lib/postsStorage';

export function PostDetails() {
  const { slug } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const post = useMemo(() => posts.find((item) => item.seo.slug === slug), [posts, slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-secondary to-white">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-3xl lg:text-4xl text-primary">Post not found</h1>
            <p className="text-muted-foreground">The requested post does not exist or may have been removed.</p>
            <Link
              to="/posts"
              className="inline-flex items-center px-5 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Back to Posts
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary to-white">
      <article className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <Link to="/posts" className="text-primary hover:underline text-sm">
              ← Back to all posts
            </Link>

            <header className="mt-4 mb-6 space-y-3">
              <h1 className="text-3xl lg:text-4xl text-primary leading-tight">{post.seo.h1 || post.title}</h1>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                {post.createdAt}
              </div>
            </header>

            <div className="prose prose-neutral max-w-none">
              {post.images.length > 0 && (
                <div className="not-prose mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.images.map((image, imageIndex) => (
                    <img
                      key={`${post.id}-details-image-${imageIndex}`}
                      src={image}
                      alt={`${post.title} image ${imageIndex + 1}`}
                      className="w-full h-56 object-cover rounded-xl border border-border"
                      loading="lazy"
                    />
                  ))}
                </div>
              )}

              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
