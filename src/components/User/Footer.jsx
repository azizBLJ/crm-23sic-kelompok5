import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Star, Wifi, Car, Coffee, Utensils, Dumbbell, Waves, User, LogOut, Menu, X } from 'lucide-react';
import { supabase } from "../../Supabase";

const Footer = () => {

  return (
    <footer >
        {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">MM</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Hotel Mutiara Merdeka</h3>
                  <p className="text-amber-400 text-sm">Luxury & Comfort</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Experience the pinnacle of luxury and comfort at Hotel Mutiara Merdeka. 
                Where every moment is crafted to perfection.
              </p>
              
              {/* Map Placeholder */}
              <div className="bg-gray-700 rounded-lg p-4 h-32 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Interactive Map</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h4>
              <ul className="space-y-2">
                {['Booking', 'FAQ', 'Fasilitas', 'Kamar', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-amber-400">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-gray-400">Jl. Merdeka No. 123, Bandung</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span className="text-gray-400">+62 22 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span className="text-gray-400">info@mutiaramerdeka.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Hotel Mutiara Merdeka. All rights reserved. | 
              <span className="text-amber-400"> Crafted with excellence</span>
            </p>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
