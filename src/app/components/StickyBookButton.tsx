import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function StickyBookButton() {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show on booking page
  if (location.pathname === '/booking') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className="bg-gradient-to-r from-primary to-accent border-t border-white/20 shadow-2xl p-4">
            <Link
              to="/booking"
              className="flex items-center justify-center space-x-2 w-full py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Book Your Stay Now</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}