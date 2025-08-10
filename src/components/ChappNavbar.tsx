
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';

const ChappNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('IT');

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

  const languages = [
    { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
  ];

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLanguage(langCode);
    setIsLanguageOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-dark shadow-glass-dark backdrop-blur-xl opacity-95'
          : 'bg-transparent backdrop-blur-sm opacity-100'
      }`}
    >
      <div className="container-chapp">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-heading-xl text-chapp-white font-display">
              Chapp
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-body-lg font-medium text-chapp-gray-300 hover:text-chapp-white transition-all duration-300 relative group link-hover-dark"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-chapp-accent-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          {/* Language Dropdown & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-chapp-white/10 backdrop-blur-sm border border-chapp-white/20 rounded-xl text-chapp-gray-300 hover:text-chapp-white hover:bg-chapp-white/15 transition-all duration-300 group"
              >
                <Globe size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-body-md font-medium">
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ${isLanguageOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-chapp-dark-card/95 backdrop-blur-xl border border-chapp-white/20 rounded-2xl shadow-glass-dark overflow-hidden z-60">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-body-md font-medium transition-all duration-300 hover:bg-chapp-white/10 ${
                        currentLanguage === language.code 
                          ? 'text-chapp-accent-blue bg-chapp-white/5' 
                          : 'text-chapp-gray-300 hover:text-chapp-white'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span>{language.name}</span>
                      {currentLanguage === language.code && (
                        <div className="ml-auto w-2 h-2 bg-chapp-accent-blue rounded-full animate-glow"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button className="btn-chapp-accent hover-glow-blue">
              Inizia Ora
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Language Selector */}
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center space-x-1 px-3 py-2 bg-chapp-white/10 backdrop-blur-sm border border-chapp-white/20 rounded-lg text-chapp-gray-300 hover:text-chapp-white transition-all duration-300"
            >
              <span className="text-sm">
                {languages.find(lang => lang.code === currentLanguage)?.flag}
              </span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-chapp-gray-300 hover:text-chapp-white transition-colors duration-300 p-2 bg-chapp-white/10 backdrop-blur-sm border border-chapp-white/20 rounded-lg"
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
          <div className="flex flex-col space-y-4 pt-4 border-t border-chapp-white/20">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-body-lg font-medium text-chapp-gray-300 hover:text-chapp-white transition-colors duration-300 px-4 py-2 hover:bg-chapp-white/10 rounded-xl"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile Language Options */}
            {isLanguageOpen && (
              <div className="px-4 space-y-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-body-md font-medium rounded-xl transition-all duration-300 ${
                      currentLanguage === language.code 
                        ? 'text-chapp-accent-blue bg-chapp-white/10' 
                        : 'text-chapp-gray-300 hover:text-chapp-white hover:bg-chapp-white/5'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            <div className="px-4 pt-2">
              <button className="btn-chapp-accent w-full">
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

export default ChappNavbar;
