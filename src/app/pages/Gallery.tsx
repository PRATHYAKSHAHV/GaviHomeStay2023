import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import gaviAbout from '../../images/GaVi-About.jpg';
import gaviHero from '../../images/GaVi-Hero.jpg';
import gaviBackShot from '../../images/GaVi-Homestay-back_shot.jpg';
import gaviBalconySwinger from '../../images/GaVi-Homestay-Balcony-swinger.jpg';
import gaviBalcony from '../../images/GaVi-Homestay-balcony.jpg';
import gaviBalcony1 from '../../images/GaVi-Homestay-Balcony1.jpg';
import gaviBalcony2 from '../../images/GaVi-Homestay-balcony2.jpg';
import gaviBalcony3 from '../../images/GaVi-Homestay-balcony3.jpg';
import gaviCarParking from '../../images/GaVi-Homestay-Car-parking.jpg';
import gaviDinnerSet from '../../images/GaVi-Homestay-Dinnerset.jpg';
import gaviDoemetryWashroom from '../../images/GaVi-Homestay-doemetry-washroom.jpg';
import gaviDoemetry from '../../images/GaVi-Homestay-Doemetry.jpg';
import gaviDoemetry1 from '../../images/GaVi-Homestay-Doemetry1.jpg';
import gaviFortuner from '../../images/GaVi-Homestay-fortuner.jpg';
import gaviLongShot from '../../images/GaVi-Homestay-long_shot.jpg';
import gaviOutsideView from '../../images/GaVi-Homestay-outsideview.jpg';
import gaviRiverPlay from '../../images/GaVi-Homestay-RiverPlay.jpg';
import gaviRiverPlay1 from '../../images/GaVi-Homestay-Riverplay1.jpg';
import gaviRiverWithSand from '../../images/GaVi-Homestay-RiverwithSand.jpg';
import gaviRiverPlay2 from '../../images/GaVi-Homestay-river_play2.jpg';
import gaviRiverPlay3 from '../../images/GaVi-Homestay-river_play3.jpg';
import gaviRoom1 from '../../images/GaVi-Homestay-Room1.jpg';
import gaviRoom1Washroom from '../../images/GaVi-Homestay-room1_washroom.jpg';
import gaviRoom2 from '../../images/GaVi-Homestay-Room2.jpg';
import gaviRoomWashroom from '../../images/GaVi-Homestay-Room_washroom.jpg';
import gaviSunset from '../../images/GaVi-Homestay-Sunset.jpg';
import gaviTrekkingPoint from '../../images/GaVi-Homestay-TrekkingPoint.jpg';
import gaviUrbania from '../../images/GaVi-Homestay-urbania.jpg';
import ghHero from '../../images/GH-Hero.jpg';

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    { url: gaviHero, category: 'Exterior', title: 'GaVi Homestay Hero View' },
    // { url: ghHero, category: 'Exterior', title: 'Homestay Exterior View' },
    { url: gaviAbout, category: 'Exterior', title: 'About Homestay View' },
    { url: gaviBackShot, category: 'Exterior', title: 'Back Side View' },
    { url: gaviLongShot, category: 'Exterior', title: 'Long Shot View' },
    { url: gaviOutsideView, category: 'Exterior', title: 'Outside View' },
    { url: gaviBalcony, category: 'Exterior', title: 'Balcony View' },
    { url: gaviBalcony1, category: 'Exterior', title: 'Balcony Seating' },
    { url: gaviBalcony2, category: 'Exterior', title: 'Balcony Corner View' },
    { url: gaviBalcony3, category: 'Exterior', title: 'Balcony Landscape View' },
    { url: gaviBalconySwinger, category: 'Exterior', title: 'Balcony Swing' },
    { url: gaviRoom1, category: 'Rooms', title: 'Room Interior 1' },
    { url: gaviRoom2, category: 'Rooms', title: 'Room Interior 2' },
    { url: gaviDoemetry, category: 'Rooms', title: 'Dormitory Room' },
    { url: gaviDoemetry1, category: 'Rooms', title: 'Dormitory View 2' },
    { url: gaviRoom1Washroom, category: 'Rooms', title: 'Room 1 Washroom' },
    { url: gaviRoomWashroom, category: 'Rooms', title: 'Room Washroom' },
    { url: gaviDoemetryWashroom, category: 'Rooms', title: 'Dormitory Washroom' },
    { url: gaviDinnerSet, category: 'Food', title: 'Dining Setup' },
    { url: gaviRiverPlay, category: 'Activities', title: 'River Play 1' },
    { url: gaviRiverPlay1, category: 'Activities', title: 'River Play 2' },
    { url: gaviRiverPlay2, category: 'Activities', title: 'River Play 3' },
    { url: gaviRiverPlay3, category: 'Activities', title: 'River Play 4' },
    { url: gaviTrekkingPoint, category: 'Activities', title: 'Trekking Point' },
    { url: gaviRiverWithSand, category: 'Nature', title: 'River and Sand View' },
    { url: gaviSunset, category: 'Nature', title: 'Sunset View' },
    { url: gaviCarParking, category: 'Facilities', title: 'Car Parking Area' },
    { url: gaviFortuner, category: 'Facilities', title: '4x4 Vehicle Parking' },
    { url: gaviUrbania, category: 'Facilities', title: 'Urbania Parking' },
  ];

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

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
            <h1 className="text-4xl lg:text-5xl mb-4">Our Gallery</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore the beauty and comfort that awaits you at GaVi Homestay
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white sticky top-16 md:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Masonry columnsCount={window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3} gutter="1.5rem">
            {filteredImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all"
                onClick={() => setSelectedImage(image.url)}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-primary/80 rounded-full text-xs mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-lg font-medium">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Full size"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
