import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, Lock, PlusCircle, Trash2, X } from 'lucide-react';
import { getPosts, savePost, deletePost, type Post } from '../lib/postsStorage';

const ADMIN_POSTS_PASSCODE =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_ADMIN_POSTS_PASSCODE ??
  'gavi-admin-123';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const MAX_POST_IMAGES = 6;

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });

export function AdminPosts() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [h1, setH1] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [noindex, setNoindex] = useState(false);
  const [schemaType, setSchemaType] = useState<'Article' | 'BlogPosting'>('Article');
  const [images, setImages] = useState<string[]>([]);
  const [imageErrorMessage, setImageErrorMessage] = useState('');

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  useEffect(() => {
    if (isSlugEdited) return;
    setSlug(slugify(title));
  }, [title, isSlugEdited]);

  const fullPreviewUrl = useMemo(() => {
    if (!slug.trim()) return '';
    const normalizedSlug = slugify(slug);
    return `${window.location.origin}/posts/${normalizedSlug}`;
  }, [slug]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passcode === ADMIN_POSTS_PASSCODE) {
      setIsAuthenticated(true);
      setErrorMessage('');
      return;
    }
    setErrorMessage('Invalid passcode');
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const nonImageFile = files.find((file) => !file.type.startsWith('image/'));
    if (nonImageFile) {
      setImageErrorMessage('Only image files are allowed.');
      event.target.value = '';
      return;
    }

    if (images.length + files.length > MAX_POST_IMAGES) {
      setImageErrorMessage(`You can upload up to ${MAX_POST_IMAGES} images per post.`);
      event.target.value = '';
      return;
    }

    try {
      const uploadedImages = await Promise.all(files.map((file) => readFileAsDataUrl(file)));
      setImages((currentImages) => [...currentImages, ...uploadedImages]);
      setImageErrorMessage('');
    } catch {
      setImageErrorMessage('Could not process one or more images. Please try again.');
    } finally {
      event.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((currentImages) => currentImages.filter((_, index) => index !== indexToRemove));
  };

  const handleAddPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const normalizedSlug = slugify(slug);
    if (!normalizedSlug) {
      setPostErrorMessage('URL slug is required.');
      return;
    }

    const isDuplicateSlug = posts.some((post) => post.seo.slug === normalizedSlug);
    if (isDuplicateSlug) {
      setPostErrorMessage('URL slug already exists. Use a unique slug.');
      return;
    }

    const cleanedTitle = title.trim();
    const cleanedContent = content.trim();

    const newPost: Post = {
      id: Date.now(),
      title: cleanedTitle,
      content: cleanedContent,
      images,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      seo: {
        seoTitle: seoTitle.trim() || cleanedTitle,
        metaDescription: metaDescription.trim() || cleanedContent.slice(0, 160),
        slug: normalizedSlug,
        h1: h1.trim() || cleanedTitle,
        focusKeyword: focusKeyword.trim(),
        canonicalUrl: canonicalUrl.trim() || `/posts/${normalizedSlug}`,
        ogTitle: ogTitle.trim() || seoTitle.trim() || cleanedTitle,
        ogDescription: ogDescription.trim() || metaDescription.trim() || cleanedContent.slice(0, 200),
        ogImage: ogImage.trim() || images[0] || '',
        noindex,
        schemaType,
      },
    };

    const isSaved = await savePost(newPost);
    if (!isSaved) {
      setPostErrorMessage(
        'Post could not be saved. Please check your connection and try again. If you uploaded large images, try fewer or smaller ones.'
      );
      return;
    }

    const refreshed = await getPosts();
    setPosts(refreshed);

    setPostErrorMessage('');
    setTitle('');
    setContent('');
    setSlug('');
    setIsSlugEdited(false);
    setH1('');
    setSeoTitle('');
    setMetaDescription('');
    setFocusKeyword('');
    setCanonicalUrl('');
    setOgTitle('');
    setOgDescription('');
    setOgImage('');
    setNoindex(false);
    setSchemaType('Article');
    setImages([]);
    setImageErrorMessage('');
  };

  const handleDeletePost = async (postId: number) => {
    const isDeleted = await deletePost(postId);
    if (!isDeleted) {
      setPostErrorMessage('Post could not be deleted. Please check your connection and try again.');
      return;
    }

    setPosts((current) => current.filter((post) => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary to-white">
      <section className="relative py-16 lg:py-24 bg-primary text-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl mb-4">Admin Posts</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Create posts with complete SEO data including title tags, meta description, URL, H1, and social metadata.
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
              className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 space-y-6"
            >
              <div className="flex items-center gap-2 text-primary">
                <PlusCircle className="w-5 h-5" />
                <h2 className="text-2xl">Create SEO-Optimized Post</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="post-title" className="block text-sm mb-2">
                    Post Title
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
                  <label htmlFor="post-slug" className="block text-sm mb-2">
                    URL Slug
                  </label>
                  <input
                    id="post-slug"
                    type="text"
                    value={slug}
                    onChange={(event) => {
                      setIsSlugEdited(true);
                      setSlug(slugify(event.target.value));
                    }}
                    placeholder="example-best-homestay-in-sringeri"
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="post-h1" className="block text-sm mb-2">
                    H1
                  </label>
                  <input
                    id="post-h1"
                    type="text"
                    value={h1}
                    onChange={(event) => setH1(event.target.value)}
                    placeholder="Main heading shown on the post page"
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="md:col-span-2 text-sm text-muted-foreground">
                  URL Preview: {fullPreviewUrl || '-'}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="post-content" className="block text-sm mb-2">
                    Post Content
                  </label>
                  <textarea
                    id="post-content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    rows={6}
                    placeholder="Write your post here..."
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="post-images" className="block text-sm mb-2">
                    Post Images
                  </label>
                  <input
                    id="post-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Upload up to {MAX_POST_IMAGES} images. First image is used as OG image when OG Image URL is empty.
                  </p>
                  {imageErrorMessage && <p className="mt-2 text-red-600 text-sm">{imageErrorMessage}</p>}

                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.map((image, index) => (
                        <div key={`${index}-${image.slice(0, 24)}`} className="relative rounded-lg overflow-hidden border border-border">
                          <img src={image} alt={`Post image ${index + 1}`} className="h-28 w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 inline-flex items-center justify-center h-7 w-7 rounded-full bg-black/60 text-white hover:bg-black/75"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-border p-4 md:p-5 space-y-4">
                <h3 className="text-xl text-primary">SEO Metadata</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="seo-title" className="block text-sm mb-2">
                      SEO Title
                    </label>
                    <input
                      id="seo-title"
                      type="text"
                      value={seoTitle}
                      onChange={(event) => setSeoTitle(event.target.value)}
                      placeholder="Meta title for search engines"
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="focus-keyword" className="block text-sm mb-2">
                      Focus Keyword
                    </label>
                    <input
                      id="focus-keyword"
                      type="text"
                      value={focusKeyword}
                      onChange={(event) => setFocusKeyword(event.target.value)}
                      placeholder="Example: homestay in sringeri"
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="meta-description" className="block text-sm mb-2">
                      Meta Description
                    </label>
                    <textarea
                      id="meta-description"
                      value={metaDescription}
                      onChange={(event) => setMetaDescription(event.target.value)}
                      rows={3}
                      placeholder="Keep this around 150-160 characters"
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="canonical-url" className="block text-sm mb-2">
                      Canonical URL
                    </label>
                    <input
                      id="canonical-url"
                      type="text"
                      value={canonicalUrl}
                      onChange={(event) => setCanonicalUrl(event.target.value)}
                      placeholder="/posts/your-slug or full absolute URL"
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border p-4 md:p-5 space-y-4">
                <h3 className="text-xl text-primary">Open Graph and Indexing</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="og-title" className="block text-sm mb-2">
                      OG Title
                    </label>
                    <input
                      id="og-title"
                      type="text"
                      value={ogTitle}
                      onChange={(event) => setOgTitle(event.target.value)}
                      placeholder="Title for social sharing"
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="og-image" className="block text-sm mb-2">
                      OG Image URL
                    </label>
                    <input
                      id="og-image"
                      type="url"
                      value={ogImage}
                      onChange={(event) => setOgImage(event.target.value)}
                      placeholder="https://example.com/post-cover.jpg"
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="og-description" className="block text-sm mb-2">
                      OG Description
                    </label>
                    <textarea
                      id="og-description"
                      value={ogDescription}
                      onChange={(event) => setOgDescription(event.target.value)}
                      rows={3}
                      placeholder="Description for social cards"
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="schema-type" className="block text-sm mb-2">
                      Schema Type
                    </label>
                    <select
                      id="schema-type"
                      value={schemaType}
                      onChange={(event) => setSchemaType(event.target.value as 'Article' | 'BlogPosting')}
                      className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="Article">Article</option>
                      <option value="BlogPosting">BlogPosting</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-3 mt-8">
                    <input
                      type="checkbox"
                      checked={noindex}
                      onChange={(event) => setNoindex(event.target.checked)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">Noindex this post</span>
                  </label>
                </div>
              </div>

              {postErrorMessage && <p className="text-red-600 text-sm">{postErrorMessage}</p>}

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                Publish Post
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

                <p className="text-sm text-muted-foreground mb-1">URL: /posts/{post.seo.slug}</p>
                <p className="text-sm text-muted-foreground mb-4">SEO Title: {post.seo.seoTitle}</p>

                {post.images.length > 0 && (
                  <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {post.images.map((image, imageIndex) => (
                      <img
                        key={`${post.id}-image-${imageIndex}`}
                        src={image}
                        alt={`${post.title} image ${imageIndex + 1}`}
                        className="h-24 w-full object-cover rounded-lg border border-border"
                      />
                    ))}
                  </div>
                )}

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
