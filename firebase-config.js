/* Novatex EuroTier 2026 - collegamento a Firebase
   Finché qui resta null, l'app funziona come prima: dati solo sul telefono, senza accesso.
   Per attivare accesso e sincronizzazione, sostituisci null con il blocco firebaseConfig
   copiato dalla console di Firebase (Impostazioni progetto > Le tue app > App web), per esempio:

   window.FB_CFG = {
     apiKey: "AIza...",
     authDomain: "novatex-eurotier.firebaseapp.com",
     projectId: "novatex-eurotier",
     storageBucket: "novatex-eurotier.firebasestorage.app",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   };
*/
window.FB_CFG = null;
