
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const AppleHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-apple-gray-100 rounded-full blur-3xl opacity-50 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-apple-silver/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 container-apple section-apple text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-apple-white/80 backdrop-blur-sm text-apple-gray-700 px-6 py-3 rounded-full text-body-md font-medium mb-8 animate-fade-in shadow-apple">
            <div className="w-2 h-2 bg-apple-accent-blue rounded-full animate-glow"></div>
            Consulenza di Eccellenza
          </div>

          {/* Main heading */}
          <h1 className="text-hero sm:text-hero text-apple-hero mb-8 animate-fade-in-up">
            Trasforma le tue{' '}
            <span className="bg-gradient-to-r from-apple-night-blue to-apple-accent-blue bg-clip-text text-transparent">
              Idee
            </span>{' '}
            in Successo
          </h1>

          {/* Subtitle */}
          <p className="text-body-xl text-apple-body mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Accompagniamo le aziende verso l'eccellenza attraverso strategie innovative, 
            consulenza personalizzata e soluzioni su misura. Il tuo successo è la nostra missione.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="btn-apple-primary group">
              Scopri di Più
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="btn-apple-secondary group">
              <Play size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              Guarda il Video
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { number: '500+', label: 'Clienti Soddisfatti' },
              { number: '95%', label: 'Tasso di Successo' },
              { number: '15+', label: 'Anni di Esperienza' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover-scale"
              >
                <div className="text-display-lg text-apple-title mb-2 group-hover:text-apple-accent-blue transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-body-lg text-apple-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-apple-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-apple-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default AppleHero;
