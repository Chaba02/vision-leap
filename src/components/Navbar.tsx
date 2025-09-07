import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Location", path: "/search" },
    { name: "Servizi", path: "/services" },
    { name: "Recensioni", path: "/reviews" },
    { name: "Contatti", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent border-b border-gray-400/20"
        }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 h-20 lg:h-24 max-w-full mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-gradient-to-r from-primary to-accent rounded-2xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg lg:text-xl font-semibold text-foreground tracking-tight">
            Zafaf
          </span>
        </Link>

        {/* Navigazione Desktop */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-all duration-500 ease-out px-2 py-1 rounded-md ${isActive(link.path)
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Pulsanti Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/login">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10 px-4 py-2"
            >
              <User className="w-4 h-4" />
              Accedi
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-primary text-white hover:bg-primary/90 px-4 py-2">
              Registrati
            </Button>
          </Link>
        </div>

        {/* Bottone Menu Mobile */}
        <button
          className="lg:hidden p-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Menu Mobile */}
      <div
        className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="py-6 px-6 border-t border-white/10 bg-white/95 backdrop-blur-xl">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-all duration-200 py-3 px-4 rounded-xl ${isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="flex items-center gap-2 w-full py-3 rounded-full border border-primary text-primary hover:bg-primary/10 text-sm">
                  <User className="w-4 h-4" />
                  Accedi
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full py-3 rounded-full bg-primary text-white hover:bg-primary/90 text-sm">
                  Registrati
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
