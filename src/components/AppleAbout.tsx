
import React from 'react';
import { Users, Target, Award, TrendingUp, Sparkles } from 'lucide-react';

const AppleAbout = () => {
  const values = [
    {
      icon: Target,
      title: 'Precisione',
      description: 'Ogni strategia è studiata nel dettaglio per massimizzare i risultati'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Lavoriamo fianco a fianco con i nostri clienti per raggiungere gli obiettivi'
    },
    {
      icon: Award,
      title: 'Eccellenza',
      description: 'Standard qualitativi elevati in ogni progetto che intraprendiamo'
    },
    {
      icon: TrendingUp,
      title: 'Innovazione',
      description: 'Metodologie all\'avanguardia per rimanere sempre un passo avanti'
    }
  ];

  return (
    <section id="about" className="section-apple bg-apple-gray-50">
      <div className="container-apple">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-apple-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-body-md font-medium text-apple-gray-600 mb-8 shadow-apple border border-apple-gray-200/60">
              <Sparkles size={16} className="text-apple-accent-blue" />
              Chi Siamo
            </div>
            
            <h2 className="text-display-lg text-apple-title mb-8 leading-tight">
              Il tuo{' '}
              <span className="bg-gradient-to-r from-apple-night-blue to-apple-accent-blue bg-clip-text text-transparent">
                partner strategico
              </span>{' '}
              di fiducia
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-body-xl text-apple-body leading-relaxed">
                Siamo un team di consulenti esperti, uniti dalla passione per l'eccellenza 
                e l'innovazione. Con oltre 15 anni di esperienza nel settore, aiutiamo le 
                aziende a trasformare le sfide in opportunità di crescita.
              </p>
              
              <p className="text-body-lg text-apple-body leading-relaxed">
                La nostra metodologia combina approcci tradizionali consolidati con 
                le più moderne tecniche di business development, garantendo risultati 
                concreti e misurabili per ogni nostro cliente.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="card-glass p-6 hover-lift group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-apple-night-blue to-apple-accent-blue rounded-2xl flex items-center justify-center flex-shrink-0 shadow-apple-md group-hover:shadow-apple-lg transition-all duration-300">
                      <value.icon className="text-apple-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-heading-md text-apple-title mb-2 font-semibold">
                        {value.title}
                      </h4>
                      <p className="text-body-md text-apple-body leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="animate-on-scroll relative">
            <div className="relative">
              {/* Main Visual */}
              <div className="card-premium p-12 text-center relative overflow-hidden min-h-96 flex flex-col items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-apple-night-blue/5 via-transparent to-apple-accent-blue/5"></div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-apple-night-blue to-apple-accent-blue rounded-3xl flex items-center justify-center shadow-apple-lg mx-auto">
                    <Users className="text-apple-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-heading-xl text-apple-title font-semibold mb-3">
                      Il Nostro Team
                    </h3>
                    <p className="text-body-lg text-apple-body mb-6">
                      Professionisti esperti al tuo servizio
                    </p>
                    <div className="inline-flex items-center gap-2 bg-apple-white/60 px-4 py-2 rounded-full text-body-sm font-medium text-apple-gray-700 border border-apple-gray-200/60">
                      <Award size={14} />
                      Certificati e Qualificati
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-apple-accent-blue/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-apple-night-blue/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Stats Cards */}
              <div className="absolute -bottom-6 -left-6 card-glass p-6 shadow-apple-lg">
                <div className="text-center">
                  <div className="text-display-md text-apple-title font-semibold mb-1">15+</div>
                  <div className="text-body-sm text-apple-body">Anni di Esperienza</div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 card-glass p-6 shadow-apple-lg">
                <div className="text-center">
                  <div className="text-display-md text-apple-title font-semibold mb-1">500+</div>
                  <div className="text-body-sm text-apple-body">Clienti Soddisfatti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppleAbout;
