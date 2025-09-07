import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-black opacity-90">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          {/* Logo minimal */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-white" />
            <span className="text-lg font-semibold text-white">Zafaf</span>
          </div>

          {/* Slogan */}
          <p className="text-gray-400 text-sm">
            La piattaforma di fiducia per matrimoni da sogno in Tunisia
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
