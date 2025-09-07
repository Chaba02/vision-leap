import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Phone, Mail, MapPin, Clock, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Dummy form submission
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefono",
      details: ["+216 70 123 456", "+216 20 987 654"],
      description: "Lun-Ven 9:00-18:00, Sab 9:00-15:00"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@zafaf.tn", "support@zafaf.tn"],
      description: "Risposta entro 2 ore"
    },
    {
      icon: MapPin,
      title: "Uffici",
      details: ["Tunisi - Avenue Habib Bourguiba", "Hammamet - Zone Touristique"],
      description: "Su appuntamento"
    },
    {
      icon: Clock,
      title: "Orari",
      details: ["Lun-Ven: 9:00 - 18:00", "Sabato: 9:00 - 15:00"],
      description: "Domenica chiuso"
    }
  ];

  const subjects = [
    "Richiesta informazioni generali",
    "Preventivo per matrimonio",
    "Supporto prenotazione esistente",
    "Collaborazione business",
    "Reclamo o problema",
    "Altro"
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
              Hai bisogno di aiuto?
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Siamo qui per te
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Il nostro team di esperti è pronto ad assisterti in ogni fase 
              dell'organizzazione del tuo matrimonio perfetto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="glass-card p-6 rounded-2xl text-center space-y-4"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-foreground">{detail}</p>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="glass-card p-8 rounded-2xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Invia un messaggio
                  </h2>
                  <p className="text-muted-foreground">
                    Compila il form e ti risponderemo entro 2 ore
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Mario"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="glass-input"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Cognome *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Rossi"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="glass-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tua@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="glass-input"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+39 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="glass-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Oggetto *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Seleziona l'oggetto" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Messaggio *</Label>
                    <Textarea
                      id="message"
                      placeholder="Descrivi la tua richiesta..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="glass-input"
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Invia messaggio
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="glass-card p-2 rounded-2xl">
                <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <MapPin className="w-12 h-12 mx-auto text-primary" />
                    <div>
                      <h3 className="font-semibold text-foreground">I nostri uffici</h3>
                      <p className="text-sm text-muted-foreground">Tunisi e Hammamet</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-semibold text-foreground mb-4">
                  Domande frequenti
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <h4 className="font-medium text-foreground mb-1">
                      Quanto tempo prima devo prenotare?
                    </h4>
                    <p className="text-muted-foreground">
                      Consigliamo di prenotare almeno 6 mesi prima del matrimonio.
                    </p>
                  </div>
                  <div className="text-sm">
                    <h4 className="font-medium text-foreground mb-1">
                      Posso visitare le location prima di prenotare?
                    </h4>
                    <p className="text-muted-foreground">
                      Sì, organizziamo visite guidate gratuite su appuntamento.
                    </p>
                  </div>
                  <div className="text-sm">
                    <h4 className="font-medium text-foreground mb-1">
                      Cosa include la garanzia Zafaf?
                    </h4>
                    <p className="text-muted-foreground">
                      Rimborso 100%, assistenza h24 e assicurazione inclusa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-foreground">
                    Assistenza urgente
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Per emergenze il giorno del matrimonio, contatta il nostro numero di emergenza:
                </p>
                <div className="text-center">
                  <a 
                    href="tel:+21620123456" 
                    className="text-primary font-semibold text-lg hover:underline"
                  >
                    +216 20 123 456
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    Disponibile 24/7 durante eventi
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;