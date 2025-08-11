
import React from 'react';
import { 
  Monitor, 
  Database, 
  BarChart3, 
  Cloud, 
  Smartphone, 
  Settings,
  ArrowRight 
} from 'lucide-react';

const ChappServices = () => {

  const handleButton = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Monitor,
      title: 'Web-App Personalizzate',
      description: 'Sviluppiamo applicazioni web moderne, responsive e scalabili utilizzando le tecnologie più avanzate del mercato.',
      features: ['React/Next.js', 'UI/UX Design', 'Performance ottimali'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Database,
      title: 'Business Intelligence',
      description: 'Piattaforme BI complete per trasformare i tuoi dati in insights strategici e dashboard interattive.',
      features: ['Dashboard real-time', 'Analisi predittiva', 'Data visualization'],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avanzate',
      description: 'Sistemi di reportistica avanzata e KPI monitoring per decisioni data-driven efficaci.',
      features: ['Metriche personalizzate', 'Report automatici', 'Alert intelligenti'],
      color: 'from-purple-500 to-purple-600'
    },
    
    {
      icon: Settings,
      title: 'Integrazione Sistemi',
      description: 'Integrazione seamless tra sistemi esistenti, API development e automazione dei processi.',
      features: ['API REST/GraphQL', 'Webhook automation', 'Database sync'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section id="services" className="section-chapp bg-chapp-dark-card/30 px-6 sm:px-8 lg:px-20">
      <div className="container-chapp">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-chapp-accent-blue/20 text-chapp-accent-blue px-4 py-2 rounded-full text-body-sm font-semibold mb-6">
            I Nostri Servizi
          </div>
          <h2 className="text-display-md text-chapp-title mb-6">
            Soluzioni Complete per{' '}
            <span className="bg-gradient-blue-elegant bg-clip-text text-transparent">Web-App e Business Intelligence</span>
          </h2>
          <p className="text-body-xl text-chapp-body max-w-3xl mx-auto">
            Offriamo servizi specializzati nello sviluppo di piattaforme web avanzate e 
            sistemi di Business Intelligence, progettati per trasformare il tuo business digitale.
          </p>
        </div>

        {/* Services Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-glass-dark p-8 group animate-on-scroll hover-lift-dark"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-chapp-md`}>
                <service.icon className="text-white" size={28} />
              </div>

              {/* Content */}
              <h3 className="text-heading-lg text-chapp-title mb-4">
                {service.title}
              </h3>
              <p className="text-chapp-body mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-body-sm text-chapp-body">
                    <div className="w-1.5 h-1.5 bg-chapp-accent-blue rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="btn-chapp-ghost w-full justify-center flex items-center group/btn">
                Scopri di più
                <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-blue-elegant rounded-3xl p-12 text-center shadow-chapp-xl">
            <h3 className="text-heading-xl text-chapp-white mb-4">
              Hai un progetto web o BI in mente?
            </h3>
            <p className="text-body-lg text-chapp-white/90 mb-8 max-w-2xl mx-auto">
              I nostri sviluppatori e data analyst sono pronti ad analizzare le tue esigenze 
              e proporti la soluzione tecnologica più adatta al tuo business.
            </p>
            <button className="btn-chapp-secondary hover-glow-blue" onClick={handleButton}>
              Prenota una Consulenza Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChappServices;
