import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, Clock, MapPin, Shield, CreditCard, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockLocations } from "@/data/locations";

const Booking = () => {
  const { id } = useParams();
  const location = mockLocations.find(loc => loc.id === id);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: "",
    guests: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    paymentMethod: ""
  });

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Location non trovata</h1>
          <Link to="/">
            <Button>Torna alla home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log("Booking submitted:", bookingData);
    // Dummy booking logic
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to={`/location/${location.id}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna alla location
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step <= currentStep 
                      ? 'bg-primary text-white border-primary' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    {step < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ${
                      step < currentStep ? 'bg-primary' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 rounded-2xl"
              >
                {/* Step 1: Event Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Dettagli evento</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">Data matrimonio</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          className="glass-input"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Orario</Label>
                        <Select value={bookingData.time} onValueChange={(value) => handleInputChange("time", value)}>
                          <SelectTrigger className="glass-input">
                            <SelectValue placeholder="Seleziona orario" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Mattina (10:00-14:00)</SelectItem>
                            <SelectItem value="afternoon">Pomeriggio (14:00-18:00)</SelectItem>
                            <SelectItem value="evening">Sera (18:00-24:00)</SelectItem>
                            <SelectItem value="allday">Tutto il giorno</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests">Numero ospiti</Label>
                      <Input
                        id="guests"
                        type="number"
                        placeholder="Es. 120"
                        value={bookingData.guests}
                        onChange={(e) => handleInputChange("guests", e.target.value)}
                        className="glass-input"
                        max={location.capacity}
                        required
                      />
                      <p className="text-sm text-muted-foreground">
                        Massimo {location.capacity} ospiti per questa location
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Note aggiuntive</Label>
                      <Textarea
                        id="notes"
                        placeholder="Descrivi eventuali richieste speciali..."
                        value={bookingData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="glass-input"
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Informazioni personali</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nome</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="Mario"
                          value={bookingData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="glass-input"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Cognome</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Rossi"
                          value={bookingData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="glass-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tua@email.com"
                        value={bookingData.email}
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
                        value={bookingData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="glass-input"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">Pagamento e conferma</h2>
                    
                    <div className="space-y-4">
                      <Label>Metodo di pagamento</Label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 glass-card p-4 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="card"
                            onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                            className="text-primary"
                          />
                          <CreditCard className="w-5 h-5 text-primary" />
                          <span>Carta di credito/debito</span>
                        </label>
                        <label className="flex items-center gap-3 glass-card p-4 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                          <input 
                            type="radio" 
                            name="payment" 
                            value="transfer"
                            onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                            className="text-primary"
                          />
                          <Shield className="w-5 h-5 text-primary" />
                          <span>Bonifico bancario</span>
                        </label>
                      </div>
                    </div>

                    <div className="glass-card p-6 rounded-lg bg-green-50/10 border border-green-200/20">
                      <div className="flex items-center gap-3 text-green-600 mb-3">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">Garanzia Zafaf</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>✅ Cancellazione gratuita fino a 30 giorni prima</li>
                        <li>✅ Rimborso completo in caso di problemi</li>
                        <li>✅ Supporto dedicato per tutto l'evento</li>
                        <li>✅ Assicurazione inclusa</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-glass-border/30">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={prevStep} className="btn-secondary">
                      Indietro
                    </Button>
                  )}
                  <div className="ml-auto">
                    {currentStep < 3 ? (
                      <Button onClick={nextStep} className="btn-primary">
                        Continua
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} className="btn-primary">
                        Conferma prenotazione
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-4">Riepilogo prenotazione</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <img 
                      src={location.image} 
                      alt={location.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{location.name}</h4>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {location.city}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    {bookingData.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(bookingData.date).toLocaleDateString('it-IT')}</span>
                      </div>
                    )}
                    {bookingData.guests && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{bookingData.guests} ospiti</span>
                      </div>
                    )}
                    {bookingData.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{bookingData.time}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-glass-border/30 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Prezzo stimato</span>
                      <span className="text-xl font-bold text-foreground">{location.priceRange}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Il prezzo finale verrà confermato dopo il contatto diretto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;