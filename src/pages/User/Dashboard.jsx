import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Star, Wifi, Car, Coffee, Utensils, Dumbbell, Waves, User, LogOut, Menu, X } from 'lucide-react';
import { supabase } from "../../Supabase";

const HotelDashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // const [rooms, setRooms] = useState([]);
  // const [topFacilities, setTopFacilities] = useState([]);

  //  useEffect(() => {
  //   const fetchRooms = async () => {
  //     const { data, error } = await supabase
  //       .from('kamar')
  //       .select('*')
  //       .eq('status_kamar', 'Aktif');

  //     if (data) setRooms(data);
  //     if (error) console.error('Gagal ambil kamar:', error);
  //   };

  //   const fetchFacilities = async () => {
  //     const { data, error } = await supabase
  //       .from('fasilitas')
  //       .select('*')
  //       .eq('status_fasilitas', 'Aktif')
  //       .order('nama_fasilitas', { ascending: true })
  //       .limit(5);

  //     if (data) setTopFacilities(data);
  //     if (error) console.error('Gagal ambil fasilitas:', error);
  //   };

  //   fetchRooms();
  //   fetchFacilities();
  //   }, []);


  // Sample data - akan diganti dengan data dari Supabase
  const heroImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop', title: 'Kolam Renang Infinity' },
    { id: 2, url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop', title: 'Restaurant Mewah' },
    { id: 3, url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop', title: 'Spa & Wellness Center' }
  ];

  const rooms = [
    { id: 1, name: 'Deluxe Room', price: 850000, image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=250&fit=crop' },
    { id: 2, name: 'Executive Suite', price: 1500000, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop' },
    { id: 3, name: 'Presidential Suite', price: 2500000, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=250&fit=crop' },
    { id: 4, name: 'Family Room', price: 1200000, image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=250&fit=crop' }
  ];

  const topFacilities = [
    { id: 1, name: 'Infinity Pool', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop' },
    { id: 2, name: 'Fine Dining', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop' },
    { id: 3, name: 'Spa & Wellness', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop' }
  ];



  // Auto slide for hero section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">


      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000">
              Hotel Mutiara Merdeka
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-200">
              "A man travels the world over in search of what he needs and returns home to find it."
            </p>
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-xl animate-in fade-in-50 slide-in-from-bottom-8 duration-1000 delay-400">
              Book Your Stay
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Luxury Rooms</h2>
          <p className="text-gray-600 text-lg">Experience comfort and elegance in every detail</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in-50 slide-in-from-bottom-4"
            >
              <div className="relative overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Price overlay on hover */}
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-2xl font-bold">Rp {room.price.toLocaleString('id-ID')}</p>
                  <p className="text-sm opacity-90">per night</p>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{room.name}</h3>
                <p className="text-gray-600 mb-4">Luxury accommodation with premium amenities</p>
                <button 
                  onClick={() => alert(`Booking ${room.name}`)}
                  className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Facilities */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Facilities</h2>
            <p className="text-gray-600 text-lg">World-class amenities for your perfect stay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topFacilities.map((facility, index) => (
              <div
                key={facility.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in-50 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{facility.name}</h3>
                    <p className="text-sm opacity-90">Premium experience awaits you</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 text-lg">Premium services and amenities for unforgettable experiences</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            { icon: Wifi, title: 'Free WiFi', desc: 'High-speed internet' },
            { icon: Car, title: 'Parking', desc: 'Complimentary valet' },
            { icon: Coffee, title: 'Room Service', desc: '24/7 availability' },
            { icon: Utensils, title: 'Fine Dining', desc: 'Gourmet restaurant' },
            { icon: Dumbbell, title: 'Fitness Center', desc: 'Modern equipment' },
            { icon: Waves, title: 'Swimming Pool', desc: 'Infinity pool' }
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center group animate-in fade-in-50 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    
    </div>
  );
};

export default HotelDashboard;