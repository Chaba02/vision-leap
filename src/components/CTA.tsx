import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="glass-card p-12 rounded-2xl space-y-6"
        >
          <h2 className="text-section text-foreground">
            Non trovi la location perfetta?
          </h2>
          <p className="text-lg text-muted-foreground">
            I nostri wedding planner sono qui per aiutarti a trovare 
            la venue dei tuoi sogni in tutta la Tunisia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="btn-primary">
                Consulenza gratuita
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="btn-secondary">
                Parla con un esperto
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
