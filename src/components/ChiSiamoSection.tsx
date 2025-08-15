import { Heart, Users, BookOpen, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const ChiSiamoSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Pace e Spiritualità",
      description: "Un luogo di preghiera e riflessione dove trovare serenità e connessione spirituale."
    },
    {
      icon: Users,
      title: "Comunità Unita", 
      description: "Una famiglia accogliente che abbraccia persone di ogni provenienza e cultura."
    },
    {
      icon: BookOpen,
      title: "Educazione",
      description: "Offriamo programmi educativi per adulti e bambini, promuovendo conoscenza e comprensione."
    },
    {
      icon: Handshake,
      title: "Dialogo Interreligioso",
      description: "Costruiamo ponti con altre comunità religiose per un mondo più armonioso."
    }
  ];

  return (
    <section id="chi-siamo" className="min-h-screen bg-white flex items-center justify-center py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <SectionHeader 
          title="Chi Siamo"
          subtitle="La Moschea di Cantù è molto più di un luogo di culto. Siamo una comunità che promuove valori di pace, comprensione e solidarietà."
          className="mb-24"
        />

        {/* Values Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, staggerChildren: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {values.map((value, index) => {
            const IconComponent = value.icon;
            
            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-white rounded-3xl p-6 sm:p-8 h-full text-center border-2 border-gray-300 hover:border-primary transition-all duration-200">
                  {/* Icon container */}
                  <div className="mb-6 sm:mb-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-50 flex items-center justify-center mx-auto transition-colors duration-200">
                      <IconComponent 
                        className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-700 group-hover:text-primary transition-colors duration-200"
                        strokeWidth={1} 
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-lg sm:text-xl font-medium text-black mb-3 sm:mb-4 tracking-tight group-hover:text-primary transition-colors duration-200">
                      {value.title}
                    </h4>
                    
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ChiSiamoSection;
