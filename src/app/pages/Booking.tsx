import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router';
import {
  Calendar as CalendarIcon,
  Users,
  Home,
  Check,
  ChevronRight,
  MessageCircle,
  Phone,
  Mail,
  User,
  CreditCard,
} from 'lucide-react';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format } from 'date-fns';
import gaviRoom1Image from '../../images/GaVi-Homestay-Room1.jpg';
import gaviRoom2Image from '../../images/GaVi-Homestay-Room2.jpg';
import gaviDoemetryImage from '../../images/GaVi-Homestay-Doemetry.jpg';
import gaviRoom1WashroomImage from '../../images/GaVi-Homestay-room1_washroom.jpg';
import gaviRoom2WashroomImage from '../../images/GaVi-Homestay-Room_washroom.jpg';
import gaviDoemetry1Image from '../../images/GaVi-Homestay-Doemetry1.jpg';
import gaviTrekkingImage from '../../images/GaVi-Trekking.jpg';
import gavi4x4Image from '../../images/GaVi-4x4.jpg';
import gaviRiverViewImage from '../../images/GaVi-RiverView.jpg';
import gaviComfortPkgImage from '../../images/GaVi-Comfortpkg.jpg';
import gaviAdventurePkgImage from '../../images/GaVi-AdventurePkg.jpg';
import gaviAdvTrekPkgImage from '../../images/GaVi-Adv+TrekPkg.png';

