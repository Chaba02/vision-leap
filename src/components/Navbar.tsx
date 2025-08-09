
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
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
    { name: 'Servizi', href: '#servizi' },
    { name: 'Chi Siamo', href: '#chi-siamo' },
    { name: 'Casi Studio', href: '#casi-studio' },
    { name: 'Contatti', href: '#contatti' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-corporate-white/95 backdrop-blur-lg shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container-corporate">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-heading-lg text-display text-corporate-blue">
              ConsultPro
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-body-md font-medium text-corporate-gray-dark hover:text-corporate-blue transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-corporate-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
              </a>
            ))}
            <button className="btn-corporate-primary">
              Richiedi Consulenza
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-corporate-gray-dark hover:text-corporate-blue transition-colors duration-200 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-corporate-gray-light/20">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-body-md font-medium text-corporate-gray-dark hover:text-corporate-blue transition-colors duration-200 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="px-4 pt-2">
              <button className="btn-corporate-primary w-full">
                Richiedi Consulenza
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
