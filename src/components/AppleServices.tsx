
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Lightbulb, 
  BarChart3, 
  Cog,
  ArrowUpRight 
} from 'lucide-react';

const AppleServices = () => {
  const services = [
    {
      icon: TrendingUp,
      title: 'Strategia Aziendale',
      description: 'Sviluppiamo strategie personalizzate per accelerare la crescita e ottimizzare i processi operativi del tuo business.',
      features: ['Analisi di mercato', 'Piano strategico', 'KPI e metriche'],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Change Management',
      description: 'Accompagniamo la tua organizzazione attraverso processi di trasformazione digitale e culturale.',
      features: ['Gestione del cambiamento', 'Formazione team', 'Cultura aziendale'],
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Target,
      title: 'Marketing Strategy',
      description: 'Ottimizziamo le strategie di marketing per massimizzare il ROI e la customer satisfaction.',
      features: ['Digital marketing', 'Brand positioning', 'Customer journey'],
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Lab',
      description: 'Stimoliamo l\'innovazione attraverso metodologie agili e approcci creativi.',
      features: ['Design thinking', 'Prototipazione', 'MVP development'],
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Trasformiamo i dati in insights strategici per decisioni informate e competitive.',
      features: ['Data analysis', 'Dashboard', 'Predictive analytics'],
      gradient: 'from-rose-500 to-rose-600'
    },
    {
      icon: Cog,
      title: 'Process Optimization',
      description: 'Miglioriamo l\'efficienza operativa attraverso l\'analisi dei processi.',
      features: ['Process mapping', 'Lean methodology', 'Automazione'],
      gradient: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section id="services" className="section-apple bg-apple-white">
      <div className="container-apple">
        {/* Header */}
        <div className="text-center mb-20 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-apple-gray-100 text-apple-gray-600 px-4 py-2 rounded-full text-body-md font-medium mb-6">
            I Nostri Servizi
          </div>
          <h2 className="text-display-lg text-apple-title mb-6">
            Soluzioni{' '}
            <span className="bg-gradient-to-r from-apple-night-blue to-apple-accent-blue bg-clip-text text-transparent">
              Su Misura
            </span>
          </h2>
          <p className="text-body-xl text-apple-body max-w-3xl mx-auto">
            Offriamo una gamma completa di servizi progettati per trasformare 
            le sfide in opportunità di crescita concrete e misurabili.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-apple p-8 group hover-lift animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-apple-md`}>
                <service.icon className="text-white" size={24} />
              </div>

              {/* Content */}
              <h3 className="text-heading-lg text-apple-title mb-4">
                {service.title}
              </h3>
              <p className="text-body-lg text-apple-body mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-body-md text-apple-body">
                    <div className="w-1.5 h-1.5 bg-apple-accent-blue rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="btn-apple-ghost group/btn w-full justify-between flex items-center">
                Scopri di più
                <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-on-scroll">
          <div className="card-glass p-12 max-w-4xl mx-auto">
            <h3 className="text-display-md text-apple-title mb-6">
              Hai un progetto in mente?
            </h3>
            <p className="text-body-xl text-apple-body mb-8 max-w-2xl mx-auto">
              I nostri consulenti sono pronti ad analizzare le tue esigenze 
              e proporti la soluzione più efficace per il tuo business.
            </p>
            <button className="btn-apple-primary">
              Consulenza Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppleServices;
