
import React, { useEffect } from 'react';
import AppleNavbar from '../components/AppleNavbar';
import AppleHero from '../components/AppleHero';
import AppleAbout from '../components/AppleAbout';
import AppleServices from '../components/AppleServices';
import AppleTestimonials from '../components/AppleTestimonials';
import ContactForm from '../components/ContactForm';
import AppleFooter from '../components/AppleFooter';

const Index = () => {
  useEffect(() => {
    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-apple-white overflow-x-hidden">
      <AppleNavbar />
      <AppleHero />
      <AppleAbout />
      <AppleServices />
      <AppleTestimonials />
      <ContactForm />
      <AppleFooter />
    </div>
  );
};

export default Index;
