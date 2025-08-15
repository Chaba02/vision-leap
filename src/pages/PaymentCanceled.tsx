import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentCanceled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const scrollToDonations = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const donationsSection = document.getElementById('donazioni');
      if (donationsSection) {
        donationsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-orange-600" />
        </div>
        
        <h1 className="text-3xl font-light text-neutral-900 mb-4 tracking-tight">
          Pagamento Annullato
        </h1>
        
        <p className="text-neutral-600 mb-8 leading-relaxed">
          Il pagamento è stato annullato. Nessun addebito è stato effettuato 
          sulla tua carta. Puoi riprovare quando vuoi.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={scrollToDonations}
            className="w-full inline-flex items-center justify-center space-x-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white px-6 py-3 rounded-full transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Riprova Donazione</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna alla Home</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;