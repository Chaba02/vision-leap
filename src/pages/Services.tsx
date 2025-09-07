import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { 
  Calendar, 
  Camera, 
  Music, 
  Utensils, 
  Car, 
  Flower2, 
  Users, 
  MapPin, 
  Clock, 
  Shield 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Calendar,
      title: "Wedding Planning Completo",
      description: "Dalla progettazione iniziale al coordinamento del giorno del matrimonio",
      features: ["Timeline dettagliata", "Coordinamento fornitori", "Gestione budget", "Supporto h24"]
    },
    {
      icon: Camera,
      title: "Fotografia e Video",
      description: "Servizi fotografici professionali per immortalare ogni momento",
      features: ["Foto matrimonio", "Video drone", "Album personalizzato", "Streaming live"]
    },
    {
      icon: Music,
      title: "Intrattenimento",
      description: "Musica dal vivo, DJ e spettacoli per animare la festa",
      features: ["Band dal vivo", "DJ professionali", "Spettacoli tradizionali", "Karaoke"]
    },
    {
      icon: Utensils,
      title: "Catering Gourmet",
      description: "Menu personalizzati con specialità tunisine e internazionali",
      features: ["Menu degustazione", "Cucina halal", "Buffet internazionale", "Servizio ai tavoli"]
    },
    {
      icon: Car,
      title: "Transfer e Trasporti",
      description: "Servizi di trasporto per sposi e invitati",
      features: ["Auto di lusso", "Transfer aeroporto", "Bus per invitati", "Carrozze tradizionali"]
    },
    {
      icon: Flower2,
      title: "Decorazioni Floreali",
      description: "Allestimenti floreali e decorazioni su misura",
      features: ["Bouquet sposa", "Centrotavola", "Archi floreali", "Petali di rosa"]
    }
  ];

  const process = [
    {
      step: "01",
      title: "Consulenza Gratuita",
      description: "Parliamo delle tue esigenze e del budget disponibile"
    },
    {
      step: "02", 
      title: "Selezione Location",
      description: "Ti proponiamo le venue più adatte alle tue preferenze"
    },
    {
      step: "03",
      title: "Pianificazione",
      description: "Organizziamo tutti i dettagli con il nostro team di esperti"
    },
    {
      step: "04",
      title: "Il Tuo Giorno",
      description: "Coordiniamo tutto per garantire un matrimonio perfetto"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Garanzia Totale",
      description: "Rimborso 100% in caso di problemi"
    },
    {
      icon: Clock,
      title: "Supporto 24/7",
      description: "Assistenza sempre disponibile"
    },
    {
      icon: Users,
      title: "Team Esperto",
      description: "Wedding planner certificati"
    },
    {
      icon: MapPin,
      title: "Conoscenza Locale",
      description: "Esperti della Tunisia"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-hero text-foreground">
              Servizi completi per il
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                matrimonio perfetto
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dalla location ai dettagli più piccoli, ci occupiamo di tutto 
              per rendere il vostro matrimonio indimenticabile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-section text-foreground mb-4">
              I nostri servizi
            </h2>
            <p className="text-muted-foreground">
              Tutto quello di cui hai bisogno per il tuo matrimonio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="glass-card p-8 rounded-2xl space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-section text-foreground mb-4">
              Come funziona
            </h2>
            <p className="text-muted-foreground">
              Il processo semplice per organizzare il vostro matrimonio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-12 rounded-2xl"
          >
            <div className="text-center mb-12">
              <h2 className="text-section text-foreground mb-4">
                Perché scegliere i nostri servizi
              </h2>
              <p className="text-muted-foreground">
                Qualità, professionalità e tranquillità garantite
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="text-center space-y-3"
                >
                  <benefit.icon className="w-8 h-8 mx-auto text-primary" />
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;