export function Booking() {
  const location = useLocation();
  const preSelectedRoom = location.state?.selectedRoom;
  const preSelectedRoomId = location.state?.selectedRoomId;

  const [step, setStep] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);

  const [guestDetails, setGuestDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    specialRequests: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [expandedDetailsId, setExpandedDetailsId] = useState<number | null>(null);

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Couple Room',
      price: 2500,
      maxGuests: 3,
      image: gaviRoom1Image,
      pricingType: 'night',
      includes: ['Queen bed', 'Attached bathroom', 'Balcony view', 'Free WiFi'],
      gallery: [gaviRoom1Image, gaviRoom1WashroomImage],
    },
    {
      id: 2,
      name: 'Family Deluxe Room',
      price: 3500,
      maxGuests: 5,
      image: gaviRoom2Image,
      pricingType: 'night',
      includes: ['Two queen beds', 'Attached bathroom', 'Balcony view', 'Free WiFi'],
      gallery: [gaviRoom2Image, gaviRoom2WashroomImage],
    },
    {
      id: 3,
      name: 'Group Deluxe Room',
      price: 5000,
      maxGuests: 7,
      image: gaviDoemetryImage,
      pricingType: 'night',
      includes: ['3 queen beds + 1 single bed', '2 attached bathrooms', 'Mountain view', 'Free WiFi'],
      gallery: [gaviDoemetryImage, gaviDoemetry1Image],
    },
    {
      id: 4,
      name: 'Comfort Family Package',
      price: 1800,
      maxGuests: 2,
      image: gaviComfortPkgImage,
      pricingType: 'person',
      includes: ['Stay package', 'Comfort meals', 'Relaxed local experience'],
      gallery: [gaviComfortPkgImage, gaviRiverViewImage],
    },
    {
      id: 5,
      name: 'Riverside Adeventure Package',
      price: 2100,
      maxGuests: 3,
      image: gaviAdventurePkgImage,
      pricingType: 'person',
      includes: ['Adventure activities', 'Guided outdoor experience', 'Local sightseeing'],
      gallery: [gaviAdventurePkgImage, gavi4x4Image],
    },
    {
      id: 6,
      name: 'Trekking + Adventure Package',
      price: 2600,
      maxGuests: 4,
      image: gaviAdvTrekPkgImage,
      pricingType: 'person',
      includes: ['Trekking + adventure combo', 'Outdoor activity support', 'Nature trail access'],
      gallery: [gaviAdvTrekPkgImage, gaviTrekkingImage],
    },
  ];

  const resolvedPreSelectedRoom =
    preSelectedRoom ?? rooms.find((room) => room.id === preSelectedRoomId) ?? null;
  const [selectedRoom, setSelectedRoom] = useState<any>(resolvedPreSelectedRoom);
  const [showRoomSelection, setShowRoomSelection] = useState(!resolvedPreSelectedRoom);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    if (selectedRoom.pricingType === 'person') {
      return selectedRoom.price * guests;
    }
    return selectedRoom.price * calculateNights();
  };

  const handleCheckAvailability = () => {
    if (checkIn && checkOut && guests) {
      setShowRoomSelection(true);
      setStep(2);
    }
  };

  const handleRoomSelect = (room: any) => {
    setSelectedRoom(room);
    setStep(3);
  };

  const handleGuestDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGuestDetails({
      ...guestDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setStep(4);
  };

  const whatsappBooking = () => {
    const message = `Hello! I would like to book:
    
Room: ${selectedRoom?.name}
Check-in: ${checkIn ? format(checkIn, 'PPP') : ''}
Check-out: ${checkOut ? format(checkOut, 'PPP') : ''}
Guests: ${guests}
Total: Rs ${calculateTotal().toLocaleString()}

Name: ${guestDetails.name}
Phone: ${guestDetails.phone}
Email: ${guestDetails.email}`;

    const whatsappUrl = `https://wa.me/917483859167?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-secondary to-white pb-20 lg:pb-8">
      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl lg:text-5xl mb-3">Book Your Stay</h1>
            <p className="text-lg text-white/90">
              Simple and easy booking process for your perfect getaway
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Dates & Guests' },
              { num: 2, label: 'Select Room' },
              { num: 3, label: 'Your Details' },
              { num: 4, label: 'Confirmation' },
            ].map((item, index) => (
              <div key={item.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      step >= item.num
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > item.num ? <Check className="w-5 h-5" /> : item.num}
                  </div>
                  <span className="text-xs mt-2 text-center hidden sm:block">
                    {item.label}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step > item.num ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Date and Guest Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg"
                >
                  <h2 className="text-2xl lg:text-3xl mb-6">Select Dates & Guests</h2>

                  <div className="space-y-6">
                    {/* Check-in Date */}
                    <div>
                      <label className="block text-sm mb-2">Check-in Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="w-full px-4 py-3 bg-input-background rounded-lg border border-border text-left flex items-center justify-between hover:border-primary transition-colors">
                            <span className={!checkIn ? 'text-muted-foreground' : ''}>
                              {checkIn ? format(checkIn, 'PPP') : 'Select check-in date'}
                            </span>
                            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Check-out Date */}
                    <div>
                      <label className="block text-sm mb-2">Check-out Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="w-full px-4 py-3 bg-input-background rounded-lg border border-border text-left flex items-center justify-between hover:border-primary transition-colors">
                            <span className={!checkOut ? 'text-muted-foreground' : ''}>
                              {checkOut ? format(checkOut, 'PPP') : 'Select check-out date'}
                            </span>
                            <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            disabled={(date) => !checkIn || date <= checkIn}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Number of Guests */}
                    <div>
                      <label className="block text-sm mb-2">Number of Guests</label>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-12 h-12 bg-input-background rounded-lg border border-border hover:bg-primary hover:text-white transition-colors"
                        >
                          -
                        </button>
                        <div className="flex-1 px-4 py-3 bg-input-background rounded-lg border border-border text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Users className="w-5 h-5 text-muted-foreground" />
                            <span className="text-lg">{guests}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setGuests(Math.min(10, guests + 1))}
                          className="w-12 h-12 bg-input-background rounded-lg border border-border hover:bg-primary hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckAvailability}
                      disabled={!checkIn || !checkOut}
                      className="w-full py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <span>Check Availability</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Room Selection */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg"
                >
                  <h2 className="text-2xl lg:text-3xl mb-6">Select Your Room</h2>
                  
                  <div className="space-y-4">
                    {rooms
                      .filter((room) => room.maxGuests >= guests)
                      .map((room) => (
                        <div key={room.id}>
                        <div
                          onClick={() => handleRoomSelect(room)}
                          className="flex items-center space-x-4 p-4 border-2 border-border rounded-xl hover:border-primary transition-colors cursor-pointer"
                        >
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-medium mb-1">{room.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Max {room.maxGuests} guests
                            </p>
                            <p className="text-xl text-primary">
                              ₹{room.price.toLocaleString()}/{room.pricingType === 'person' ? 'person' : 'night'}
                            </p>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                setExpandedDetailsId((prev) => (prev === room.id ? null : room.id));
                              }}
                              className="mt-2 text-sm text-primary hover:underline"
                            >
                              {expandedDetailsId === room.id ? 'Hide Details' : 'View Details'}
                            </button>
                          </div>
                          <ChevronRight className="w-6 h-6 text-muted-foreground" />
                        </div>
                        {expandedDetailsId === room.id && (
                          <div className="mt-2 mb-4 p-4 bg-secondary rounded-xl border border-border">
                            <p className="text-sm font-medium mb-2">What is included</p>
                            <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                              {room.includes.map((item: string) => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                            <p className="text-sm font-medium mb-2">More photos</p>
                            <div className="grid grid-cols-2 gap-2">
                              {room.gallery.map((photo: string, idx: number) => (
                                <img
                                  key={`${room.id}-${idx}`}
                                  src={photo}
                                  alt={`${room.name} detail ${idx + 1}`}
                                  className="w-full h-28 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full mt-6 py-3 border-2 border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    Back to Dates
                  </button>
                </motion.div>
              )}

              {/* Step 3: Guest Details */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg"
                >
                  <h2 className="text-2xl lg:text-3xl mb-6">Your Details</h2>

                  <form onSubmit={handleConfirmBooking} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={guestDetails.name}
                        onChange={handleGuestDetailsChange}
                        required
                        className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={guestDetails.email}
                        onChange={handleGuestDetailsChange}
                        required
                        className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={guestDetails.phone}
                        onChange={handleGuestDetailsChange}
                        required
                        className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="+91 74838 59167"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={guestDetails.address}
                        onChange={handleGuestDetailsChange}
                        className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Your address"
                      />
                    </div>

                    <div>
                      <label htmlFor="specialRequests" className="block text-sm mb-2">
                        Special Requests
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={guestDetails.specialRequests}
                        onChange={handleGuestDetailsChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Any special requests or requirements..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 py-3 border-2 border-border rounded-lg hover:bg-secondary transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && bookingConfirmed && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg text-center"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-primary" />
                  </div>

                  <h2 className="text-2xl lg:text-3xl mb-4">Booking Received!</h2>
                  <p className="text-muted-foreground mb-8">
                    Thank you for choosing GaVi Homestay. We have received your booking request and will contact you shortly to confirm.
                  </p>

                  <div className="bg-secondary p-6 rounded-xl mb-8 text-left">
                    <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Room:</span>
                        <span className="font-medium">{selectedRoom?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-in:</span>
                        <span className="font-medium">
                          {checkIn ? format(checkIn, 'PPP') : ''}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-out:</span>
                        <span className="font-medium">
                          {checkOut ? format(checkOut, 'PPP') : ''}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Guests:</span>
                        <span className="font-medium">{guests}</span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between">
                        <span className="text-muted-foreground">Total Amount:</span>
                        <span className="text-xl text-primary font-medium">
                          ₹{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={whatsappBooking}
                      className="w-full flex items-center justify-center space-x-2 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20ba5a] transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Complete Booking via WhatsApp</span>
                    </button>

                    <a
                      href="tel:+917483859167"
                      className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Us</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
              <h3 className="text-xl mb-6">Booking Summary</h3>

              {selectedRoom ? (
                <div className="space-y-6">
                  <div>
                    <img
                      src={selectedRoom.image}
                      alt={selectedRoom.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-medium mb-1">{selectedRoom.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Max {selectedRoom.maxGuests} guests
                    </p>
                  </div>

                  {checkIn && checkOut && (
                    <div className="space-y-3 text-sm border-t border-border pt-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-in:</span>
                        <span>{format(checkIn, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Check-out:</span>
                        <span>{format(checkOut, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nights:</span>
                        <span>{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Guests:</span>
                        <span>{guests}</span>
                      </div>
                    </div>
                  )}

                  {(selectedRoom.pricingType === 'person' || calculateNights() > 0) && (
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-muted-foreground">
                          {selectedRoom.pricingType === 'person'
                            ? `₹${selectedRoom.price.toLocaleString()} × ${guests} guests`
                            : `₹${selectedRoom.price.toLocaleString()} × ${calculateNights()} nights`}
                        </span>
                        <span>₹{calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-medium">
                        <span>Total</span>
                        <span className="text-primary">₹{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Home className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Select dates and room to see booking summary
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <p className="text-sm text-muted-foreground">Need help with booking?</p>
                <a
                  href="https://wa.me/917483859167"
                  className="flex items-center justify-center space-x-2 w-full py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20ba5a] transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href="tel:+917483859167"
                  className="flex items-center justify-center space-x-2 w-full py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

