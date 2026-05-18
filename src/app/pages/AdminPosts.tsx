import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Lock, PlusCircle, Trash2 } from 'lucide-react';
import { getPosts, savePosts, type Post } from '../lib/postsStorage';

const ADMIN_POSTS_PASSCODE = import.meta.env.VITE_ADMIN_POSTS_PASSCODE ?? 'gavi-admin-123';

export function AdminPosts() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passcode === ADMIN_POSTS_PASSCODE) {
      setIsAuthenticated(true);
      setErrorMessage('');
      return;
    }
    setErrorMessage('Invalid passcode');
  };

  const handleAddPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setTitle('');
    setContent('');
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    savePosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary to-white">
      <section className="relative py-16 lg:py-24 bg-primary text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl mb-4">Admin Posts</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Authorized admins can create and manage posts.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {!isAuthenticated && (
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleLogin}
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 space-y-5"
            >
              <div className="flex items-center gap-2 text-primary">
                <Lock className="w-5 h-5" />
                <h2 className="text-2xl">Admin Login</h2>
              </div>
              <div>
                <label htmlFor="admin-passcode" className="block text-sm mb-2">
                  Passcode
                </label>
                <input
                  id="admin-passcode"
                  type="password"
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Lock className="w-5 h-5" />
                Login
              </button>
            </motion.form>
          )}

          {isAuthenticated && (
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddPost}
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 space-y-5"
            >
              <div className="flex items-center gap-2 text-primary">
                <PlusCircle className="w-5 h-5" />
                <h2 className="text-2xl">Create New Post</h2>
              </div>
              <div>
                <label htmlFor="post-title" className="block text-sm mb-2">
                  Title
                </label>
                <input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter post title"
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <div>
                <label htmlFor="post-content" className="block text-sm mb-2">
                  Content
                </label>
                <textarea
                  id="post-content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  rows={5}
                  placeholder="Write your post here..."
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                Add Post
              </button>
            </motion.form>
          )}

          <div className="space-y-4">
            {posts.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 text-center text-muted-foreground">
                No posts available yet.
              </div>
            )}

            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="bg-white rounded-xl shadow-md p-6 lg:p-7"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-2xl text-primary">{post.title}</h3>
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    {post.createdAt}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap mb-5">{post.content}</p>
                {isAuthenticated && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Post
                  </button>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
