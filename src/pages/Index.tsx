
import React, { useEffect } from 'react';
import AppleNavbar from '../components/AppleNavbar';
import AppleHero from '../components/AppleHero';
import AppleAbout from '../components/AppleAbout';
import AppleServices from '../components/AppleServices';
import AppleTestimonials from '../components/AppleTestimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Intersection Observer per le animazioni scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Osserva tutti gli elementi con classe animate-on-scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-apple-white">
      <AppleNavbar />
      <AppleHero />
      <AppleAbout />
      <AppleServices />
      <AppleTestimonials />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
