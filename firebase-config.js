/**
 * CONFIGURAÇÃO DO FIREBASE (NUVEM)
 * 
 * Para ativar o salvamento na nuvem e o acesso com o PC desligado:
 * 1. Acesse https://console.firebase.google.com/
 * 2. Crie um projeto gratuito (Plano Spark - 100% grátis para sempre).
 * 3. Ative o 'Authentication' (com o provedor 'E-mail/senha').
 * 4. Ative o 'Cloud Firestore' (em modo de produção ou teste).
 * 5. Em 'Configurações do Projeto' > 'Seus aplicativos' > Adicionar app Web </>, copie o objeto e cole abaixo:
 */

window.FIREBASE_CONFIG = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
