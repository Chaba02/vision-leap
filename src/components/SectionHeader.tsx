import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "center-highlight";
  className?: string;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  variant = "default",
  className = "" 
}: SectionHeaderProps) => {
  return (
    <motion.div 
      className={`text-center mb-20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {variant === "center-highlight" ? (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-none mb-4">
          {title.split(' ').map((word, index) => {
            const words = title.split(' ');
            const isHighlight = index === Math.floor(words.length / 2);
            return (
              <span key={index} className={isHighlight ? "text-[#1877F2]" : ""}>
                {word}{index < words.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </h2>
      ) : (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 tracking-tight leading-none mb-6">
          {title.split(' ').map((word, index) => {
            // Evidenzia parole specifiche: "missione" per "Chi Siamo", oppure la seconda parola per altri titoli
            const words = title.split(' ');
            const isMissionWord = word.toLowerCase() === 'missione';
            const isDefaultHighlight = !title.toLowerCase().includes('missione') && (words.length > 3 ? index === 1 : index === 0);
            const shouldHighlight = isMissionWord || isDefaultHighlight;
            
            return (
              <span 
                key={index} 
                className={shouldHighlight ? "text-[#1877F2] relative" : ""}
              >
                {word}
                {isMissionWord && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1877F2] rounded-full"></div>
                )}
                {index < words.length - 1 ? ' ' : ''}
              </span>
            );
          })}
        </h2>
      )}
      
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mx-auto mb-6"></div>
      
      {subtitle && (
        <p className="text-lg md:text-xl font-light text-neutral-600 leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;