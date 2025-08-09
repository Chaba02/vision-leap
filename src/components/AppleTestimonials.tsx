
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const AppleTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Marco Rossi',
      role: 'CEO, TechInnovate',
      company: 'TechInnovate Srl',
      content: 'ConsultPro ha trasformato completamente il nostro approccio al mercato. In 6 mesi abbiamo visto un incremento del 150% del fatturato. La loro competenza e professionalità sono impareggiabili.',
      rating: 5,
      avatar: 'MR'
    },
    {
      name: 'Laura Bianchi',
      role: 'Founder, GreenEnergy',
      company: 'GreenEnergy Solutions',
      content: 'Il team di ConsultPro non si è limitato a fornire consulenza, ma è diventato un vero partner strategico. Hanno compreso perfettamente la nostra visione e ci hanno aiutato a realizzarla.',
      rating: 5,
      avatar: 'LB'
    },
    {
      name: 'Alessandro Verdi',
      role: 'Managing Director, FinanceCore',
      company: 'FinanceCore Group',
      content: 'Professionalità, competenza e risultati concreti. ConsultPro ha superato ogni aspettativa, guidandoci attraverso una complessa trasformazione digitale con risultati eccezionali.',
      rating: 5,
      avatar: 'AV'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-apple bg-apple-gray-50">
      <div className="container-apple">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 bg-apple-white px-4 py-2 rounded-full text-body-md font-medium text-apple-gray-600 mb-6 shadow-apple">
            Testimonianze
          </div>
          <h2 className="text-display-lg text-apple-title mb-6">
            Cosa dicono i nostri{' '}
            <span className="bg-gradient-to-r from-apple-night-blue to-apple-accent-blue bg-clip-text text-transparent">
              Clienti
            </span>
          </h2>
          <p className="text-body-xl text-apple-body max-w-2xl mx-auto">
            Le esperienze e i successi dei nostri partner parlano della qualità 
            del nostro lavoro e dell'impatto che generiamo insieme.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <div className="card-glass p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote size={80} className="text-apple-night-blue" />
            </div>

            {/* Stars */}
            <div className="flex justify-center mb-8">
              {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-yellow-400 fill-current"
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-body-xl text-apple-body text-center mb-8 leading-relaxed relative z-10">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-apple-night-blue to-apple-accent-blue rounded-full flex items-center justify-center text-apple-white font-medium text-body-lg">
                {currentTestimonial.avatar}
              </div>
              <div className="text-left">
                <div className="text-heading-md text-apple-title">
                  {currentTestimonial.name}
                </div>
                <div className="text-body-md text-apple-body">
                  {currentTestimonial.role}
                </div>
                <div className="text-body-sm text-apple-gray-500">
                  {currentTestimonial.company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-apple-white shadow-apple-md hover:shadow-apple-lg border border-apple-gray-200 flex items-center justify-center text-apple-gray-600 hover:text-apple-black transition-all duration-300 hover-scale"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-apple-accent-blue scale-125'
                      : 'bg-apple-gray-300 hover:bg-apple-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-apple-white shadow-apple-md hover:shadow-apple-lg border border-apple-gray-200 flex items-center justify-center text-apple-gray-600 hover:text-apple-black transition-all duration-300 hover-scale"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Additional Testimonials Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card-apple p-6 cursor-pointer transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-apple-accent-blue bg-apple-accent-blue/5' 
                  : 'hover:shadow-apple-lg hover-lift'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-apple-night-blue to-apple-accent-blue rounded-full flex items-center justify-center text-apple-white font-medium text-body-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-heading-sm text-apple-title">
                    {testimonial.name}
                  </div>
                  <div className="text-body-sm text-apple-body">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-body-md text-apple-body line-clamp-3">
                "{testimonial.content.substring(0, 120)}..."
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppleTestimonials;
