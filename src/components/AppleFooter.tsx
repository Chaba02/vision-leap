
import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp,
  Heart
} from 'lucide-react';

const AppleFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    servizi: [
      { name: 'Strategia Aziendale', href: '#services' },
      { name: 'Change Management', href: '#services' },
      { name: 'Marketing Strategy', href: '#services' },
      { name: 'Business Intelligence', href: '#services' },
    ],
    azienda: [
      { name: 'Chi Siamo', href: '#about' },
      { name: 'I Nostri Valori', href: '#about' },
      { name: 'Team', href: '#about' },
      { name: 'Carriere', href: '#about' },
    ],
    risorse: [
      { name: 'Blog', href: '#' },
      { name: 'Casi Studio', href: '#testimonials' },
      { name: 'Whitepaper', href: '#' },
      { name: 'Webinar', href: '#' },
    ],
    supporto: [
      { name: 'Contatti', href: '#contact' },
      { name: 'FAQ', href: '#' },
      { name: 'Supporto', href: '#' },
      { name: 'Partnership', href: '#' },
    ]
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+39 02 1234 5678', href: 'tel:+390212345678' },
    { icon: Mail, text: 'info@consultpro.it', href: 'mailto:info@consultpro.it' },
    { icon: MapPin, text: 'Via della Consulenza, 123 - Milano', href: '#' },
  ];

  return (
    <footer className="relative bg-apple-gray-50 border-t border-apple-gray-200/60">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-apple-white hover:bg-apple-accent-blue rounded-2xl flex items-center justify-center shadow-apple-md hover:shadow-apple-lg transition-all duration-300 hover:scale-110 group border border-apple-gray-200/60 backdrop-blur-sm"
        aria-label="Torna su"
      >
        <ArrowUp size={20} className="text-apple-gray-600 group-hover:text-apple-white group-hover:-translate-y-0.5 transition-all duration-300" />
      </button>

      <div className="section-apple pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Company Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="text-display-sm text-apple-title">
                ConsultPro
              </div>
              <p className="text-body-lg text-apple-body max-w-md leading-relaxed">
                Trasformiamo le sfide aziendali in opportunità di crescita attraverso 
                consulenza strategica e soluzioni innovative.
              </p>
            </div>
            
            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 text-apple-body hover:text-apple-accent-blue transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 bg-apple-gray-100 rounded-xl flex items-center justify-center group-hover:bg-apple-accent-blue/10 transition-colors duration-300">
                    <info.icon size={18} className="text-apple-gray-600 group-hover:text-apple-accent-blue transition-colors duration-300" />
                  </div>
                  <span className="text-body-md">
                    {info.text}
                  </span>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-icon"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="text-apple-gray-600 group-hover:text-apple-accent-blue transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h4 className="text-heading-md text-apple-title mb-6 font-semibold">
                  Servizi
                </h4>
                <ul className="space-y-4">
                  {footerLinks.servizi.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-md text-apple-body link-hover"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-heading-md text-apple-title mb-6 font-semibold">
                  Azienda
                </h4>
                <ul className="space-y-4">
                  {footerLinks.azienda.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-md text-apple-body link-hover"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-heading-md text-apple-title mb-6 font-semibold">
                  Risorse
                </h4>
                <ul className="space-y-4">
                  {footerLinks.risorse.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-md text-apple-body link-hover"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-heading-md text-apple-title mb-6 font-semibold">
                  Supporto
                </h4>
                <ul className="space-y-4">
                  {footerLinks.supporto.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-body-md text-apple-body link-hover"
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

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-apple-gray-200/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <h4 className="text-heading-lg text-apple-title mb-3 font-semibold">
                Resta sempre aggiornato
              </h4>
              <p className="text-body-lg text-apple-body">
                Iscriviti alla newsletter per ricevere insights esclusivi e le ultime novità del settore.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:min-w-96">
              <input
                type="email"
                placeholder="La tua email professionale"
                className="form-apple flex-1 min-w-0"
              />
              <button className="btn-apple-primary whitespace-nowrap px-8">
                Iscriviti
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-apple-gray-200/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-body-md text-apple-body">
              <span>© 2024 ConsultPro. Realizzato con</span>
              <Heart size={16} className="text-red-500 fill-current animate-pulse" />
              <span>a Milano</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-6">
              <a
                href="#"
                className="text-body-md text-apple-body link-hover"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-body-md text-apple-body link-hover"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-body-md text-apple-body link-hover"
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

export default AppleFooter;
