
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const AppleNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('IT');

  const languages = [
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' }
  ];

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

  const handleLanguageSelect = (language: { code: string; name: string; flag: string }) => {
    setSelectedLanguage(language.code);
    setIsLanguageOpen(false);
  };

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
            <div className="text-heading-xl text-apple-title font-medium tracking-tight">
              ConsultPro
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-body-lg font-medium text-apple-gray-700 hover:text-apple-black transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-apple-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          {/* Language Dropdown & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-apple-gray-700 hover:text-apple-black transition-all duration-300 rounded-lg hover:bg-apple-gray-50"
              >
                <Globe size={16} className="transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-body-md font-medium">{selectedLanguage}</span>
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Language Dropdown Menu */}
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-apple-white/95 backdrop-blur-xl border border-apple-gray-200 rounded-xl shadow-apple-lg z-50 animate-fade-in">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-apple-gray-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                        selectedLanguage === language.code ? 'bg-apple-gray-50 text-apple-black' : 'text-apple-gray-700'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-body-md font-medium">{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button className="btn-apple-primary group">
              Inizia Ora
              <div className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Language Button */}
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="text-apple-gray-700 hover:text-apple-black transition-colors duration-300 p-2"
            >
              <Globe size={20} />
            </button>

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
            
            {/* Mobile Language Selection */}
            <div className="px-4 pt-2 border-t border-apple-gray-200">
              <div className="text-body-sm font-medium text-apple-gray-600 mb-2">Lingua</div>
              <div className="flex space-x-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      selectedLanguage === language.code 
                        ? 'bg-apple-black text-apple-white' 
                        : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
                    }`}
                  >
                    <span className="text-sm">{language.flag}</span>
                    <span className="text-body-sm">{language.code}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="px-4 pt-2">
              <button className="btn-apple-primary w-full">
                Inizia Ora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close language dropdown */}
      {isLanguageOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </nav>
  );
};

export default AppleNavbar;
