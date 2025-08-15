import { Building2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="py-8 grid md:grid-cols-2 gap-8 items-start">
          
          {/* Logo e descrizione */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-background" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-medium text-background">
                Moschea di Cantù
              </h3>
            </div>
            <p className="text-background/70 leading-relaxed text-sm max-w-sm">
              Un luogo di pace, spiritualità e comunità.
            </p>
          </div>

          {/* Contatti */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-background/60 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-background/70 text-sm leading-relaxed">
                Via Milano, 127<br />
                22063 Cantù (CO)
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-background/60 flex-shrink-0" strokeWidth={1.5} />
              <a href="tel:+390311234567" className="text-background/70 text-sm hover:text-background transition-colors">
                +39 031 123 4567
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-background/60 flex-shrink-0" strokeWidth={1.5} />
              <a href="mailto:info@moscheacantu.it" className="text-background/70 text-sm hover:text-background transition-colors">
                info@moscheacantu.it
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright centrato */}
        <div className="border-t border-background/10 py-6 text-center">
          <p className="text-background/60 text-sm">
            © 2024 Moschea di Cantù. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
