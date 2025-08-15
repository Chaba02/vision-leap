# Configurazione Stripe Checkout Diretto

## Setup Semplificato (Senza Backend)

### 1. Configurazione Stripe Dashboard

1. **Accedi al tuo Dashboard Stripe**
   - Vai su [https://dashboard.stripe.com](https://dashboard.stripe.com)
   - Se non hai un account, registrati gratuitamente

2. **Crea un Prodotto "Donazione"**
   - Vai su "Prodotti" nel menu laterale
   - Clicca "Aggiungi prodotto"
   - Nome: "Donazione"
   - Descrizione: "Donazione per la moschea"

3. **Crea i Prezzi Predefiniti**
   Crea questi 7 prezzi per il prodotto "Donazione":
   - €5.00 (una tantum)
   - €10.00 (una tantum)
   - €15.00 (una tantum)
   - €25.00 (una tantum)
   - €50.00 (una tantum)
   - €100.00 (una tantum)
   - €200.00 (una tantum)

   Per ogni prezzo, copia il **Price ID** che inizia con `price_...`

### 2. Configurazione del Codice

1. **Aggiorna `src/lib/stripe.ts`**
   - Sostituisci `pk_test_TU_CHIAVE_PUBLISHABLE_QUI` con la tua chiave pubblica Stripe
   - Aggiorna i `price_id` nel mapping `DONATION_PRICES` con quelli reali dal dashboard

   ```typescript
   export const DONATION_PRICES = {
     5: 'price_1ABC123def456ghi789',    // Il tuo price_id per €5
     10: 'price_1DEF456ghi789jkl012',   // Il tuo price_id per €10
     15: 'price_1GHI789jkl012mno345',   // Il tuo price_id per €15
     25: 'price_1JKL012mno345pqr678',   // Il tuo price_id per €25
     50: 'price_1MNO345pqr678stu901',   // Il tuo price_id per €50
     100: 'price_1PQR678stu901vwx234',  // Il tuo price_id per €100
     200: 'price_1STU901vwx234yzab567'  // Il tuo price_id per €200
   };
   ```

### 3. Trova le Tue Chiavi API

**Modalità Test:**
- Dashboard > Developers > API keys
- Usa la "Publishable key" che inizia con `pk_test_...`

**Modalità Live (produzione):**
- Stessa sezione, ma usa la chiave che inizia con `pk_live_...`

### 4. Test con Carte di Prova

Per testare i pagamenti in modalità test, usa queste carte:

- **Successo**: `4242 4242 4242 4242`
- **Errore generico**: `4000 0000 0000 0002`
- **Carta scaduta**: `4000 0000 0000 0069`
- **CVC non valido**: `4000 0000 0000 0127`

Usa qualsiasi data futura e CVC a 3 cifre.

### 5. Funzionalità Implementate

✅ **Pagamenti sicuri** tramite Stripe Checkout  
✅ **7 importi predefiniti** (€5, €10, €15, €25, €50, €100, €200)  
✅ **Donazioni anonime** (email opzionale)  
✅ **Pagine di successo e cancellazione**  
✅ **Design responsive**  
✅ **Ricevute automatiche** via email da Stripe  
✅ **Nessun backend richiesto**  

### 6. Andare in Produzione

1. **Attiva il tuo account Stripe**
   - Completa la verifica dell'account nel dashboard
   - Fornisci le informazioni bancarie per ricevere i pagamenti

2. **Aggiorna le chiavi**
   - Sostituisci `pk_test_...` con `pk_live_...` in `src/lib/stripe.ts`
   - Crea nuovi prodotti e prezzi in modalità live
   - Aggiorna i `price_id` con quelli di produzione

3. **Testa il flusso completo**
   - Prova tutti gli importi di donazione
   - Verifica le email di ricevuta
   - Controlla che i pagamenti arrivino nel tuo conto

### 7. Vantaggi di Questo Approccio

- **Sicurezza massima**: Nessun dato sensibile nel tuo codice
- **Semplicità**: Nessun server backend necessario
- **Conformità PCI**: Gestita completamente da Stripe
- **Ricevute automatiche**: Inviate da Stripe ai donatori
- **Dashboard completo**: Monitora donazioni, statistiche e rimborsi

### Supporto

Per problemi con questa implementazione:
1. Controlla la console del browser per errori
2. Verifica che le chiavi API siano corrette
3. Assicurati che i `price_id` siano validi e in modalità live/test corretta