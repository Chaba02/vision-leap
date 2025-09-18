/**
 * Main navigation component with authentication-aware menu
 * Displays different options based on user role (CLIENT/PROVIDER)
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Heart, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links based on user role
  const getNavLinks = () => {
    const baseLinks = [
      { name: 'Home', path: '/home', icon: MapPin },
      { name: 'Cerca', path: '/search', icon: null },
    ];

    if (isAuthenticated && user) {
      if (user.role === 'CLIENT') {
        return [
          ...baseLinks,
          { name: 'Preferiti', path: '/favorites', icon: Heart },
          { name: 'Prenotazioni', path: '/my-bookings', icon: null },
        ];
      } else if (user.role === 'PROVIDER') {
        return [
          ...baseLinks,
          { name: 'Le mie location', path: '/my-locations', icon: null },
          { name: 'Prenotazioni', path: '/provider-bookings', icon: null },
        ];
      }
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header
      className={`fixed w-full top-0 z-[60] transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-glass-border/20'
          : 'bg-white/5 backdrop-blur-md border-b border-glass-border/10'
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 h-20 lg:h-24 max-w-full mx-auto">
        {/* Logo */}
        <Link to="/home" className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg lg:text-xl font-semibold text-foreground tracking-tight">
            Zafaf
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-all duration-500 ease-out px-2 py-1 rounded-md ${
                isActive(link.path)
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <span className="text-sm text-muted-foreground">
                Ciao, {user.name}
              </span>
              <Link to="/profile">
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                  <Settings className="w-4 h-4 mr-2" />
                  Profilo
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                size="sm" 
                className="border-destructive/20 hover:bg-destructive/10 text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Esci
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                  <User className="w-4 h-4 mr-2" />
                  Accedi
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2.5 rounded-xl glass-card border border-glass-border/20 hover:bg-white/10 transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-6 px-6 border-t border-white/10 bg-white/95 backdrop-blur-xl">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-all duration-200 py-3 px-4 rounded-xl ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:text-primary hover:bg-primary/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    Ciao, {user.name}
                  </div>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="flex items-center gap-2 w-full py-3 text-sm border-primary/20 hover:bg-primary/10">
                      <Settings className="w-4 h-4" />
                      Profilo
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout}
                    variant="outline" 
                    className="flex items-center gap-2 w-full py-3 text-sm border-destructive/20 hover:bg-destructive/10 text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Esci
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="flex items-center gap-2 w-full py-3 text-sm border-primary/20 hover:bg-primary/10">
                    <User className="w-4 h-4" />
                    Accedi
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};