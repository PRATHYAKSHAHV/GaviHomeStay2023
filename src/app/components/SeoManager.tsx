import { useEffect } from 'react';
import { useLocation } from 'react-router';
import gaviHeroImage from '../../images/GaVi-Hero.jpg';
import { getPosts } from '../lib/postsStorage';

type SeoConfig = {
  title: string;
  description: string;
  keywords: string;
  path: string;
  noindex?: boolean;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schemaType?: 'Article' | 'BlogPosting';
  h1?: string;
  postTitle?: string;
  content?: string;
  createdAt?: string;
};

const SEO_MAP: Record<string, SeoConfig> = {
  '/': {
    title: 'Best Homestay in Sringeri, Chikkamagaluru | GaVi Homestay',
    description:
      'Stay at GaVi Homestay near Sringeri Sharada Peetham and Thunga River. Comfortable rooms, family packages, trekking, and warm hospitality in Chikkamagaluru.',
    keywords:
      'best homestay in sringeri, homestay near sringeri sharada peetham, homestay in chikkamagaluru, riverside homestay sringeri, family homestay sringeri',
    path: '/',
  },
  '/rooms': {
    title: 'Rooms at GaVi Homestay | Stay in Sringeri Near Thunga River',
    description:
      'Explore Deluxe Couple, Family Deluxe, and Group Deluxe rooms at GaVi Homestay in Sringeri. Clean rooms, attached bathrooms, balcony views, and WiFi.',
    keywords:
      'rooms in sringeri homestay, deluxe room sringeri, family room sringeri, group room sringeri, stay near thunga river',
    path: '/rooms',
  },
  '/gallery': {
    title: 'Photo Gallery | GaVi Homestay Sringeri',
    description:
      'View real photos of rooms, balconies, river activities, and scenic surroundings at GaVi Homestay in Sringeri, Chikkamagaluru.',
    keywords:
      'gavi homestay gallery, sringeri homestay photos, homestay near sharada peetham images, chikkamagaluru stay photos',
    path: '/gallery',
  },
  '/about': {
    title: 'About GaVi Homestay | Best Homestay in Sringeri',
    description:
      'Learn about GaVi Homestay, our hospitality, location near Sringeri Sharada Peetham, and why families choose us for peaceful stays in Chikkamagaluru.',
    keywords:
      'about gavi homestay, best homestay sringeri, homestay near sharada peetham, chikkamagaluru family stay',
    path: '/about',
  },
  '/contact': {
    title: 'Contact GaVi Homestay | Book Stay in Sringeri',
    description:
      'Contact GaVi Homestay for direct booking, room availability, and packages. Call or WhatsApp for quick response and travel assistance.',
    keywords:
      'contact gavi homestay, book homestay sringeri, homestay phone number sringeri, whatsapp booking homestay',
    path: '/contact',
  },
  '/booking': {
    title: 'Book GaVi Homestay Online | Rooms & Packages in Sringeri',
    description:
      'Book your stay at GaVi Homestay in Sringeri. Choose rooms and per-person packages with activity details, inclusions, and pricing.',
    keywords:
      'book homestay sringeri, sringeri room booking, homestay packages sringeri, chikkamagaluru stay booking',
    path: '/booking',
  },
  '/posts': {
    title: 'Travel Updates & Local Tips | GaVi Homestay Sringeri',
    description:
      'Read updates, travel tips, and local experiences from GaVi Homestay near Sringeri and Chikkamagaluru attractions.',
    keywords:
      'sringeri travel tips, homestay blog sringeri, places to visit near sringeri, chikkamagaluru itinerary',
    path: '/posts',
  },
  '/admin/posts': {
    title: 'Admin | GaVi Homestay',
    description: 'Admin area for GaVi Homestay posts management.',
    keywords: 'admin',
    path: '/admin/posts',
    noindex: true,
  },
};

