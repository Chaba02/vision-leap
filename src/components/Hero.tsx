import { motion } from "framer-motion";
import { Star, Shield, HeartHandshake, ChevronDown } from "lucide-react";
import SearchSystem from "./SearchSystem";

interface HeroProps {
  onSearchFocus?: (focused: boolean) => void;
}

const Hero = ({ onSearchFocus }: HeroProps) => {
  const titleWords = ["Il tuo matrimonio perfetto", "in Tunisia"];

  return (
    <section className="relative min-h-screen flex items-center px-4 mt-7">
      <div className="w-full max-w-6xl mx-auto text-center space-y-12">
        {/* Titolo + Sottotitolo */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="space-y-8"
        >
          {titleWords.map((line, idx) => (
            <motion.h1
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className={`text-5xl md:text-7xl font-bold tracking-tight ${idx === 1 ? "text-primary relative inline-block" : "text-foreground"
                }`}
            >
              {line}
              {idx === 1 && (
                <motion.span
                  className="absolute left-0 -bottom-1 h-1 w-full bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              )}
            </motion.h1>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Descrivi il matrimonio dei tuoi sogni e trova la location ideale.
            La nostra AI ti guiderà passo dopo passo nella scelta perfetta.
          </motion.p>
        </motion.div>

        {/* Ricerca in stile ChatGPT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <SearchSystem onSearchFocus={onSearchFocus} />
        </motion.div>

        {/* Punti di forza – widget colorati */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap justify-center gap-6 text-sm"
        >
          {[
            { icon: Shield, text: "Garanzia rimborso 100%", color: "bg-blue-50 text-blue-600" },
            { icon: Star, text: "Location verificate", color: "bg-yellow-50 text-yellow-600" },
            { icon: HeartHandshake, text: "Supporto dedicato", color: "bg-pink-50 text-pink-600" },
          ].map(({ icon: Icon, text, color }, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${color} hover:scale-105 transition-transform duration-300`}
            >
              <Icon className="w-4 h-4" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      
    </section>
  );
};

export { Hero };
