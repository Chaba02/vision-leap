import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Heart, Shield, Star, Users, MapPin, Calendar } from "lucide-react";

const About = () => {
  const stats = [
    { icon: MapPin, number: "50+", label: "Location Verificate" },
    { icon: Users, number: "500+", label: "Matrimoni Realizzati" },
    { icon: Star, number: "4.9", label: "Rating Medio" },
    { icon: Calendar, number: "24h", label: "Tempo di Risposta" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Garanzia Totale",
      description: "Rimborso 100% garantito e assicurazione inclusa per ogni prenotazione"
    },
    {
      icon: Star,
      title: "Location Verificate",
      description: "Ogni venue è ispezionata e certificata dal nostro team di esperti"
    },
    {
      icon: Heart,
      title: "Supporto Dedicato",
      description: "Un wedding planner personale ti assiste in ogni fase dell'organizzazione"
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
              La piattaforma di fiducia per
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                matrimoni da sogno
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Zafaf connette le coppie alle location più esclusive della Tunisia, 
              garantendo un'esperienza perfetta dal primo contatto al grande giorno.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <stat.icon className="w-8 h-8 mx-auto text-primary" />
                  <div className="text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-section text-foreground mb-4">
              Perché scegliere Zafaf
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La nostra missione è rendere ogni matrimonio unico e indimenticabile, 
              offrendo il meglio che la Tunisia ha da offrire.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-12 rounded-2xl text-center space-y-6"
          >
            <h2 className="text-section text-foreground">La nostra storia</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Zafaf nasce dalla passione per i matrimoni e l'amore per la Tunisia. 
                Abbiamo creato questa piattaforma dopo aver vissuto in prima persona 
                le difficoltà di trovare la location perfetta per il nostro giorno speciale.
              </p>
              <p>
                Oggi, grazie al nostro network di venue partner e al team di wedding planner 
                esperti, aiutiamo centinaia di coppie ogni anno a realizzare il matrimonio 
                dei loro sogni nelle location più belle della Tunisia.
              </p>
              <p>
                Dalla costa mediterranea ai deserti del Sahara, dalle medine storiche 
                ai resort di lusso, ogni location è selezionata con cura per garantire 
                qualità, autenticità e servizi eccellenti.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;