const DEFAULT_SEO: SeoConfig = {
  title: 'GaVi Homestay Sringeri | Homestay Near Sharada Peetham',
  description:
    'GaVi Homestay in Sringeri offers comfortable rooms, local hospitality, and easy access to Sharada Peetham, Thunga River, and nearby attractions.',
  keywords:
    'homestay in sringeri, sringeri temple stay, chikkamagaluru homestay, river view homestay',
  path: '/',
};

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const applyMeta = async () => {
      const posts = await getPosts();
    const postSlugMatch = location.pathname.match(/^\/posts\/([a-z0-9-]+)$/);
    const matchedPost = postSlugMatch
      ? posts.find((post) => post.seo.slug === postSlugMatch[1])
      : undefined;

    const seo = matchedPost
      ? {
          title: matchedPost.seo.seoTitle,
          description: matchedPost.seo.metaDescription,
          keywords: matchedPost.seo.focusKeyword || 'gavi homestay post',
          path: `/posts/${matchedPost.seo.slug}`,
          noindex: matchedPost.seo.noindex,
          canonicalUrl: matchedPost.seo.canonicalUrl,
          ogTitle: matchedPost.seo.ogTitle,
          ogDescription: matchedPost.seo.ogDescription,
          ogImage: matchedPost.seo.ogImage,
          schemaType: matchedPost.seo.schemaType,
          h1: matchedPost.seo.h1,
          postTitle: matchedPost.title,
          content: matchedPost.content,
          createdAt: matchedPost.createdAt,
        }
      : SEO_MAP[location.pathname] ?? {
          title: 'Page Not Found | GaVi Homestay',
          description: 'The page you are looking for is not available.',
          keywords: 'gavi homestay',
          path: location.pathname,
          noindex: true,
        };

    const baseUrl = window.location.origin;
    const canonicalUrl = seo.canonicalUrl?.startsWith('http')
      ? seo.canonicalUrl
      : `${baseUrl}${seo.canonicalUrl || seo.path}`;
    const ogImage = seo.ogImage?.startsWith('http') || seo.ogImage?.startsWith('data:')
      ? seo.ogImage
      : seo.ogImage
        ? `${baseUrl}${seo.ogImage}`
        : `${baseUrl}${gaviHeroImage}`;

    document.title = seo.title;

    const upsertMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        if (property) tag.setAttribute('property', name);
        else tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const upsertCanonical = (href: string) => {
      let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    upsertMeta('description', seo.description);
    upsertMeta('keywords', seo.keywords);
    upsertMeta('robots', seo.noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('og:title', seo.ogTitle || seo.title, true);
    upsertMeta('og:description', seo.ogDescription || seo.description, true);
    upsertMeta('og:type', matchedPost ? 'article' : 'website', true);
    upsertMeta('og:url', canonicalUrl, true);
    upsertMeta('og:image', ogImage, true);
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', seo.ogTitle || seo.title);
    upsertMeta('twitter:description', seo.ogDescription || seo.description);
    upsertMeta('twitter:image', ogImage);
    upsertCanonical(canonicalUrl);

    const upsertSchema = (id: string, schema: Record<string, unknown>) => {
      let schemaTag = document.head.querySelector(`#${id}`) as HTMLScriptElement | null;
      if (!schemaTag) {
        schemaTag = document.createElement('script');
        schemaTag.id = id;
        schemaTag.type = 'application/ld+json';
        document.head.appendChild(schemaTag);
      }
      schemaTag.textContent = JSON.stringify(schema);
    };

    if (matchedPost && !seo.noindex) {
      const postSchema = {
        '@context': 'https://schema.org',
        '@type': seo.schemaType || 'Article',
        headline: seo.h1 || seo.postTitle,
        name: seo.postTitle,
        description: seo.description,
        datePublished: seo.createdAt,
        dateModified: seo.createdAt,
        image: ogImage,
        mainEntityOfPage: canonicalUrl,
        author: {
          '@type': 'Organization',
          name: 'GaVi Homestay',
        },
        publisher: {
          '@type': 'Organization',
          name: 'GaVi Homestay',
        },
      };
      upsertSchema('ld-post-schema', postSchema);
    }

    if (!matchedPost && !seo.noindex) {
      const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: 'GaVi Homestay',
        description: DEFAULT_SEO.description,
        image: ogImage,
        url: baseUrl,
        telephone: '+91-74838-59167',
        email: 'gavihomestay2023@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Bennegudde',
          addressLocality: 'Sringeri',
          addressRegion: 'Karnataka',
          postalCode: '577139',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '13.4260',
          longitude: '75.2529',
        },
      };
      upsertSchema('ld-local-business', localBusinessSchema);
    }
    };
    applyMeta();
  }, [location.pathname]);

  return null;
}
