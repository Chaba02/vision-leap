import { useState, useEffect } from "react";
import { Menu, X, UserCog, Building2 } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
      }, 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigationItems = [
    { name: "Home", href: "#home" },
    { name: "Chi Siamo", href: "#chi-siamo" },
    { name: "Eventi", href: "#eventi" },
    { name: "Contatti", href: "#contatti" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg transform translate-y-0"
          : "bg-white/80 backdrop-blur-md transform translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-4">
            <div className="w-11 h-11 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/10">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-lg lg:text-xl font-semibold text-foreground tracking-tight">
              Moschea di Cantù
            </h1>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-500 ease-out"
                onClick={scrollToSection}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            
            <Button 
              className="glass-button font-medium px-6 py-2.5 rounded-full text-sm tracking-tight hover:scale-105 transition-transform"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#donazioni');
                if (target) {
                  target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
            >
              Dona Ora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Separatore elegante */}
        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 ease-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="py-6 px-6 border-t border-white/10 bg-white/95 backdrop-blur-xl">
          <nav className="flex flex-col space-y-4">
            {navigationItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base font-medium text-foreground/80 hover:text-primary transition-all duration-200 py-3 px-4 rounded-xl hover:bg-primary/5 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ 
                  transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                  transitionDuration: '300ms'
                }}
                onClick={(e) => {
                  scrollToSection(e);
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile Buttons */}
            <div className="space-y-3 mt-4">
          
              <Button 
                className={`glass-button font-medium w-full py-3 rounded-full text-sm tracking-tight transform transition-all duration-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: isMenuOpen ? '250ms' : '0ms' }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  const target = document.querySelector('#donazioni');
                  if (target) {
                    target.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                Dona Ora
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;