
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
    <section id="contatti" className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <SectionHeader 
              title="Contatti"
              subtitle="Non esitare a contattarci per qualsiasi domanda o informazione."
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
            {/* Mappa - Ordine mobile: seconda */}
            <motion.div 
              className="order-2 lg:order-1 lg:flex-1 h-full" 
              variants={itemVariants}
            >
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg h-full hover:shadow-xl transition-all duration-300">
                <div className="p-4 sm:p-6">
                  <h4 className="font-serif text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-wide text-center lg:text-left">
                    Dove Trovarci
                  </h4>
                  <div className="h-64 sm:h-80 lg:h-96 w-full rounded-xl overflow-hidden">
                    <InteractiveMap className="h-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Informazioni di contatto - Ordine mobile: prima */}
            <motion.div 
              className="order-1 lg:order-2 lg:flex-1 flex flex-col h-full" 
              variants={itemVariants}
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg flex-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6 tracking-wide text-center lg:text-left">
                    Informazioni di Contatto
                  </h4>
                  <div className="space-y-4 sm:space-y-6">
                    {contactInfo.map((info, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                          <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={1.5} />
                        </div>
                        <div className="text-center sm:text-left w-full sm:w-auto">
                          <h5 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">
                            {info.title}
                          </h5>
                          <p className="text-gray-600 whitespace-pre-line text-sm sm:text-base leading-relaxed">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sezione aggiuntiva per mobile con migliore spacing */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                  <p className="text-xs sm:text-sm text-gray-500 text-center lg:text-left">
                    Siamo sempre disponibili ad accogliervi nella nostra comunità
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to action per mobile */}
          <motion.div 
            className="mt-8 sm:mt-12 lg:hidden"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-4 sm:p-6 text-center">
              <h5 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">
                Hai bisogno di aiuto per raggiungerci?
              </h5>
              <p className="text-xs sm:text-sm text-gray-600 mb-4">
                Contattaci per indicazioni dettagliate o informazioni sui mezzi pubblici
              </p>
              <a 
                href="tel:+390311234567"
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                Chiama ora
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContattiSection;
