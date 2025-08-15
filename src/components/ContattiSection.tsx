import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import InteractiveMap from "./InteractiveMap";
import SectionHeader from "./SectionHeader";

const ContattiSection = () => {
  const contactInfo = [
    { icon: MapPin, title: "Indirizzo", content: "Via Milano, 127\n22063 Cantù (CO), Italia" },
    { icon: Phone, title: "Telefono", content: "+39 031 123 4567" },
    { icon: Mail, title: "Email", content: "info@moscheacantu.it" },
    { icon: Clock, title: "Orari di Apertura", content: "Lun-Ven: 9:00-18:00\nSab-Dom: 8:00-20:00" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="contatti" className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader 
            title="Contatti"
            subtitle="Non esitare a contattarci per qualsiasi domanda o informazione."
          />

          <div className="lg:flex lg:gap-12">
            {/* Colonna sinistra - Mappa */}
            <motion.div className="lg:flex-1 h-full" variants={itemVariants}>
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg h-full hover:shadow-xl transition-all duration-300">
                <h4 className="font-serif text-xl font-medium text-gray-900 px-6 mt-6 tracking-wide">
                  Dove Trovarci
                </h4>
                <div className="h-[400px] w-full p-6">
                  
                </div>
              </div>
            </motion.div>

            {/* Colonna destra - Box unico info */}
            <motion.div className="lg:flex-1 flex flex-col h-full" variants={itemVariants}>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg flex-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <h4 className="font-serif text-xl font-medium text-gray-900 mb-6 tracking-wide">
                  Informazioni di Contatto
                </h4>
                <div className="space-y-6">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">{info.title}</h5>
                        <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContattiSection;
