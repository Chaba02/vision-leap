import { loadStripe } from '@stripe/stripe-js';

// IMPORTANTE: Sostituisci con la tua Stripe publishable key
// Puoi trovarla nel tuo dashboard Stripe > Developers > API keys
const stripePromise = loadStripe(
  // Per ora usa la tua chiave di test
  'pk_test_51Rw53S2LnQWBUjMvnEzEW356sORvggqw4bOtMWcwHF6KFRNrWlgqZFQqIyq5HSryIYyYrou4P6Da217UIFuImJVD005C4Jo8u4'
  // Quando vai in produzione, sostituisci con: 'pk_live_TUA_CHIAVE_LIVE_QUI'
);

// Mapping degli importi ai price_id di Stripe
// IMPORTANTE: Sostituisci con i tuoi price_id dal dashboard Stripe
export const DONATION_PRICES = {
  5: 'price_1Rw5Pv2LnQWBUjMvRElpgGPr',
  10: 'price_1Rw5QX2LnQWBUjMvA7IxmRUZ', 
  15: 'price_1Rw5Qk2LnQWBUjMvrIC6bUNr',
  25: 'price_1Rw5Qs2LnQWBUjMviFlWlj0q',
  50: 'price_1Rw5R32LnQWBUjMvRklrthdS',
  100: 'price_1Rw5RF2LnQWBUjMvJkIME2Qs',
  200: 'price_TUO_PRICE_ID_200_EUR'
};

export default stripePromise;