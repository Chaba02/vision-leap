import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, Shield, BookOpen, CreditCard, ArrowRight, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SectionHeader from "./SectionHeader";
import stripePromise, { DONATION_PRICES } from "@/lib/stripe";

const donationSchema = z.object({
  amount: z.string()
    .min(1, "L'importo è obbligatorio")
    .refine((val) => {
      const num = parseFloat(val);
      const validAmounts = [5, 10, 15, 25, 50, 100];
      return !isNaN(num) && validAmounts.includes(num);
    }, "Seleziona uno degli importi predefiniti"),
  name: z.string().optional(),
  email: z.string().email("Email non valida").optional().or(z.literal(""))
});

type DonationFormData = z.infer<typeof donationSchema>;

const DonazioniSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "",
      name: "",
      email: ""
    }
  });

  const watchedAmount = form.watch("amount");
  const predefinedAmounts = [5, 10, 15, 25, 50, 100];

  const handlePredefinedAmount = (amount: number) => {
    form.setValue("amount", amount.toString());
    form.clearErrors("amount");
  };

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe non è stato caricato correttamente');

      const amount = parseFloat(data.amount);
      const priceId = DONATION_PRICES[amount as keyof typeof DONATION_PRICES];
      if (!priceId) throw new Error('Importo non supportato. Seleziona uno degli importi predefiniti.');

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-canceled`,
        customerEmail: data.email || undefined,
      });

      if (error) throw error;

    } catch (error: any) {
      console.error('Errore Stripe:', error);
      toast.error("Errore durante la donazione", {
        description: error.message || "Si è verificato un errore. Riprova più tardi."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const donationPurposes = [
    { icon: Heart, title: "Supporto alla Comunità", description: "Sostieni le attività quotidiane e i servizi per la comunità" },
    { icon: Shield, title: "Manutenzione della Moschea", description: "Contribuisci alla cura e al mantenimento della struttura" },
    { icon: BookOpen, title: "Programmi Educativi", description: "Finanzia corsi e attività educative per bambini e adulti" }
  ];

  return (
    <section id="donazioni" className="min-h-screen bg-white flex flex-col items-center justify-center py-16">
      <div className="max-w-7xl w-full px-6">
        {/* Header */}
        <SectionHeader 
          title="Sostieni la Nostra Missione"
          variant="center-highlight"
          className="mb-14"
        />

        {/* Cards e Form Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mx-auto mb-12 sm:mb-16">
          
          {/* Cards */}
          {donationPurposes.map((purpose, index) => (
            <div
              key={index}
              className="w-full bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center mb-4">
                <purpose.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#1877F2]" />
              </div>
              <h4 className="font-medium text-neutral-900 text-sm sm:text-base md:text-lg mb-2">{purpose.title}</h4>
              <p className="text-neutral-600 text-xs sm:text-sm md:text-base font-light">{purpose.description}</p>
            </div>
          ))}

          {/* Form spanning full width */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 w-full">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 w-full">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                  
                  {/* Predefined Amounts */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-neutral-900">Scegli un importo</FormLabel>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          {predefinedAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              className={`h-12 rounded-full border font-medium text-sm transition-all duration-300 ${
                                watchedAmount === amount.toString() 
                                  ? "bg-[#1877F2] text-white border-[#1877F2] shadow-lg" 
                                  : "bg-white text-neutral-700 border-neutral-300 hover:border-[#1877F2] hover:text-[#1877F2]"
                              }`}
                              onClick={() => handlePredefinedAmount(amount)}
                            >
                              €{amount}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-neutral-500 mt-2">Sono disponibili solo gli importi predefiniti sopra</p>
                        <FormMessage className="text-red-500 text-xs flex items-center gap-1">
                          {form.formState.errors.amount && (
                            <>
                              <AlertCircle className="w-3 h-3" />
                              {form.formState.errors.amount.message}
                            </>
                          )}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  {/* Donor Info */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-neutral-900">Nome (opzionale)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Il tuo nome" className="w-full h-12 px-4 rounded-full border-neutral-300 text-sm font-light focus:border-[#1877F2] focus:ring-[#1877F2]/20"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-neutral-900">Email (opzionale)</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} placeholder="la-tua-email@esempio.com" className="w-full h-12 px-4 rounded-full border-neutral-300 text-sm font-light focus:border-[#1877F2] focus:ring-[#1877F2]/20"/>
                          </FormControl>
                          <FormMessage className="text-red-500 text-xs flex items-center gap-1">
                            {form.formState.errors.email && (
                              <>
                                <AlertCircle className="w-3 h-3" />
                                {form.formState.errors.email.message}
                              </>
                            )}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Payment Info */}
                  <div className="bg-[#1877F2]/5 rounded-2xl p-4 border border-[#1877F2]/20 flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-[#1877F2]" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Pagamento Sicuro con Stripe</p>
                      <p className="text-xs text-neutral-600">Carta di credito/debito, Apple Pay, Google Pay</p>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button 
                    type="submit"
                    disabled={isSubmitting || !watchedAmount}
                    className="group w-full flex justify-center items-center overflow-hidden rounded-xl bg-[#1877F2]/90 backdrop-blur-md px-6 py-6 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#1877F2]/100 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-xl animate-spin"></div>
                        <span>Elaborazione...</span>
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>Dona Ora €{watchedAmount || "0"}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-neutral-500 text-center font-light leading-relaxed">
                    Pagamento sicuro tramite Stripe. Nessuna informazione di carta viene salvata.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonazioniSection;
