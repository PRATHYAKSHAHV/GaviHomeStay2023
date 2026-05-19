import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Wifi,
  Coffee,
  Car,
  UtensilsCrossed,
  Mountain,
  Waves,
  TreePine,
  Star,
  ChevronRight,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import gaviHeroImage from '../../images/GaVi-Hero.jpg';
import gaviAboutImage from '../../images/GaVi-About.jpg';
// import ghHeroImage from '../../images/GH-Hero.jpg';
import gaviTrekkingImage from '../../images/GaVi-Trekking.jpg';
import gavi4x4Image from '../../images/GaVi-4x4.jpg';
import gaviDinnerSetImage from '../../images/GaVi-Homestay-Dinnerset.jpg';
import gaviFireCampImage from '../../images/GaVi-FireCamp.jpg';
import gaviLongShotImage from '../../images/GaVi-Homestay-long_shot.jpg';
import gaviOutdoorImage from '../../images/GaVi-Outdoor.jpg';
import gaviRiverViewImage from '../../images/GaVi-RiverView.jpg';
import gaviTrekkingPointImage from '../../images/GaVi-Homestay-TrekkingPoint.jpg';
import gaviRoom1Image from '../../images/GaVi-Homestay-Room1.jpg';
import gaviRoom2Image from '../../images/GaVi-Homestay-Room2.jpg';
import gaviDoemetryImage from '../../images/GaVi-Homestay-Doemetry.jpg';

