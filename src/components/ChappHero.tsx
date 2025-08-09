
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const ChappHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero-dark">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-chapp-accent-blue/10 rounded-full blur-3xl opacity-50 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-chapp-accent-purple/10 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 container-chapp section-chapp text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-chapp-white/10 backdrop-blur-sm text-chapp-gray-200 px-6 py-3 rounded-full text-body-md font-medium mb-8 animate-fade-in shadow-chapp border border-chapp-white/20">
            <div className="w-2 h-2 bg-chapp-accent-blue rounded-full animate-glow"></div>
            Consulenza Premium
          </div>

          {/* Main heading */}
          <h1 className="text-hero sm:text-hero text-chapp-hero mb-8 animate-fade-in-up">
            Trasforma il tuo{' '}
            <span className="bg-gradient-to-r from-chapp-accent-blue to-chapp-accent-purple bg-clip-text text-transparent">
              Business
            </span>{' '}
            con Chapp
          </h1>

          {/* Subtitle */}
          <p className="text-body-xl text-chapp-body mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Consulenza strategica di alto livello per aziende ambiziose. 
            Accompagniamo la tua crescita con soluzioni innovative e personalizzate, 
            trasformando le sfide in opportunità concrete di successo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="btn-chapp-primary group hover-glow-blue">
              Scopri i Nostri Servizi
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="btn-chapp-secondary group">
              <Play size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Guarda la Presentazione
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { number: '250+', label: 'Clienti di Successo' },
              { number: '98%', label: 'Soddisfazione Cliente' },
              { number: '12+', label: 'Anni di Esperienza' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover-scale-dark"
              >
                <div className="text-display-lg text-chapp-title mb-2 group-hover:text-chapp-accent-blue transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-body-lg text-chapp-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-chapp-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-chapp-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default ChappHero;
