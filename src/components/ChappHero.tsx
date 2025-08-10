
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const ChappHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero-vivid">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-chapp-accent-blue-vivid/20 rounded-full blur-3xl opacity-50 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 sm:w-80 sm:h-80 bg-chapp-accent-blue-light/15 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 container-chapp section-chapp text-center responsive-padding">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm text-chapp-gray-200 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-body-sm sm:text-body-md font-medium mb-6 sm:mb-8 animate-fade-in shadow-chapp border border-chapp-white/20">
            <div className="w-2 h-2 bg-chapp-accent-blue-vivid rounded-full animate-glow"></div>
            Specialisti BI & Web-App
          </div>

          {/* Main heading */}
          <h1 className="text-hero-xs sm:text-hero-sm lg:text-hero text-chapp-hero mb-6 sm:mb-8 animate-fade-in-up leading-[1.1]">
            Dashboard e Web-App{' '}
            <span className="bg-gradient-blue-vivid bg-clip-text text-transparent">
              su misura
            </span>{' '}
            in pochi giorni
          </h1>

          {/* Subtitle */}
          <p className="text-body-lg sm:text-body-xl text-chapp-body mb-8 sm:mb-12 max-w-4xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Trasformiamo i tuoi dati in <strong className="text-chapp-white">insights strategici</strong> con 
            piattaforme di Business Intelligence e web-app scalabili. 
            <span className="hidden sm:inline"> Design premium, integrazione rapida, risultati immediati per retail, e-commerce e logistica.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="btn-chapp-primary group w-full sm:w-auto">
              Richiedi Demo Gratuita
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="btn-chapp-secondary group w-full sm:w-auto">
              <Play size={16} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Guarda i Casi Studio
            </button>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { 
                number: '3-7', 
                unit: 'giorni', 
                label: 'Delivery Rapido',
                description: 'Dal brief alla dashboard live'
              },
              { 
                number: '150+', 
                unit: 'progetti', 
                label: 'BI Sviluppati',
                description: 'Piattaforme analytics consegnate'
              },
              { 
                number: '99%', 
                unit: 'uptime', 
                label: 'Affidabilità',
                description: 'Sempre online, sempre aggiornate'
              },
              { 
                number: '24/7', 
                unit: 'support', 
                label: 'Supporto Continuo',
                description: 'Assistenza tecnica dedicata'
              }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover-scale-dark"
              >
                <div className="text-display-sm sm:text-display-md text-chapp-title mb-1 group-hover:text-chapp-accent-blue-vivid transition-colors duration-300 font-bold">
                  {stat.number}
                </div>
                <div className="text-body-sm text-chapp-accent-blue-light font-medium mb-1">
                  {stat.unit}
                </div>
                <div className="text-body-md sm:text-body-lg text-chapp-white font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-body-sm text-chapp-body hidden sm:block">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-chapp-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-chapp-gray-300 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default ChappHero;
