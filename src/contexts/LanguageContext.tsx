
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  IT: {
    // Navbar
    'Chi Siamo': 'Chi Siamo',
    'Servizi': 'Servizi',
    'Testimonianze': 'Testimonianze',
    'Contatti': 'Contatti',
    'Inizia Ora': 'Inizia Ora',
    
    // Hero
    'Dove le idee prendono vita digitale': 'Dove le idee prendono vita digitale',
    'Trasformiamo idee in successo digitale': 'Trasformiamo idee in successo digitale',
    'Web-app moderne e dashboard intelligenti per far crescere il tuo business. Sviluppo rapido, risultati concreti.': 'Web-app moderne e dashboard intelligenti per far crescere il tuo business. Sviluppo rapido, risultati concreti.',
    'Accelera le tue idee': 'Accelera le tue idee',
    'Scopri come funziona': 'Scopri come funziona',
    'Produttività': 'Produttività',
    'Velocità': 'Velocità',
    'Tempi ridotti': 'Tempi ridotti',
    
    // Dashboard
    'Demo Business Intelligence': 'Demo Business Intelligence',
    'Dashboard Intelligente': 'Dashboard Intelligente',
    'Un esempio delle dashboard che creiamo per i nostri clienti. Dati in tempo reale, visualizzazioni chiare, decisioni informate.': 'Un esempio delle dashboard che creiamo per i nostri clienti. Dati in tempo reale, visualizzazioni chiare, decisioni informate.',
    'Dashboard Aziendale': 'Dashboard Aziendale',
    'Fatturato Totale': 'Fatturato Totale',
    'Andamento Fatturato': 'Andamento Fatturato',
    'Vai alla Dashboard': 'Vai alla Dashboard',
    'Richiedi una Demo Personalizzata': 'Richiedi una Demo Personalizzata',
    'Scopri come possiamo creare soluzioni simili per il tuo business': 'Scopri come possiamo creare soluzioni simili per il tuo business',
    
    // Contact Form
    'Contattaci': 'Contattaci',
    'Inizia il Tuo Progetto Digitale': 'Inizia il Tuo Progetto Digitale',
    'Contattaci per una consulenza gratuita e personalizzata. Il nostro team di esperti è pronto ad analizzare le tue esigenze tecnologiche.': 'Contattaci per una consulenza gratuita e personalizzata. Il nostro team di esperti è pronto ad analizzare le tue esigenze tecnologiche.',
    'Richiedi una Consulenza Gratuita': 'Richiedi una Consulenza Gratuita',
    'Prenota Consulenza Gratuita': 'Prenota Consulenza Gratuita'
  },
  EN: {
    // Navbar
    'Chi Siamo': 'About Us',
    'Servizi': 'Services',
    'Testimonianze': 'Testimonials',
    'Contatti': 'Contact',
    'Inizia Ora': 'Get Started',
    
    // Hero
    'Dove le idee prendono vita digitale': 'Where ideas come to digital life',
    'Trasformiamo idee in successo digitale': 'Transform ideas into digital success',
    'Web-app moderne e dashboard intelligenti per far crescere il tuo business. Sviluppo rapido, risultati concreti.': 'Modern web-apps and intelligent dashboards to grow your business. Fast development, concrete results.',
    'Accelera le tue idee': 'Accelerate your ideas',
    'Scopri come funziona': 'Discover how it works',
    'Produttività': 'Productivity',
    'Velocità': 'Speed',
    'Tempi ridotti': 'Reduced time',
    
    // Dashboard
    'Demo Business Intelligence': 'Business Intelligence Demo',
    'Dashboard Intelligente': 'Smart Dashboard',
    'Un esempio delle dashboard che creiamo per i nostri clienti. Dati in tempo reale, visualizzazioni chiare, decisioni informate.': 'An example of the dashboards we create for our clients. Real-time data, clear visualizations, informed decisions.',
    'Dashboard Aziendale': 'Business Dashboard',
    'Fatturato Totale': 'Total Revenue',
    'Andamento Fatturato': 'Revenue Trend',
    'Vai alla Dashboard': 'Go to Dashboard',
    'Richiedi una Demo Personalizzata': 'Request a Custom Demo',
    'Scopri come possiamo creare soluzioni simili per il tuo business': 'Discover how we can create similar solutions for your business',
    
    // Contact Form
    'Contattaci': 'Contact Us',
    'Inizia il Tuo Progetto Digitale': 'Start Your Digital Project',
    'Contattaci per una consulenza gratuita e personalizzata. Il nostro team di esperti è pronto ad analizzare le tue esigenze tecnologiche.': 'Contact us for a free and personalized consultation. Our team of experts is ready to analyze your technological needs.',
    'Richiedi una Consulenza Gratuita': 'Request a Free Consultation',
    'Prenota Consulenza Gratuita': 'Book Free Consultation'
  },
  FR: {
    // Navbar
    'Chi Siamo': 'À Propos',
    'Servizi': 'Services',
    'Testimonianze': 'Témoignages',
    'Contatti': 'Contact',
    'Inizia Ora': 'Commencer',
    
    // Hero
    'Dove le idee prendono vita digitale': 'Où les idées prennent vie numérique',
    'Trasformiamo idee in successo digitale': 'Transformons les idées en succès numérique',
    'Web-app moderne e dashboard intelligenti per far crescere il tuo business. Sviluppo rapido, risultati concreti.': 'Applications web modernes et tableaux de bord intelligents pour développer votre entreprise. Développement rapide, résultats concrets.',
    'Accelera le tue idee': 'Accélérez vos idées',
    'Scopri come funziona': 'Découvrez comment ça marche',
    'Produttività': 'Productivité',
    'Velocità': 'Vitesse',
    'Tempi ridotti': 'Temps réduits',
    
    // Dashboard
    'Demo Business Intelligence': 'Démo Business Intelligence',
    'Dashboard Intelligente': 'Tableau de Bord Intelligent',
    'Un esempio delle dashboard che creiamo per i nostri clienti. Dati in tempo reale, visualizzazioni chiare, decisioni informate.': 'Un exemple des tableaux de bord que nous créons pour nos clients. Données en temps réel, visualisations claires, décisions éclairées.',
    'Dashboard Aziendale': 'Tableau de Bord Entreprise',
    'Fatturato Totale': 'Chiffre d\'Affaires Total',
    'Andamento Fatturato': 'Tendance du Chiffre d\'Affaires',
    'Vai alla Dashboard': 'Aller au Tableau de Bord',
    'Richiedi una Demo Personalizzata': 'Demander une Démo Personnalisée',
    'Scopri come possiamo creare soluzioni simili per il tuo business': 'Découvrez comment nous pouvons créer des solutions similaires pour votre entreprise',
    
    // Contact Form
    'Contattaci': 'Contactez-nous',
    'Inizia il Tuo Progetto Digitale': 'Commencez Votre Projet Numérique',
    'Contattaci per una consulenza gratuita e personalizzata. Il nostro team di esperti è pronto ad analizzare le tue esigenze tecnologiche.': 'Contactez-nous pour une consultation gratuite et personnalisée. Notre équipe d\'experts est prête à analyser vos besoins technologiques.',
    'Richiedi una Consulenza Gratuita': 'Demander une Consultation Gratuite',
    'Prenota Consulenza Gratuita': 'Réserver Consultation Gratuite'
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('IT');

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
