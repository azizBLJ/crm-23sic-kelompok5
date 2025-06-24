import React, { useState } from 'react';
import { Calendar, Users, MapPin, Phone, Mail, Star, Wifi, Car, Coffee, Utensils, ChevronDown, ChevronUp, X, Check, ArrowLeft, CreditCard, User, LogOut } from 'lucide-react';

const UserBookingPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const user = {
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    membership: 'Gold Member'
  };

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      price: 850000,
      originalPrice: 1000000,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&h=300&fit=crop',
      size: '35 m²',
      bed: 'King Bed',
      capacity: 2,
      amenities: ['Free WiFi', 'Air Conditioning', 'Mini Bar', 'Room Service'],
      description: 'Spacious deluxe room with modern amenities and city view.',
      discount: 15
    },
    {
      id: 2,
      name: 'Executive Suite',
      price: 1500000,
      originalPrice: 1800000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop',
      size: '55 m²',
      bed: 'King Bed + Sofa',
      capacity: 3,
      amenities: ['Free WiFi', 'Living Area', 'Premium Mini Bar', 'Butler Service'],
      description: 'Luxurious suite with separate living area and premium amenities.',
      discount: 17
    },
    {
      id: 3,
      name: 'Presidential Suite',
      price: 2500000,
      originalPrice: 3000000,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&h=300&fit=crop',
      size: '85 m²',
      bed: 'King Bed + Queen Bed',
      capacity: 4,
      amenities: ['Free WiFi', 'Private Balcony', 'Jacuzzi', 'Personal Concierge'],
      description: 'Ultimate luxury with panoramic views and exclusive services.',
      discount: 20
    },
    {
      id: 4,
      name: 'Family Room',
      price: 1200000,
      originalPrice: 1400000,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=300&fit=crop',
      size: '45 m²',
      bed: '2 Queen Beds',
      capacity: 4,
      amenities: ['Free WiFi', 'Connecting Rooms', 'Kids Corner', 'Family Package'],
      description: 'Perfect for families with connecting rooms and child-friendly amenities.',
      discount: 12
    }
  ];

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = calculateNights();
    const subtotal = selectedRoom.price * nights;
    const tax = subtotal * 0.1; // 10% tax
    return subtotal + tax;
  };

  const handleBooking = () => {
    if (currentStep === 1) {
      if (!selectedRoom || !checkIn || !checkOut) {
        alert('Please select room and dates');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else {
      alert('Booking confirmed! Thank you for choosing Hotel Mutiara Merdeka.');
    }
  };

  const resetBooking = () => {
    setCurrentStep(1);
    setSelectedRoom(null);
    setCheckIn('');
    setCheckOut('');
    setGuests({ adults: 2, children: 0 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                currentStep >= step 
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentStep === 1 && 'Select Room & Dates'}
            {currentStep === 2 && 'Guest Information'}
            {currentStep === 3 && 'Payment & Confirmation'}
          </h2>
        </div>
      </div>

      {/* Step 1: Room Selection */}
      {currentStep === 1 && (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          {/* Date Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Select Your Stay</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <button
                  onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent flex items-center justify-between"
                >
                  <span>{guests.adults + guests.children} Guest{guests.adults + guests.children > 1 ? 's' : ''}</span>
                  {showGuestDropdown ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {showGuestDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span>Adults</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{guests.adults}</span>
                        <button
                          onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Children</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{guests.children}</span>
                        <button
                          onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-end">
                <button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-3 rounded-lg font-medium transition-all duration-200">
                  Search Rooms
                </button>
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  selectedRoom?.id === room.id 
                    ? 'ring-4 ring-amber-400 transform scale-105' 
                    : 'hover:shadow-xl hover:transform hover:scale-105'
                }`}
              >
                <div className="relative">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-48 object-cover"
                  />
                  {room.discount && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{room.discount}%
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                    <div className="text-right">
                      {room.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          Rp {room.originalPrice.toLocaleString('id-ID')}
                        </p>
                      )}
                      <p className="text-2xl font-bold text-amber-600">
                        Rp {room.price.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm text-gray-600">per night</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Size: {room.size}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Bed: {room.bed}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Max {room.capacity} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="text-sm text-gray-600">Luxury</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                      selectedRoom?.id === room.id
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white'
                    }`}
                  >
                    {selectedRoom?.id === room.id ? 'Selected' : 'Select Room'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Guest Information */}
      {currentStep === 2 && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Guest Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Any special requests or requirements..."
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Payment */}
      {currentStep === 3 && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter cardholder name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Summary - Sticky */}
      {selectedRoom && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 p-4 z-40">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{selectedRoom.name}</h4>
                  <p className="text-sm text-gray-600">
                    {checkIn && checkOut ? `${calculateNights()} nights` : 'Select dates'}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-600">
                  Rp {calculateTotal().toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-gray-600">Total (incl. tax)</p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={resetBooking}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Reset
                </button>
                <button
                  onClick={handleBooking}
                  className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-lg font-medium transition-all duration-200"
                >
                  {currentStep === 1 && 'Continue'}
                  {currentStep === 2 && 'Proceed to Payment'}
                  {currentStep === 3 && 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Spacing */}
      <div className="h-24"></div>
    </div>
  );
};

export default UserBookingPage;