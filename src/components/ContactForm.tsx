
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    'Strategia Aziendale',
    'Gestione del Cambiamento',
    'Marketing & Vendite',
    'Innovazione & R&D',
    'Business Intelligence',
    'Ottimizzazione Processi'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('loading');

    // Simulazione invio form
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: ''
      });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Rimuovi errore quando l'utente inizia a digitare
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefono',
      details: ['+39 02 1234 5678', '+39 348 123 4567'],
      link: 'tel:+390212345678'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@consultpro.it', 'consulenza@consultpro.it'],
      link: 'mailto:info@consultpro.it'
    },
    {
      icon: MapPin,
      title: 'Sede',
      details: ['Via della Consulenza, 123', '20121 Milano, Italia'],
      link: 'https://maps.google.com'
    }
  ];

  return (
    <section id="contatti" className="section-padding bg-corporate-white">
      <div className="container-corporate">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-corporate-blue/10 text-corporate-blue px-4 py-2 rounded-full text-body-sm font-semibold mb-6">
            Contattaci
          </div>
          <h2 className="text-display-md text-display text-corporate-gray-dark mb-6">
            Inizia il Tuo{' '}
            <span className="text-corporate-blue">Percorso di Crescita</span>
          </h2>
          <p className="text-body-xl text-body max-w-3xl mx-auto">
            Siamo qui per ascoltare le tue esigenze e proporti la soluzione migliore. 
            Contattaci per una consulenza gratuita e senza impegno.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-heading-lg text-heading mb-8">
              Informazioni di Contatto
            </h3>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-corporate-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="text-corporate-blue" size={20} />
                  </div>
                  <div>
                    <h4 className="text-heading-sm text-heading mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-body">
                        {detailIndex === 0 && info.link ? (
                          <a 
                            href={info.link}
                            className="text-corporate-blue hover:text-corporate-blue-dark transition-colors duration-200"
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="mt-12 p-6 bg-corporate-gray-light/30 rounded-2xl">
              <h4 className="text-heading-sm text-heading mb-4">
                Orari di Lavoro
              </h4>
              <div className="space-y-2 text-body-sm text-body">
                <div className="flex justify-between">
                  <span>Lunedì - Venerdì</span>
                  <span>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabato</span>
                  <span>9:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domenica</span>
                  <span>Chiuso</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-corporate-gray-light/20 rounded-3xl p-8">
              <h3 className="text-heading-lg text-heading mb-8">
                Richiedi una Consulenza
              </h3>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <p className="text-green-800">
                    Messaggio inviato con successo! Ti contatteremo presto.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div>
                    <label htmlFor="name" className="block text-body-sm font-semibold text-corporate-gray-dark mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Il tuo nome"
                    />
                    {errors.name && (
                      <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-body-sm font-semibold text-corporate-gray-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="la.tua@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Azienda */}
                  <div>
                    <label htmlFor="company" className="block text-body-sm font-semibold text-corporate-gray-dark mb-2">
                      Azienda
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Nome dell'azienda"
                    />
                  </div>

                  {/* Telefono */}
                  <div>
                    <label htmlFor="phone" className="block text-body-sm font-semibold text-corporate-gray-dark mb-2">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                </div>

                {/* Servizio */}
                <div>
                  <label htmlFor="service" className="block text-body-sm font-semibold text-corporate-gray-dark mb-2">
                    Servizio di Interesse
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Seleziona un servizio</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Messaggio */}
                <div>
                  <label htmlFor="message" className="block text-body-sm font-semibold text-corporate-gray-dark mb-2">
                    Messaggio *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea ${errors.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Descrivi le tue esigenze e come possiamo aiutarti..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`btn-corporate-primary w-full justify-center flex items-center ${
                    status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      Invia Richiesta
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
