// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, LogOut, Menu, X
} from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Ambil data user dari localStorage saat pertama kali load
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // reload agar state header update
  };

  return (
    <header>
      <nav className="bg-orange-100 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">MM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Hotel Mutiara Merdeka</h1>
                <p className="text-xs text-amber-600">Luxury & Comfort</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Booking', 'FAQ', 'Fasilitas', 'Kamar', 'About', 'Contact', 'Klasifikasi'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-amber-50"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4 relative">
              {!user ? (
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Login
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 bg-amber-50 hover:bg-amber-100 rounded-full p-2 transition-colors duration-200"
                  >
                    <img
                      src={user.foto}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-800">{user.nama}</p>
                      <p className="text-xs text-amber-600">{user.status}</p>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-in slide-in-from-top-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-amber-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t animate-in slide-in-from-top-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Booking', 'FAQ', 'Fasilitas', 'Kamar', 'About', 'Contact', 'Klasifikasi'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
