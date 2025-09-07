import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import PopularLocations from "@/components/PopularLocations";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { mockLocations } from "@/data/locations"; // importa i dati reali

const Index = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero onSearchFocus={setIsSearchFocused} />

      {/* Mostra/nasconde le sezioni con animazione */}
      <AnimatePresence>
        {!isSearchFocused && (
          <motion.div
            key="sections"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-24"
          >
            
            <Stats />
            <PopularLocations locations={mockLocations.slice(0,3)} />
      
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Index;
