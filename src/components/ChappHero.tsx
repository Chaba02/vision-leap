
import React from 'react';
import { ArrowRight, Play, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ChappHero = () => {
  const { t } = useLanguage();

  const handleGetStarted = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscoverMore = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero-dark">
      {/* Dynamic Glowing Spheres Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sphere 1 - Blue */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-sphere-blue rounded-full blur-3xl animate-float-sphere-1"></div>
        
        {/* Sphere 2 - Purple */}
        <div className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-sphere-purple rounded-full blur-3xl animate-float-sphere-2"></div>
        
        {/* Sphere 3 - Cyan */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-sphere-cyan rounded-full blur-3xl animate-float-sphere-3"></div>
        
        {/* Sphere 4 - Pink */}
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-sphere-pink rounded-full blur-3xl animate-float-sphere-4"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-chapp section-chapp text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-chapp-accent-blue/20 text-chapp-accent-blue px-6 py-3 rounded-full text-body-md font-medium mb-8 animate-fade-in shadow-chapp border border-chapp-accent-blue/30">
            <div className="w-2 h-2 bg-chapp-accent-blue rounded-full animate-glow"></div>
            ✨ {t('Dove le idee prendono vita digitale')}
          </div>

          {/* Main heading with glow effect */}
          <h1 className="text-hero sm:text-hero text-chapp-hero mb-6 animate-fade-in-up leading-tight">
            {t('Trasformiamo idee in')}{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              successo
            </span>{' '}
            digitale
          </h1>

          {/* Subtitle */}
          <p className="text-body-xl text-chapp-body mb-12 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            {t('Web-app moderne e dashboard intelligenti per far crescere il tuo business. Sviluppo rapido, risultati concreti.')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={handleGetStarted}
              className="btn-chapp-primary group hover-glow-blue"
            >
              {t('Accelera le tue idee')}
              <Rocket size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              onClick={handleDiscoverMore}
              className="btn-chapp-secondary group"
            >
              <Play size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              {t('Scopri come funziona')}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { number: '+40%', label: t('Produttività') },
              { number: '3x', label: t('Velocità') },
              { number: '60%', label: t('Tempi ridotti') }
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
