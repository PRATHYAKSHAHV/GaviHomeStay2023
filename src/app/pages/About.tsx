import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Heart,
  Users,
  Award,
  Leaf,
  TreePine,
  Mountain,
  Utensils,
  Home,
  ChevronRight,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import gaviAboutImage from '../../images/GaviFull.jpg';
import gaviRiverWithSand from '../../images/GaVi-Homestay-RiverwithSand.jpg';
import sringeriSharadaPeetamImage from '../../images/Sringeri_sharada_peetam.jpg';

export function About() {
  useEffect(() => {
    const pageTitle = 'About GaVi Homestay | Best Homestay in Sringeri, Chikkamagaluru';
    const pageDescription =
      'Learn about GaVi Homestay, the best homestay in Sringeri, Chikkamagaluru, known for warm hospitality, scenic views, and a peaceful stay near the Thunga River.';
    const pageKeywords =
      'best homestay in sringeri, about gavi homestay, chikkamagaluru homestay, stay near thunga river, family homestay in sringeri';
    const canonicalUrl = `${window.location.origin}/about`;

    document.title = pageTitle;

    const upsertMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
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

    upsertMeta('description', pageDescription);
    upsertMeta('keywords', pageKeywords);
    upsertMeta('og:title', pageTitle, true);
    upsertMeta('og:description', pageDescription, true);
    upsertMeta('og:type', 'website', true);
    upsertMeta('og:url', canonicalUrl, true);
    upsertCanonical(canonicalUrl);
  }, []);

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Warm Hospitality',
      description: 'We treat every guest like family, ensuring a comfortable and welcoming experience.',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Eco-Friendly',
      description: 'Committed to sustainable practices and preserving the natural beauty around us.',
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: 'Authentic Cuisine',
      description: 'Home-cooked traditional Karnataka meals made with love and fresh ingredients.',
    },
    {
      icon: <Mountain className="w-8 h-8" />,
      title: 'Nature Connection',
      description: 'Located in the lap of nature, offering a perfect escape from city life.',
    },
  ];

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      stat: '500+',
      label: 'Happy Guests',
    },
    {
      icon: <Award className="w-6 h-6" />,
      stat: '5 Star',
      label: 'Reviews',
    },
    {
      icon: <TreePine className="w-6 h-6" />,
      stat: '3+',
      label: 'Years Experience',
    },
    {
      icon: <Home className="w-6 h-6" />,
      stat: '100%',
      label: 'Satisfaction',
    },
  ];

  const team = [
    {
      name: 'Pratheek & Prathyaksha',
      role: 'Owners & Hosts',
      description: 'The wonderful couple behind GaVi Homestay, dedicated to providing the best hospitality.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary to-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary via-accent to-primary text-white overflow-hidden">
        {/* Nature-inspired decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
        </div>
        
        <div className="relative max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl mb-4">About GaVi Homestay</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Best homestay in Sringeri for a peaceful and memorable stay in Chikkamagaluru
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <TreePine className="w-6 h-6 text-primary" />
                <span className="text-primary uppercase tracking-wider text-sm">Our Story</span>
              </div>
              <h2 className="text-3xl lg:text-4xl mb-6">
                A Legacy of Hospitality
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  GaVi Homestay was founded to share the natural beauty and rich culture of Sringeri with travelers from around the world. Recognized by many guests as the best homestay in Sringeri, we are located near the pristine Thunga River in the coffee country of Chikkamagaluru, Karnataka.
                </p>
                <p>
                  What started as a small family home has grown into a beloved destination for nature lovers, peace seekers, and adventure enthusiasts. Our name "GaVi" represents the initials of our founders, Gayathri and Vijendra, who are dedicated to creating a warm and welcoming space for every guest.
                </p>
                <p>
                  Over the years, we have hosted families, couples, and solo travelers who leave with beautiful memories and a promise to return. Our commitment to sustainable tourism and preserving nature remains at the heart of everything we do.
                </p>
                <p>
                  We believe in simple living and genuine hospitality. From home-cooked traditional meals to personalized local recommendations, we ensure every guest feels part of our extended family.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={gaviAboutImage}
                  alt="GaVi Homestay"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={gaviRiverWithSand}
                  alt="Sringeri Nature"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                  {feature.icon}
                </div>
                <div className="text-3xl lg:text-4xl text-primary mb-2">{feature.stat}</div>
                <div className="text-muted-foreground">{feature.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What makes GaVi Homestay special and why guests love staying with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Meet Our Hosts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The warm and welcoming family behind GaVi Homestay
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                  <Users className="w-12 h-12" />
                </div>
                <h3 className="text-2xl mb-2">{member.name}</h3>
                <p className="text-primary mb-4">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl mb-6">
                Perfect Location in Sringeri
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  GaVi Homestay is strategically located near the famous Sringeri Sharada Peetham temple town, one of the four Advaita Vedanta maths established by Adi Shankaracharya. The homestay is nestled in the Western Ghats, surrounded by lush green forests and coffee plantations.
                </p>
                <p>
                  The serene Thunga River flows nearby, offering a peaceful atmosphere and beautiful views. The location provides easy access to several tourist attractions including:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span>Sringeri Sharada Peetham (12 km)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span>Sirimane Falls (25 km)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span>Kudremukh National Park (45 km)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span>Horanadu Annapoorneshwari Temple (50 km)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span>Agumbe (35 km)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span>Coffee Plantations & Trekking Trails</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={sringeriSharadaPeetamImage}
                  alt="Sringeri Location"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-6">Ready to Experience Our Hospitality?</h2>
            <p className="text-xl text-white/90 mb-8">
              Book your stay and become part of the GaVi family
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
              >
                Book Your Stay
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
