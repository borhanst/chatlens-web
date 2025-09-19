import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-electric-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-poppins font-bold text-gray-800">ChatLens</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary-500 font-inter font-medium transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-primary-500 font-inter font-medium transition-colors">
              Pricing
            </a>
            <a href="#docs" className="text-gray-600 hover:text-primary-500 font-inter font-medium transition-colors">
              Docs
            </a>
            <Link to="/login" className="text-gray-600 hover:text-primary-500 font-inter font-medium transition-colors">
              Login
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link 
              to="/register"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-inter font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-4 border-t border-gray-100">
            <a href="#features" className="block text-gray-600 hover:text-primary-500 font-inter font-medium py-2 transition-colors">
              Features
            </a>
            <a href="#pricing" className="block text-gray-600 hover:text-primary-500 font-inter font-medium py-2 transition-colors">
              Pricing
            </a>
            <a href="#docs" className="block text-gray-600 hover:text-primary-500 font-inter font-medium py-2 transition-colors">
              Docs
            </a>
            <Link to="/login" className="block text-gray-600 hover:text-primary-500 font-inter font-medium py-2 transition-colors">
              Login
            </Link>
            <div className="pt-4">
              <Link 
                to="/register"
                className="block w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-inter font-medium transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;