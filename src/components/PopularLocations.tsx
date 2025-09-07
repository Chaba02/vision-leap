import { motion } from "framer-motion";
import { LocationCard } from "@/components/LocationCard";
import { Button } from "@/components/ui/button";
import { Location } from "@/data/locations";

interface PopularLocationsProps {
  locations: Location[];
}

const PopularLocations = ({ locations }: PopularLocationsProps) => {
  return (
    <section className="pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-section text-foreground mb-2">
              Locations più richieste
            </h2>
            <p className="text-muted-foreground">
              Scopri le venue che stanno conquistando le coppie
            </p>
          </div>
          <Button variant="outline" className="btn-secondary">
            Vedi tutte
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
            >
              <LocationCard location={location} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularLocations;
