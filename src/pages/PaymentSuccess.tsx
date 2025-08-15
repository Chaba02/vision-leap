import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-light text-neutral-900 mb-4 tracking-tight">
          Donazione Completata!
        </h1>
        
        <p className="text-neutral-600 mb-8 leading-relaxed">
          Grazie di cuore per la tua generosa donazione. Il tuo contributo ci aiuterà 
          a continuare la nostra missione di servizio alla comunità.
        </p>
        
        <div className="bg-neutral-50 rounded-2xl p-6 mb-8">
          <p className="text-sm text-neutral-600">
            Riceverai una ricevuta via email da Stripe con tutti i dettagli 
            della tua donazione.
          </p>
        </div>
        
        <Button 
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white px-6 py-3 rounded-full transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna alla Home</span>
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;