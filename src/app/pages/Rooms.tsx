import { useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  Wifi,
  Tv,
  Wind,
  Coffee,
  Bath,
  Users,
  Bed,
  Mountain,
  Check,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import gaviRoom1Image from '../../images/GaVi-Homestay-Room1.jpg';
import gaviRoom2Image from '../../images/GaVi-Homestay-Room2.jpg';
import gaviDoemetryImage from '../../images/GaVi-Homestay-Doemetry.jpg';

export function Rooms() {
  useEffect(() => {
    const pageTitle = 'Best Homestay in Sringeri, Chikkamagaluru | Rooms at GaVi Homestay';
    const pageDescription =
      'Explore comfortable room options at GaVi Homestay, the best homestay in Sringeri, Chikkamagaluru, near the Thunga River.';
    const pageKeywords =
      'best homestay in sringeri, chikkamagaluru homestay rooms, gavi homestay rooms, stay in sringeri, homestay near thunga river';
    const canonicalUrl = `${window.location.origin}/rooms`;

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

  const rooms = [
    {
      id: 1,
      image: gaviRoom1Image,
      name: 'Deluxe Couple Room',
      price: 2500,
      size: '250 sq ft',
      guests: '2-3',
      beds: '1 Queen Bed',
      description: 'Spacious and comfortable room with stunning farm views. Perfect for couples or small families.',
      amenities: [
        { icon: <Wifi className="w-4 h-4" />, name: 'Free WiFi' },
        { icon: <Tv className="w-4 h-4" />, name: 'LED TV' },
        { icon: <Bath className="w-4 h-4" />, name: 'Attached Bathroom' },
        { icon: <Mountain className="w-4 h-4" />, name: 'River/Farm View' }, 
        { icon: <Mountain className="w-4 h-4" />, name: 'Balcony' },
      ],
      features: [
        'Daily Housekeeping',
        'Room Service',
        'Hot Water 24/7',
        'Toiletries',
      ],
    },
    {
      id: 2,
      image: gaviRoom2Image,
      name: 'Family Deluxe Room',
      price: 3500,
      size: '270 sq ft',
      guests: '4-5',
      beds: '2 Queen Size Beds',
      description: 'Ideal for families, this room offers two separate beds with a shared living area and balcony.       ',
      amenities: [
        { icon: <Wifi className="w-4 h-4" />, name: 'Free WiFi' },
        { icon: <Tv className="w-4 h-4" />, name: 'LED TV' },
        { icon: <Coffee className="w-4 h-4" />, name: 'Tea/Coffee' },
        { icon: <Bath className="w-4 h-4" />, name: 'Attached Bathroom' },
        { icon: <Mountain className="w-4 h-4" />, name: 'River/Farm View' }, 
        { icon: <Mountain className="w-4 h-4" />, name: 'Balcony' },
      ],
      features: [
        'Daily Housekeeping',
        'Room Service',
        'Hot Water 24/7',
      ],
    },
    {
      id: 3,
      image: gaviDoemetryImage,
      name: 'Group Deluxe Room',
      price: 5000,
      size: '400 sq ft',
      guests: '6-7',
      beds: '3 Queen Beds + 1 Single Bed',
      description: 'Deluxe room with mountain views, separate seating area, and private balcony.',
      amenities: [
        { icon: <Wifi className="w-4 h-4" />, name: 'Free WiFi' },
        { icon: <Tv className="w-4 h-4" />, name: 'Smart TV' },
        { icon: <Bath className="w-4 h-4" />, name: '2 attached Bathrooms' },
        { icon: <Mountain className="w-4 h-4" />, name: 'Mountain View' },
        { icon: <Mountain className="w-4 h-4" />, name: 'Balcony' },
      ],
      features: [
        'Daily Housekeeping',
        'Hot Water 24/7',
        'Toiletries',
      ],
    },    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary to-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl mb-4">Our Comfortable Rooms</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Choose from our range of well-appointed rooms designed for your comfort and relaxation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
              >
                {/* Room Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-lg font-bold text-primary">₹{room.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">/night</span>
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-6">
                  <h3 className="text-2xl mb-3">{room.name}</h3>
                  
                  {/* Room Info */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{room.guests}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{room.size}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Room Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="text-primary">{amenity.icon}</div>
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Included Services</h4>
                    <div className="space-y-2">
                      {room.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book Button */}
                  <Link
                    to="/booking"
                    state={{ selectedRoomId: room.id }}
                    className="block w-full py-3 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Book This Room
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl mb-6">Need Help Choosing?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our team is here to help you find the perfect room for your stay. Contact us for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+917483859167"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Call +91 74838 59167
              </a>
              <a
                href="https://wa.me/917483859167"
                className="px-8 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20ba5a] transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