export function Home() {
  useEffect(() => {
    const pageTitle = 'Best Homestay in Sringeri, Chikkamagaluru | GaVi Homestay';
    const pageDescription =
      'Stay at GaVi Homestay, the best homestay in Sringeri, Chikkamagaluru, near the Thunga River. Enjoy comfortable rooms, home-cooked food, and scenic nature experiences.';
    const pageKeywords =
      'best homestay in sringeri, homestay in chikkamagaluru, gavi homestay, stay near thunga river, family homestay sringeri';
    const canonicalUrl = `${window.location.origin}/`;

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

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-cta');
    bookingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Wifi className="w-6 h-6" />,
      title: 'Free WiFi',
      description: 'High-speed internet',
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: 'Complimentary Breakfast',
      description: 'Traditional South Indian',
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: 'Free Parking',
      description: 'Secure parking space',
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6" />,
      title: 'Home-cooked Meals',
      description: 'Fresh local cuisine',
    },
    {
      icon: <Mountain className="w-6 h-6" />,
      title: 'Mountain Views',
      description: 'Scenic surroundings',
    },
    {
      icon: <Waves className="w-6 h-6" />,
      title: 'Near River',
      description: 'Thunga River nearby',
    },
  ];

  const experiences = [
    {
      image: gaviTrekkingImage,
      title: 'Jeep ride with Trekking',
      description: 'Explore nearby hill',
    },
    {
      image: gavi4x4Image,
      title: '4x4 Ride to Thunga', 
      description: 'Thrilling trail to riverside.'
    },
    {
      image: gaviDinnerSetImage,
      title: 'Starlit Open-Air Dinner',
      description: 'Dine beneath sparkling stars.',
    },
    {
      image: gaviFireCampImage,
      title: 'Bonfire Nights',
      description: 'Enjoy cozy evenings under the stars',
    },
    {
      image: gaviLongShotImage,
      title: 'Plantation Tours',
      description: 'Discover Chikkamagaluru greenery',
    },
    {
      image: gaviOutdoorImage,
      title: 'Indoor & Outdoor Activities',
      description: 'Fun experiences for everyone.',
    },
    
  ];

  const rooms = [
    {
      image: gaviRoom1Image,
      name: 'Deluxe Room',
      price: '₹2,500',
      guests: '2 Guests',
      amenities: ['Queen Bed', 'WiFi', 'Balcony', 'Garden View'],
    },
    {
      image: gaviRoom2Image,
      name: 'Family Deluxe Room',
      price: '₹3,500',
      guests: '4 Guests',
      amenities: ['2 Queen Beds', 'WiFi', 'Balcony','Garden View'],
    },
    {
      image: gaviDoemetryImage,
      name: 'Group Deluxe Room',
      price: '₹5,000',
      guests: '7 Guests',
      amenities: ['3 Queen Beds', 'Single Bed', 'WiFi', 'Mountain View'],
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Bangalore',
      rating: 5,
      text: 'Wonderful stay! The homestay is beautifully located near the Thunga River. The hosts were very warm and welcoming. Highly recommended for families.',
    },
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'Best homestay experience in Sringeri! The food was delicious, rooms were clean and comfortable. Perfect for a peaceful weekend getaway.',
    },
    {
      name: 'Amit Patel',
      location: 'Pune',
      rating: 5,
      text: 'Amazing hospitality and beautiful surroundings. The nearby trekking spots are a bonus. Will definitely visit again!',
    },
  ];

  const galleryImages = [
    gaviHeroImage,
    gaviAboutImage,
    gaviRiverViewImage,
    gaviTrekkingPointImage,
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={gaviHeroImage}
            alt="GaVi Homestay in Sringeri"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          
          {/* Organic shapes overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-2 mb-4"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm lg:text-base">Sringeri, Chikkamagaluru, Karnataka</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl lg:text-6xl mb-4 lg:mb-6 leading-tight"
            >
              Best Homestay in Sringeri Near Thunga River
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base lg:text-xl mb-8 text-white/90 leading-relaxed"
            >
              Experience nature, comfort, and traditional hospitality in the heart of Chikkamagaluru. Your perfect getaway awaits!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToBooking}
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-base lg:text-lg font-medium"
              >
                Book Now
              </button>
              <a
                href="tel:+917483859167"
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-colors text-base lg:text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              {/* <a
                href="https://wa.me/917483859167"
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20ba5a] transition-colors text-base lg:text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-[#f4efe3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={gaviAboutImage}
                  alt="About GaVi Homestay"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <TreePine className="w-6 h-6 text-primary" />
                <span className="text-primary uppercase tracking-wider text-sm">About Us</span>
              </div>
              <h2 className="text-3xl lg:text-4xl mb-6">
                Welcome to GaVi Homestay
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Nestled near the serene Thunga River in Sringeri, Chikkamagaluru, GaVi Homestay offers a perfect blend of comfort and nature. Our homestay is designed to give you an authentic experience of Karnataka's hospitality.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you're looking for a peaceful retreat, an adventurous getaway, or a family vacation, we provide comfortable accommodations, delicious home-cooked meals, and a warm atmosphere that feels like home.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              >
                <span>Learn More About Us</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-16 lg:py-24 bg-[#e6eef8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Experiences & Activities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the beauty of Chikkamagaluru with our curated experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((experience, index) => (
              <Link
                key={index}
                to={`/posts?post=${encodeURIComponent(experience.title)}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl mb-2">{experience.title}</h3>
                    <p className="text-sm text-white/90">{experience.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Our Comfortable Rooms</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our well-appointed rooms designed for your comfort and relaxation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-56">
                  <ImageWithFallback
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl">{room.name}</h3>
                    <span className="text-2xl text-primary">{room.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{room.guests}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-secondary text-sm rounded-full text-foreground"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/booking"
                    className="block w-full py-3 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/rooms"
              className="inline-flex items-center space-x-2 px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              <span>View All Rooms</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl mb-4">What Our Guests Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read reviews from our happy guests who enjoyed their stay at GaVi Homestay
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl mb-4">Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get a glimpse of the beauty and comfort that awaits you
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/gallery"
              className="inline-flex items-center space-x-2 px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              <span>View Full Gallery</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="booking-cta" className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl mb-6">Ready to Experience Nature?</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Book your stay at GaVi Homestay and create unforgettable memories in the lap of nature. Limited rooms available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="px-8 py-4 bg-white text-primary rounded-lg hover:bg-white/90 transition-colors text-lg"
              >
                Book Your Stay Now
              </Link>
              <a
                href="tel:+917483859167"
                className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Call +91 74838 59167</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
