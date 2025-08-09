
import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp 
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    servizi: [
      { name: 'Strategia Aziendale', href: '#' },
      { name: 'Gestione del Cambiamento', href: '#' },
      { name: 'Marketing & Vendite', href: '#' },
      { name: 'Business Intelligence', href: '#' },
    ],
    azienda: [
      { name: 'Chi Siamo', href: '#chi-siamo' },
      { name: 'I Nostri Valori', href: '#' },
      { name: 'Team', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    risorse: [
      { name: 'Blog', href: '#' },
      { name: 'Casi Studio', href: '#casi-studio' },
      { name: 'Whitepaper', href: '#' },
      { name: 'Webinar', href: '#' },
    ],
    supporto: [
      { name: 'Contatti', href: '#contatti' },
      { name: 'FAQ', href: '#' },
      { name: 'Supporto Tecnico', href: '#' },
      { name: 'Partnership', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+39 02 1234 5678' },
    { icon: Mail, text: 'info@consultpro.it' },
    { icon: MapPin, text: 'Via della Consulenza, 123 - Milano' },
  ];

  return (
    <footer className="bg-corporate-gray-dark text-corporate-white relative">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-corporate-blue hover:bg-corporate-blue-dark rounded-full flex items-center justify-center shadow-medium transition-all duration-300 hover:scale-110 group"
        aria-label="Torna su"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-200" />
      </button>

      {/* Main footer content */}
      <div className="container-corporate pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="text-heading-lg text-display text-corporate-white mb-6">
              ConsultPro
            </div>
            <p className="text-body text-corporate-white/80 mb-6 leading-relaxed">
              Trasformiamo le sfide aziendali in opportunità di crescita attraverso 
              consulenza strategica e soluzioni innovative su misura.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-3">
                  <info.icon size={16} className="text-corporate-blue flex-shrink-0" />
                  <span className="text-body-sm text-corporate-white/80">
                    {info.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-corporate-white/10 hover:bg-corporate-blue rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="group-hover:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-heading-sm text-corporate-white font-semibold mb-6">
                  Servizi
                </h4>
                <ul className="space-y-3">
                  {footerLinks.servizi.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-sm text-corporate-white/70 hover:text-corporate-blue transition-colors duration-200 inline-block hover:translate-x-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-heading-sm text-corporate-white font-semibold mb-6">
                  Azienda
                </h4>
                <ul className="space-y-3">
                  {footerLinks.azienda.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-sm text-corporate-white/70 hover:text-corporate-blue transition-colors duration-200 inline-block hover:translate-x-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-heading-sm text-corporate-white font-semibold mb-6">
                  Risorse
                </h4>
                <ul className="space-y-3">
                  {footerLinks.risorse.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-sm text-corporate-white/70 hover:text-corporate-blue transition-colors duration-200 inline-block hover:translate-x-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-heading-sm text-corporate-white font-semibold mb-6">
                  Supporto
                </h4>
                <ul className="space-y-3">
                  {footerLinks.supporto.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-sm text-corporate-white/70 hover:text-corporate-blue transition-colors duration-200 inline-block hover:translate-x-1"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="border-t border-corporate-white/10 mt-12 pt-12">
          <div className="max-w-md mx-auto text-center lg:max-w-none lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h4 className="text-heading-sm text-corporate-white font-semibold mb-2">
                Resta Aggiornato
              </h4>
              <p className="text-body-sm text-corporate-white/70">
                Iscriviti alla nostra newsletter per ricevere insights e novità del settore.
              </p>
            </div>
            
            <div className="flex gap-3 max-w-sm mx-auto lg:mx-0">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 rounded-lg bg-corporate-white/10 border border-corporate-white/20 text-corporate-white placeholder:text-corporate-white/50 focus:ring-2 focus:ring-corporate-blue focus:border-corporate-blue transition-all duration-200"
              />
              <button className="btn-corporate-primary px-6 whitespace-nowrap">
                Iscriviti
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-corporate-white/10">
        <div className="container-corporate py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-body-sm text-corporate-white/60">
              © 2024 ConsultPro. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-body-sm text-corporate-white/60 hover:text-corporate-blue transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-body-sm text-corporate-white/60 hover:text-corporate-blue transition-colors duration-200"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-body-sm text-corporate-white/60 hover:text-corporate-blue transition-colors duration-200"
              >
                Termini di Servizio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
