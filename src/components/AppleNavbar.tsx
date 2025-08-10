
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const AppleNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Chi Siamo', href: '#about' },
    { name: 'Servizi', href: '#services' },
    { name: 'Testimonianze', href: '#testimonials' },
    { name: 'Contatti', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-apple-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-apple">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-heading-xl text-apple-title">
              ConsultPro
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-body-lg font-medium text-apple-gray-700 hover:text-apple-black transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-apple-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="btn-apple-primary">
              Inizia Ora
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-apple-gray-700 hover:text-apple-black transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-apple-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-body-lg font-medium text-apple-gray-700 hover:text-apple-black transition-colors duration-300 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 pt-2">
              <button className="btn-apple-primary w-full">
                Inizia Ora
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppleNavbar;
