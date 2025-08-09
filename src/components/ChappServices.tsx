
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Lightbulb, 
  BarChart3, 
  Cog,
  ArrowRight 
} from 'lucide-react';

const ChappServices = () => {
  const services = [
    {
      icon: TrendingUp,
      title: 'Strategia Aziendale',
      description: 'Sviluppiamo strategie personalizzate per accelerare la crescita del tuo business e ottimizzare i processi operativi.',
      features: ['Analisi SWOT', 'Piano strategico', 'KPI e metriche'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Gestione del Cambiamento',
      description: 'Accompagniamo la tua organizzazione attraverso processi di trasformazione digitale e culturale.',
      features: ['Change management', 'Formazione team', 'Cultura aziendale'],
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Target,
      title: 'Marketing & Vendite',
      description: 'Ottimizziamo le tue strategie di marketing e vendita per massimizzare il ROI e la customer satisfaction.',
      features: ['Marketing strategy', 'Sales funnel', 'Customer journey'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovazione & R&D',
      description: 'Stimoliamo l\'innovazione nella tua azienda attraverso metodologie agili e approcci creativi.',
      features: ['Design thinking', 'Prototipazione', 'Innovation lab'],
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Trasformiamo i tuoi dati in insights strategici per decisioni informate e competitive.',
      features: ['Data analysis', 'Dashboard', 'Reporting avanzato'],
      color: 'from-rose-500 to-rose-600'
    },
    {
      icon: Cog,
      title: 'Ottimizzazione Processi',
      description: 'Miglioriamo l\'efficienza operativa attraverso l\'analisi e la reingegnerizzazione dei processi.',
      features: ['Process mapping', 'Lean management', 'Automazione'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section id="services" className="section-chapp bg-chapp-dark-card/30">
      <div className="container-chapp">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-chapp-accent-blue/20 text-chapp-accent-blue px-4 py-2 rounded-full text-body-sm font-semibold mb-6">
            I Nostri Servizi
          </div>
          <h2 className="text-display-md text-chapp-title mb-6">
            Soluzioni Complete per{' '}
            <span className="bg-gradient-to-r from-chapp-accent-blue to-chapp-accent-purple bg-clip-text text-transparent">Ogni Esigenza</span>
          </h2>
          <p className="text-body-xl text-chapp-body max-w-3xl mx-auto">
            Offriamo una gamma completa di servizi di consulenza strategica, 
            progettati per trasformare le sfide in opportunità di crescita sostenibile.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
          <div className="bg-gradient-to-br from-chapp-accent-blue to-chapp-accent-purple rounded-3xl p-12 text-center shadow-chapp-xl">
            <h3 className="text-heading-xl text-chapp-white mb-4">
              Hai bisogno di una consulenza personalizzata?
            </h3>
            <p className="text-body-lg text-chapp-white/90 mb-8 max-w-2xl mx-auto">
              I nostri esperti sono pronti ad analizzare le tue esigenze specifiche 
              e proporti la soluzione più adatta al tuo business.
            </p>
            <button className="btn-chapp-secondary hover-glow-blue">
              Prenota una Consulenza Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChappServices;
