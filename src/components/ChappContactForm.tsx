
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, User, Mail, Building, MessageSquare } from 'lucide-react';

const ChappContactForm = () => {
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

    // Simulation of form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
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
    <section id="contact" className="section-chapp bg-chapp-dark-bg">
      <div className="container-chapp-narrow">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-chapp-accent-blue/20 text-chapp-accent-blue px-4 py-2 rounded-full text-body-sm font-semibold mb-6">
            Contattaci
          </div>
          <h2 className="text-display-md text-chapp-title mb-6">
            Inizia il Tuo{' '}
            <span className="bg-gradient-to-r from-chapp-accent-blue to-chapp-accent-purple bg-clip-text text-transparent">
              Percorso di Crescita
            </span>
          </h2>
          <p className="text-body-xl text-chapp-body max-w-2xl mx-auto">
            Contattaci per una consulenza gratuita e personalizzata. 
            Il nostro team di esperti è pronto ad analizzare le tue esigenze.
          </p>
        </div>

        {/* Contact Form */}
        <div className="card-premium-dark p-8 lg:p-12 max-w-3xl mx-auto">
          <h3 className="text-heading-xl text-chapp-title mb-8 text-center">
            Richiedi una Consulenza Gratuita
          </h3>

          {status === 'success' && (
            <div className="mb-8 p-4 bg-green-900/20 border border-green-500/30 rounded-2xl flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <p className="text-green-400">
                Messaggio inviato con successo! Ti contatteremo presto.
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
                placeholder="Descrivi le tue esigenze e come possiamo aiutarti a raggiungere i tuoi obiettivi..."
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
                  Richiedi Consulenza
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
