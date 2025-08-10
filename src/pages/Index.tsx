
import React, { useEffect } from 'react';
import ChappNavbar from '../components/ChappNavbar';
import ChappHero from '../components/ChappHero';
import ChappAbout from '../components/ChappAbout';
import ChappServices from '../components/ChappServices';
import ChappContactForm from '../components/ChappContactForm';
import ChappFooter from '../components/ChappFooter';

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
    <div className="min-h-screen bg-chapp-dark-bg overflow-x-hidden">
      <ChappNavbar />
      <ChappHero />
      <ChappAbout />
      <ChappServices />
      <ChappContactForm />
      <ChappFooter />
    </div>
  );
};

export default Index;
