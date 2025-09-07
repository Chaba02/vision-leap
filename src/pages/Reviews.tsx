import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Star, Heart, MapPin, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Reviews = () => {
  const reviews = [
    {
      id: "1",
      author: "Sara & Ahmed",
      location: "Villa El Hana, Hammamet",
      rating: 5,
      date: "Gennaio 2024",
      comment: "Il nostro matrimonio è stato assolutamente perfetto! Zafaf ci ha aiutato a trovare la location dei nostri sogni e il supporto del team è stato eccezionale. La Villa El Hana è magica, con una vista mozzafiato sul mare. Ogni dettaglio è stato curato alla perfezione. Consigliatissimo!",
      image: "/src/assets/villa-el-hana.jpg",
      verified: true
    },
    {
      id: "2",
      author: "Leila & Marco",
      location: "Le Mirage Resort, Sousse",
      rating: 5,
      date: "Febbraio 2024",
      comment: "Esperienza incredibile dall'inizio alla fine. Il wedding planner assegnato è stato fantastico, sempre disponibile e professionale. Il resort ha superato le nostre aspettative con servizi di lusso e una spiaggia privata da sogno. I nostri ospiti sono rimasti incantati!",
      image: "/src/assets/le-mirage-resort.jpg",
      verified: true
    },
    {
      id: "3",
      author: "Yasmine & Omar",
      location: "Riad du Palmier, Tunisi",
      rating: 5,
      date: "Febbraio 2024",
      comment: "Volevamo un matrimonio autentico e tradizionale, e il Riad du Palmier è stato la scelta perfetta. L'atmosfera magica della medina, l'architettura tradizionale e l'ospitalità tunisina ci hanno regalato un'esperienza unica. Zafaf ha coordinato tutto magnificamente.",
      image: "/src/assets/riad-palmier.jpg",
      verified: true
    },
    {
      id: "4",
      author: "Elena & Karim", 
      location: "Palazzo Azzurro, Djerba",
      rating: 4,
      date: "Gennaio 2024",
      comment: "Location molto bella con un palazzo storico affascinante. Il servizio è stato buono, anche se ci sono stati alcuni piccoli intoppi durante l'organizzazione. Nel complesso siamo soddisfatti della scelta e il matrimonio è riuscito bene.",
      image: "/src/assets/villa-el-hana.jpg",
      verified: false
    },
    {
      id: "5",
      author: "Amina & David",
      location: "Villa des Oliviers, Monastir",
      rating: 5,
      date: "Febbraio 2024", 
      comment: "La Villa des Oliviers è un gioiello nascosto! Immersa tra uliveti secolari con vista sul golfo di Monastir. L'ambiente intimo e romantico era perfetto per il nostro matrimonio con 100 invitati. Lo staff è stato fantastico e il cibo biologico eccellente.",
      image: "/src/assets/le-mirage-resort.jpg",
      verified: true
    },
    {
      id: "6",
      author: "Nadia & Luca",
      location: "Hotel Marina Palace, Mahdia",
      rating: 4,
      date: "Gennaio 2024",
      comment: "Hotel elegante nel porto di Mahdia con personale molto cordiale. La terrazza con vista mare è stata il punto forte del nostro ricevimento. Alcuni servizi potrebbero essere migliorati, ma nel complesso una bella esperienza per il nostro matrimonio.",
      image: "/src/assets/riad-palmier.jpg",
      verified: true
    }
  ];

  const stats = [
    { number: "4.9", label: "Rating Medio", icon: Star },
    { number: "500+", label: "Matrimoni Celebrati", icon: Heart },
    { number: "98%", label: "Clienti Soddisfatti", icon: Quote }
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
              Recensioni di chi ha scelto
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Zafaf per il loro matrimonio
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Leggi le esperienze reali delle coppie che hanno celebrato 
              il loro matrimonio perfetto con le nostre location.
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
            <div className="grid grid-cols-3 gap-8 text-center">
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

      {/* Reviews Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-section text-foreground mb-4">
              Cosa dicono di noi
            </h2>
            <p className="text-muted-foreground">
              Testimonianze autentiche delle nostre coppie
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-card p-8 rounded-2xl space-y-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img 
                      src={review.image} 
                      alt={review.location}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{review.author}</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {review.location}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verificata
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="w-6 h-6 text-primary/30 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed pl-4">
                    {review.comment}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-card p-12 rounded-2xl text-center space-y-6"
          >
            <h2 className="text-section text-foreground">
              Vuoi essere il prossimo a lasciare una recensione?
            </h2>
            <p className="text-muted-foreground">
              Inizia a pianificare il matrimonio dei tuoi sogni con Zafaf
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-3 rounded-lg font-medium"
              >
                Trova la tua location
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary px-8 py-3 rounded-lg font-medium"
              >
                Consulenza gratuita
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;