
import React from 'react';
import { Users, Target, Award, TrendingUp, Sparkles, Monitor, Database, Zap, Clock } from 'lucide-react';

const ChappAbout = () => {
  const values = [
    {
      icon: Monitor,
      title: 'Web-App Scalabili',
      description: 'Piattaforme moderne con React/Next.js, ottimizzate per performance e user experience'
    },
    {
      icon: Database,
      title: 'Business Intelligence',
      description: 'Dashboard real-time con integrazione multi-sorgente e analytics predittive avanzate'
    },
    {
      icon: Zap,
      title: 'Delivery Veloce',
      description: 'Metodologia agile per consegne in 3-7 giorni, dal concept alla produzione'
    },
    {
      icon: Clock,
      title: 'Support 24/7',
      description: 'Monitoraggio continuo, aggiornamenti automatici e assistenza tecnica dedicata'
    }
  ];

  return (
    <section id="about" className="section-chapp bg-chapp-dark-bg responsive-padding">
      <div className="container-chapp">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Text Content */}
          <div className="animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-body-md font-medium text-chapp-gray-300 mb-6 sm:mb-8 shadow-chapp border border-chapp-white/20">
              <Sparkles size={16} className="text-chapp-accent-blue-vivid" />
              Chi Siamo
            </div>
            
            <h2 className="text-display-md sm:text-display-lg text-chapp-title mb-6 sm:mb-8 leading-tight">
              Specialisti in{' '}
              <span className="bg-gradient-blue-vivid bg-clip-text text-transparent">
                BI e Web-App
              </span>{' '}
              per il business
            </h2>
            
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <p className="text-body-lg sm:text-body-xl text-chapp-body leading-relaxed">
                <strong className="text-chapp-white">Chapp</strong> è il partner tecnologico specializzato 
                nello sviluppo di <strong className="text-chapp-white">dashboard Business Intelligence</strong> e 
                <strong className="text-chapp-white"> web-app scalabili</strong> per aziende che vogliono 
                trasformare i dati in vantaggio competitivo.
              </p>
              
              <p className="text-body-md sm:text-body-lg text-chapp-body leading-relaxed">
                Con oltre <strong className="text-chapp-accent-blue-vivid">12 anni di esperienza</strong> nel settore, 
                aiutiamo PMI di retail, e-commerce e logistica a ottenere insights real-time, 
                automazioni intelligenti e interfacce user-friendly che accelerano le decisioni di business.
              </p>

              <div className="bg-chapp-dark-card/50 rounded-2xl p-4 sm:p-6 border border-chapp-white/10">
                <p className="text-body-md text-chapp-accent-blue-light font-medium">
                  🎯 Il nostro focus: <span className="text-chapp-white">risultati misurabili in tempi record</span>, 
                  con soluzioni che si integrano perfettamente nei tuoi processi esistenti.
                </p>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="card-glass-dark p-4 sm:p-6 hover-lift-dark group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-blue-vivid rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-chapp-md group-hover:shadow-glow-blue transition-all duration-300">
                      <value.icon className="text-chapp-white" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-heading-md text-chapp-title mb-1 sm:mb-2 font-semibold">
                        {value.title}
                      </h4>
                      <p className="text-body-sm sm:text-body-md text-chapp-body leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="animate-on-scroll relative order-first xl:order-last">
            <div className="relative">
              {/* Main Visual */}
              <div className="card-premium-dark p-8 sm:p-12 text-center relative overflow-hidden min-h-80 sm:min-h-96 flex flex-col items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-chapp-accent-blue-vivid/10 via-transparent to-chapp-accent-blue-light/5"></div>
                
                {/* Content */}
                <div className="relative z-10 space-y-4 sm:space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-blue-vivid rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-chapp-lg mx-auto">
                    <Users className="text-chapp-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-heading-lg sm:text-heading-xl text-chapp-title font-semibold mb-2 sm:mb-3">
                      Il Team Chapp
                    </h3>
                    <p className="text-body-md sm:text-body-lg text-chapp-body mb-4 sm:mb-6">
                      Sviluppatori Full-Stack & Data Scientists
                    </p>
                    <div className="inline-flex items-center gap-2 bg-chapp-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-body-xs sm:text-body-sm font-medium text-chapp-gray-300 border border-chapp-white/20">
                      <Award size={12} />
                      Certificati React, Node.js & BI Tools
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 bg-chapp-accent-blue-vivid/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-12 sm:h-12 bg-chapp-accent-blue-light/10 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Stats Cards */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 card-glass-dark p-3 sm:p-6 shadow-chapp-lg">
                <div className="text-center">
                  <div className="text-display-sm sm:text-display-md text-chapp-title font-semibold mb-1">12+</div>
                  <div className="text-body-xs sm:text-body-sm text-chapp-body">Anni di Esperienza</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 card-glass-dark p-3 sm:p-6 shadow-chapp-lg">
                <div className="text-center">
                  <div className="text-display-sm sm:text-display-md text-chapp-title font-semibold mb-1">150+</div>
                  <div className="text-body-xs sm:text-body-sm text-chapp-body">Dashboard BI Sviluppate</div>
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
