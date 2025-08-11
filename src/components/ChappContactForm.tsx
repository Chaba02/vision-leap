
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, User, Mail, Building, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ChappContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    try {
      // Invio email usando un servizio di email
      const emailData = {
        to: 'omarchaabani22@gmail.com',
        subject: `Nuova richiesta di consulenza da ${formData.name}`,
        html: `
          <h2>Nuova richiesta di consulenza</h2>
          <p><strong>Nome:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Azienda:</strong> ${formData.company || 'Non specificata'}</p>
          <p><strong>Messaggio:</strong></p>
          <p>${formData.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Messaggio inviato dal sito web il ${new Date().toLocaleString('it-IT')}</small></p>
        `,
        text: `
          Nuova richiesta di consulenza
          
          Nome: ${formData.name}
          Email: ${formData.email}
          Azienda: ${formData.company || 'Non specificata'}
          
          Messaggio:
          ${formData.message}
          
          Messaggio inviato dal sito web il ${new Date().toLocaleString('it-IT')}
        `
      };

      // Per ora simuliamo l'invio - in produzione useresti un servizio come EmailJS o un backend
      console.log('Email da inviare:', emailData);
      
      // Simulazione di una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Errore nell\'invio:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Remove error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  return (
    <section id="contact" className="section-chapp bg-chapp-dark-bg px-6 sm:px-8 lg:px-20">
      <div className="container-chapp-narrow">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-chapp-accent-blue/20 text-chapp-accent-blue px-4 py-2 rounded-full text-body-sm font-semibold mb-6 border border-chapp-accent-blue/30">
            {t('Contattaci')}
          </div>
          <h2 className="text-display-md text-chapp-title mb-6">
            {t('Inizia il Tuo')}{' '}
            <span className="bg-gradient-blue-elegant bg-clip-text text-transparent">
              Progetto Digitale
            </span>
          </h2>
          <p className="text-body-xl text-chapp-body max-w-2xl mx-auto">
            {t('Contattaci per una consulenza gratuita e personalizzata. Il nostro team di esperti è pronto ad analizzare le tue esigenze tecnologiche.')}
          </p>
        </div>

        {/* Contact Form */}
        <div className="card-premium-dark p-8 lg:p-12 max-w-3xl mx-auto">
          <h3 className="text-heading-xl text-chapp-title mb-8 text-center">
            {t('Richiedi una Consulenza Gratuita')}
          </h3>

          {status === 'success' && (
            <div className="mb-8 p-4 bg-green-900/20 border border-green-500/30 rounded-2xl flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <p className="text-green-400">
                Messaggio inviato con successo! Ti contatteremo presto.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-2xl flex items-center gap-3">
              <AlertCircle className="text-red-400" size={20} />
              <p className="text-red-400">
                Errore nell'invio del messaggio. Riprova più tardi.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-body-sm font-semibold text-chapp-white mb-3">
                  <User size={16} className="text-chapp-accent-blue" />
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-chapp ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Il tuo nome"
                />
                {errors.name && (
                  <p className="mt-2 text-body-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-body-sm font-semibold text-chapp-white mb-3">
                  <Mail size={16} className="text-chapp-accent-blue" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-chapp ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="la.tua@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-body-sm text-red-400 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Azienda */}
            <div>
              <label htmlFor="company" className="flex items-center gap-2 text-body-sm font-semibold text-chapp-white mb-3">
                <Building size={16} className="text-chapp-accent-blue" />
                Azienda
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-chapp"
                placeholder="Nome dell'azienda (opzionale)"
              />
            </div>

            {/* Messaggio */}
            <div>
              <label htmlFor="message" className="flex items-center gap-2 text-body-sm font-semibold text-chapp-white mb-3">
                <MessageSquare size={16} className="text-chapp-accent-blue" />
                Messaggio *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`form-textarea-chapp ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                placeholder="Descrivi il tuo progetto web o le tue esigenze di Business Intelligence..."
              />
              {errors.message && (
                <p className="mt-2 text-body-sm text-red-400 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`btn-chapp-accent w-full justify-center flex items-center hover-glow-blue ${
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
                  {t('Prenota Consulenza Gratuita')}
                  <Send size={18} className="ml-2" />
                </>
              )}
            </button>

            <p className="text-body-sm text-chapp-gray-400 text-center">
              Rispettiamo la tua privacy. Le informazioni fornite verranno utilizzate 
              esclusivamente per contattarti in merito alla tua richiesta.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChappContactForm;
