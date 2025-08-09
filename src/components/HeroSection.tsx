
import React from 'react';
import { ArrowRight, CheckCircle, TrendingUp, Users, Award } from 'lucide-react';

const HeroSection = () => {
  const achievements = [
    { icon: Users, label: '500+ Clienti', value: 'Soddisfatti' },
    { icon: TrendingUp, label: '95% ROI', value: 'Medio' },
    { icon: Award, label: '15+ Anni', value: 'Esperienza' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-corporate-blue-light/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-corporate-accent-gold/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative z-10 container-corporate section-padding text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-corporate-white/20 backdrop-blur-sm text-corporate-white px-6 py-3 rounded-full text-body-sm font-semibold mb-8 animate-fade-in">
            <CheckCircle size={16} />
            Consulenza Strategica di Eccellenza
          </div>

          {/* Main heading */}
          <h1 className="text-display-xl md:text-display-xl text-display text-corporate-white mb-6 animate-fade-in-up">
            Trasformiamo le{' '}
            <span className="text-corporate-accent-gold">Tue Idee</span>{' '}
            in Successi Concreti
          </h1>

          {/* Subtitle */}
          <p className="text-body-xl text-corporate-white/90 mb-12 max-w-3xl mx-auto animate-fade-in-up [animation-delay:200ms]">
            Supportiamo le aziende nella crescita attraverso strategie innovative, 
            consulenza specializzata e soluzioni su misura. Il tuo successo è la nostra missione.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up [animation-delay:400ms]">
            <button className="btn-corporate-primary group">
              Inizia la Tua Trasformazione
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="btn-corporate-secondary">
              Scopri i Nostri Servizi
            </button>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up [animation-delay:600ms]">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-corporate-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-corporate-white/20 hover:bg-corporate-white/20 transition-all duration-300"
              >
                <achievement.icon className="mx-auto mb-4 text-corporate-accent-gold" size={32} />
                <div className="text-heading-md text-corporate-white mb-1">
                  {achievement.label}
                </div>
                <div className="text-body-md text-corporate-white/80">
                  {achievement.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-corporate-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-corporate-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
