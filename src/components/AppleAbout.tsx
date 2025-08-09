
import React from 'react';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-apple-white px-4 py-2 rounded-full text-body-md font-medium text-apple-gray-600 mb-6 shadow-apple">
              Chi Siamo
            </div>
            
            <h2 className="text-display-lg text-apple-title mb-6">
              La tua{' '}
              <span className="bg-gradient-to-r from-apple-night-blue to-apple-accent-blue bg-clip-text text-transparent">
                Partner
              </span>{' '}
              di fiducia
            </h2>
            
            <p className="text-body-xl text-apple-body mb-8 leading-relaxed">
              Siamo un team di consulenti esperti, uniti dalla passione per l'eccellenza 
              e l'innovazione. Con oltre 15 anni di esperienza nel settore, aiutiamo le 
              aziende a trasformare le sfide in opportunità di crescita.
            </p>
            
            <p className="text-body-lg text-apple-body mb-12">
              La nostra metodologia combina approcci tradizionali consolidati con 
              le più moderne tecniche di business development, garantendo risultati 
              concreti e misurabili.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-apple-white/60 transition-all duration-300 hover-scale"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-apple-night-blue to-apple-accent-blue rounded-xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="text-apple-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-heading-md text-apple-title mb-2">
                      {value.title}
                    </h4>
                    <p className="text-body-md text-apple-body">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="animate-on-scroll relative">
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="w-full h-96 bg-gradient-to-br from-apple-gray-100 to-apple-gray-200 rounded-3xl shadow-apple-xl flex items-center justify-center relative overflow-hidden">
                {/* Team Photo Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-apple-night-blue/20 to-apple-accent-blue/20"></div>
                <div className="relative z-10 text-center">
                  <Users className="mx-auto mb-4 text-apple-gray-400" size={48} />
                  <p className="text-body-lg text-apple-gray-600 font-medium">
                    Il Nostro Team
                  </p>
                  <p className="text-body-md text-apple-gray-500 mt-2">
                    Esperti al tuo servizio
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-apple-accent-blue/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-apple-night-blue/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-apple-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-apple-lg border border-apple-white/20">
              <div className="text-display-md text-apple-title mb-2">15+</div>
              <div className="text-body-md text-apple-body">Anni di Esperienza</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppleAbout;
