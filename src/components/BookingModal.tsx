import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Shield, CheckCircle, X } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
  locationName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ locationName, isOpen, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-glass-border/50 max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold text-foreground">
              {step === 1 ? "Richiedi disponibilità" : "Richiesta inviata!"}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Shield className="w-4 h-4 text-primary" />
                Prenotazione con garanzia Zafaf
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Rimborso al 100% se la location non rispetta gli standard
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-medium text-foreground">{locationName}</h3>
              <p className="text-sm text-muted-foreground">
                Compila il form per ricevere disponibilità e preventivo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input id="name" placeholder="Il tuo nome" required className="search-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Cognome *</Label>
                  <Input id="surname" placeholder="Cognome" required className="search-input" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="email@esempio.com" required className="search-input" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefono *</Label>
                <Input id="phone" type="tel" placeholder="+216 XX XXX XXX" required className="search-input" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data evento *</Label>
                  <Input id="date" type="date" required className="search-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">N° ospiti *</Label>
                  <Select required>
                    <SelectTrigger className="search-input">
                      <SelectValue placeholder="Ospiti" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-glass-border/50">
                      <SelectItem value="50">Fino a 50</SelectItem>
                      <SelectItem value="100">50-100</SelectItem>
                      <SelectItem value="150">100-150</SelectItem>
                      <SelectItem value="200">150-200</SelectItem>
                      <SelectItem value="200+">200+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget indicativo</Label>
                <Select>
                  <SelectTrigger className="search-input">
                    <SelectValue placeholder="Seleziona budget" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-glass-border/50">
                    <SelectItem value="2000">Fino a €2000</SelectItem>
                    <SelectItem value="3500">€2000 - €3500</SelectItem>
                    <SelectItem value="5000">€3500 - €5000</SelectItem>
                    <SelectItem value="7000">€5000 - €7000</SelectItem>
                    <SelectItem value="7000+">€7000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Richieste speciali</Label>
                <Textarea 
                  id="message" 
                  placeholder="Descrivi eventuali richieste particolari..."
                  className="search-input resize-none"
                  rows={3}
                />
              </div>

              <Button type="submit" className="btn-primary w-full">
                Invia richiesta
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Riceverai una risposta entro 24 ore con disponibilità e preventivo dettagliato
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Richiesta inviata con successo!
              </h3>
              <p className="text-muted-foreground">
                Ti contatteremo entro 24 ore con disponibilità e preventivo per <strong>{locationName}</strong>
              </p>
            </div>

            <div className="glass-card p-4 rounded-lg text-left">
              <h4 className="font-medium text-foreground mb-2">Prossimi passi:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Verifica della disponibilità</li>
                <li>• Invio preventivo dettagliato</li>
                <li>• Chiamata di approfondimento</li>
                <li>• Eventuale visita alla location</li>
              </ul>
            </div>

            <Button onClick={onClose} className="btn-primary w-full">
              Chiudi
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};