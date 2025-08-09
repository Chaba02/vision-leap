
import React from 'react';
import { Users, Target, Award, TrendingUp, Sparkles } from 'lucide-react';

const ChappAbout = () => {
  const values = [
    {
      icon: Target,
      title: 'Precisione',
      description: 'Strategie mirate e analisi dettagliate per risultati concreti'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Collaborazione stretta e fiducia reciproca con ogni cliente'
    },
    {
      icon: Award,
      title: 'Eccellenza',
      description: 'Standard qualitativi premium in ogni progetto che sviluppiamo'
    },
    {
      icon: TrendingUp,
      title: 'Crescita',
      description: 'Focus costante sulla crescita sostenibile del tuo business'
    }
  ];

  return (
    <section id="about" className="section-chapp bg-chapp-dark-bg">
      <div className="container-chapp">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-body-md font-medium text-chapp-gray-300 mb-8 shadow-chapp border border-chapp-white/20">
              <Sparkles size={16} className="text-chapp-accent-blue" />
              Chi Siamo
            </div>
            
            <h2 className="text-display-lg text-chapp-title mb-8 leading-tight">
              Il tuo{' '}
              <span className="bg-gradient-to-r from-chapp-accent-blue to-chapp-accent-purple bg-clip-text text-transparent">
                partner strategico
              </span>{' '}
              di fiducia
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-body-xl text-chapp-body leading-relaxed">
                Chapp è un team di consulenti esperti specializzati in trasformazione 
                aziendale e crescita strategica. Con oltre 12 anni di esperienza nel settore, 
                aiutiamo le aziende a navigare la complessità del mercato moderno.
              </p>
              
              <p className="text-body-lg text-chapp-body leading-relaxed">
                La nostra metodologia combina approcci analitici rigorosi con 
                soluzioni creative innovative, garantendo risultati misurabili 
                e sostenibili per ogni nostro cliente.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="card-glass-dark p-6 hover-lift-dark group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-chapp-accent-blue to-chapp-accent-purple rounded-2xl flex items-center justify-center flex-shrink-0 shadow-chapp-md group-hover:shadow-glow-blue transition-all duration-300">
                      <value.icon className="text-chapp-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-heading-md text-chapp-title mb-2 font-semibold">
                        {value.title}
                      </h4>
                      <p className="text-body-md text-chapp-body leading-relaxed">
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
              <div className="card-premium-dark p-12 text-center relative overflow-hidden min-h-96 flex flex-col items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-chapp-accent-blue/5 via-transparent to-chapp-accent-purple/5"></div>
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-chapp-accent-blue to-chapp-accent-purple rounded-3xl flex items-center justify-center shadow-chapp-lg mx-auto">
                    <Users className="text-chapp-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-heading-xl text-chapp-title font-semibold mb-3">
                      Il Team Chapp
                    </h3>
                    <p className="text-body-lg text-chapp-body mb-6">
                      Esperti dedicati al tuo successo
                    </p>
                    <div className="inline-flex items-center gap-2 bg-chapp-white/10 px-4 py-2 rounded-full text-body-sm font-medium text-chapp-gray-300 border border-chapp-white/20">
                      <Award size={14} />
                      Certificati e Qualificati
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-chapp-accent-blue/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-chapp-accent-purple/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Stats Cards */}
              <div className="absolute -bottom-6 -left-6 card-glass-dark p-6 shadow-chapp-lg">
                <div className="text-center">
                  <div className="text-display-md text-chapp-title font-semibold mb-1">12+</div>
                  <div className="text-body-sm text-chapp-body">Anni di Esperienza</div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 card-glass-dark p-6 shadow-chapp-lg">
                <div className="text-center">
                  <div className="text-display-md text-chapp-title font-semibold mb-1">250+</div>
                  <div className="text-body-sm text-chapp-body">Clienti di Successo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChappAbout;
