import { motion } from "framer-motion";
import { LocationCard } from "@/components/LocationCard";
import { Location } from "@/data/locations";

interface FeaturedLocationsProps {
  locations: Location[];
}

const FeaturedLocations = ({ locations }: FeaturedLocationsProps) => {
  return (
    <section className="pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-section text-foreground mb-4">
            Location in evidenza
          </h2>
          <p className="text-muted-foreground">
            Le nostre venue più richieste, verificate e di qualità premium
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <LocationCard location={location} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLocations;
