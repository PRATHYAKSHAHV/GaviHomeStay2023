import { Phone } from 'lucide-react';
import { motion } from 'motion/react';

export function CallButton() {
  const phoneNumber = '+917483859167';
  const callUrl = `tel:${phoneNumber}`;

  return (
    <motion.a
      href={callUrl}
      className="fixed bottom-40 lg:bottom-24 right-4 lg:right-8 z-50 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-colors group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Call us"
    >
      <Phone className="w-7 h-7" />

      <div className="absolute right-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Call us now
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900" />
      </div>
    </motion.a>
  );
}
