
import React from 'react';
import { 
  Monitor, 
  Database, 
  BarChart3, 
  Cloud, 
  Smartphone, 
  Settings,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';

const ChappServices = () => {
  const services = [
    {
      icon: Database,
      title: 'Dashboard BI Custom',
      description: 'Piattaforme Business Intelligence complete per trasformare i tuoi dati in insights strategici real-time.',
      features: ['Analytics real-time', 'Multi-sorgente data', 'KPI personalizzati'],
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      icon: Monitor,
      title: 'Web-App Scalabili',
      description: 'Applicazioni web moderne e performanti con React/Next.js, ottimizzate per crescere con il tuo business.',
      features: ['React/Next.js', 'Design responsive', 'API integration'],
      color: 'from-emerald-500 to-emerald-600',
      popular: true
    },
    {
      icon: BarChart3,
      title: 'Reportistica Avanzata',
      description: 'Sistemi di reporting automatizzati con alert intelligenti e dashboard executive personalizzate.',
      features: ['Report automatici', 'Alert smart', 'Export multi-formato'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Infrastrutture cloud scalabili e sicure per le tue applicazioni con deployment automatizzato.',
      features: ['AWS/Azure setup', 'CI/CD pipeline', 'Monitoring 24/7'],
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Zap,
      title: 'Integrazioni API',
      description: 'Connessioni seamless tra sistemi esistenti, CRM, ERP e piattaforme e-commerce.',
      features: ['API REST/GraphQL', 'Webhook automation', 'Real-time sync'],
      color: 'from-rose-500 to-rose-600'
    },
    {
      icon: Target,
      title: 'Consulenza Strategica',
      description: 'Analisi dei processi aziendali e strategia di digitalizzazione per massimizzare il ROI.',
      features: ['Process analysis', 'ROI optimization', 'Digital strategy'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section id="services" className="section-chapp bg-chapp-dark-card/30 responsive-padding">
      <div className="container-chapp">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-chapp-accent-blue-vivid/20 text-chapp-accent-blue-vivid px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-body-xs sm:text-body-sm font-semibold mb-4 sm:mb-6">
            I Nostri Servizi
          </div>
          <h2 className="text-display-md sm:text-display-lg text-chapp-title mb-4 sm:mb-6 leading-tight">
            Soluzioni Complete per{' '}
            <span className="bg-gradient-blue-vivid bg-clip-text text-transparent">BI e Web-App</span>
          </h2>
          <p className="text-body-lg sm:text-body-xl text-chapp-body max-w-4xl mx-auto leading-relaxed">
            Specializzati in piattaforme Business Intelligence e web-app scalabili. 
            <span className="hidden sm:inline"> Trasformiamo i tuoi dati in vantaggio competitivo con soluzioni su misura per retail, e-commerce e logistica.</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-glass-dark p-6 sm:p-8 group animate-on-scroll hover-lift-dark relative ${
                service.popular ? 'ring-2 ring-chapp-accent-blue-vivid/30' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-blue-vivid text-chapp-white text-body-xs px-2 py-1 rounded-full font-semibold">
                  Top
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-chapp-md`}>
                <service.icon className="text-white" size={20} />
              </div>

              {/* Content */}
              <h3 className="text-heading-md sm:text-heading-lg text-chapp-title mb-3 sm:mb-4 font-semibold">
                {service.title}
              </h3>
              <p className="text-body-sm sm:text-body-md text-chapp-body mb-4 sm:mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-4 sm:mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-body-xs sm:text-body-sm text-chapp-body">
                    <div className="w-1.5 h-1.5 bg-chapp-accent-blue-vivid rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="btn-chapp-ghost w-full justify-center flex items-center group/btn text-body-sm sm:text-body-md">
                Scopri di più
                <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-blue-vivid rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-chapp-xl">
            <h3 className="text-heading-lg sm:text-heading-xl text-chapp-white mb-3 sm:mb-4 font-semibold">
              Hai un progetto BI o web-app in mente?
            </h3>
            <p className="text-body-md sm:text-body-lg text-chapp-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              I nostri specialisti sono pronti ad analizzare le tue esigenze di Business Intelligence 
              e proporti la soluzione tecnologica più adatta al tuo settore.
            </p>
            <button className="btn-chapp-secondary hover-glow-blue w-full sm:w-auto">
              Prenota Demo Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChappServices;
