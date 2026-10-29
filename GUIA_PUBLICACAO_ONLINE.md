# Guia Completo: Publicação Online e Instalação no iPhone

Este guia explica como transformar seu aplicativo de musculação em um app online seguro e acessível 24h por dia pelo iPhone, **mesmo com o computador totalmente desligado**, utilizando serviços 100% gratuitos do Google Cloud (Firebase) e Vercel/GitHub Pages.

---

## 📱 O que foi implementado

1. **Adaptação Total para iPhone / Mobile**:
   - Layout em **Cards ergonômicos**, eliminando a necessidade de rolar tabelas largas horizontalmente na academia.
   - Teclados numéricos nativos do iOS ativados automaticamente (`inputmode="decimal"` para carga e `inputmode="numeric"` para repetições e RIR).
   - Fonte mínima de 16px para evitar que o Safari dê zoom indesejado ao tocar nas caixas.
   - Botões de conveniência na esteira: **"Repetir carga"**, **"Preencher 3x8"** e **Cronômetro de descanso integrado** (com aviso sonoro e vibração).
   - Suporte a PWA (Progressive Web App): tela cheia no iPhone, sem barras de navegação do Safari.

2. **Protocolo de Treino Preservado (Mulher 27 anos · 5x/semana · Hipertrofia · Prioridade Tríceps)**:
   - **Treino A (Segunda)**: Quadríceps + Panturrilhas
   - **Treino B (Terça)**: Peito + Tríceps + Deltoide lateral *(Foco tríceps)*
   - **Treino C (Quarta)**: Posteriores + Panturrilhas + Abdômen
   - **Treino D (Quinta)**: Costas + Bíceps + Deltoide posterior
   - **Treino E (Sexta)**: Glúteos + Tríceps + Desenvolvimento *(Foco tríceps)*

3. **Sugestão de Progressão e Histórico**:
   - Regra mantida: se completar **8, 8 e 8 repetições** com técnica estável e **RIR 1-2**, o card exibe o selo verde **"🔥 Pode aumentar carga (+1 a 2 kg)"**. Caso contrário, indica **"🔁 Manter carga e buscar 3x8"**.
   - Histórico com filtros por divisão (Treinos A, B, C, D, E) e exclusão de registros pontuais.
   - Exportação e importação de backup em JSON compatível com seus dados existentes.

4. **Banco de Dados em Nuvem e Autenticação (Firebase)**:
   - Substituição do `localStorage` vulnerável do navegador por **Google Cloud Firestore**.
   - Login individual seguro com e-mail e senha.
   - **Persistência offline (Modo Academia)**: se o sinal 4G/Wi-Fi cair na academia, o app salva localmente e sincroniza na nuvem assim que a conexão voltar.

---

## 🚀 Passo a Passo: Publicando na Nuvem (100% Grátis e Permanente)

### Passo 1: Criar o Projeto Gratuito no Firebase
O Firebase é o serviço de nuvem da Google. O plano gratuito (*Spark*) oferece 50.000 leituras por dia (uma pessoa treinando usa cerca de 30 por dia, então nunca haverá custo algum).

1. Acesse: [https://console.firebase.google.com/](https://console.firebase.google.com/) e faça login com sua conta Google.
2. Clique em **"Adicionar projeto"** (ex: `treino-bruna`).
3. Desmarque o Google Analytics (opcional) e clique em **Criar projeto**.
4. No menu lateral esquerdo:
   - Vá em **Construção (Build)** > **Authentication** > **Primeiros passos**.
   - Escolha o provedor **E-mail/senha**, ative a primeira opção e clique em **Salvar**.
5. No menu lateral esquerdo:
   - Vá em **Construção (Build)** > **Firestore Database** > **Criar banco de dados**.
   - Escolha o local (ex: `southamerica-east1` [São Paulo] ou `us-east1`).
   - Escolha iniciar em **Modo de Produção**.
   - Na aba **Regras (Rules)** do Firestore, cole o conteúdo do arquivo `firestore.rules`:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId}/{document=**} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
     ```
   - Clique em **Publicar**.

### Passo 2: Obter as Chaves de Conexão
1. No Console do Firebase, clique na **engrenagem de Configurações** (no topo à esquerda) > **Configurações do projeto**.
2. Na aba **Geral**, desça até a seção **Seus aplicativos** e clique no ícone da Web **`</>`**.
3. Dê um apelido (ex: `treino-web`) e clique em **Registrar app**.
4. O Firebase exibirá um código como este:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyD-...",
     authDomain: "treino-bruna.firebaseapp.com",
     projectId: "treino-bruna",
     storageBucket: "treino-bruna.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   };
   ```
5. Você tem duas opções para colocar essas chaves no seu app:
   - **Opção A (Mais fácil)**: Cole essas chaves diretamente no arquivo `firebase-config.js`.
   - **Opção B**: Abra o app pelo celular, toque em `⚙️ Opções` > `Configurar Chaves da Nuvem` e cole lá.

---

### Passo 3: Hospedar o Site na Nuvem (Acesso com PC Desligado)

Para acessar do iPhone com o computador desligado, você precisa de uma URL pública na internet com HTTPS. Existem duas formas super rápidas e gratuitas:

#### Opção Recomendada: Vercel (Arrastar e Soltar - 30 segundos)
1. Acesse [https://vercel.com](https://vercel.com) e crie uma conta gratuita.
2. No painel da Vercel, clique em **"Add New..."** > **"Project"**.
3. Se tiver o projeto no GitHub, conecte diretamente. Ou, instale a ferramenta de linha de comando ou faça upload da pasta `app-online`.
4. Pronto! A Vercel fornecerá um link como `https://treino-bruna.vercel.app`.

#### Opção Alternativa: Firebase Hosting (Oficial Google)
1. No computador, abra o PowerShell e instale o Firebase CLI:
   ```powershell
   npm install -g firebase-tools
   ```
2. Na pasta `D:\bruna-trerinos\app-online`:
   ```powershell
   firebase login
   firebase init hosting
   # Escolha seu projeto existente
   # Diretório público: . (coloque um ponto)
   # Configure as a single-page app: No
   firebase deploy
   ```
3. O Firebase fornecerá uma URL imediata: `https://treino-bruna.web.app`.

---

## 📲 Passo 4: Instalando no iPhone (Como Aplicativo Nativo)

1. No seu iPhone, abra o navegador **Safari**.
2. Digite a URL gerada (ex: `https://treino-bruna.vercel.app` ou `https://treino-bruna.web.app`).
3. Toque no botão de **Compartilhar** do Safari (o ícone no rodapé com um quadrado e uma seta apontando para cima ⬆️).
4. Role as opções para baixo e toque em **"Adicionar à Tela de Início"** (ícone de `+`).
5. Digite o nome (ex: `Treino`) e toque em **Adicionar**.
6. Um ícone exclusivo de halter aparecerá na tela inicial do seu iPhone.
7. Ao abrir por esse ícone, o aplicativo abrirá em tela cheia, sem barra de navegação, exatamente como um aplicativo nativo baixado da App Store!

---

## 🔒 Como Criar sua Conta e Migrar Dados Anteriores

1. Ao abrir o aplicativo no celular pela primeira vez, toque em `⚙️ Opções` > `Entrar na Conta`.
2. Alterne para a aba **"Criar nova conta"**, digite seu e-mail e uma senha segura.
3. Se você tiver um backup JSON anterior:
   - Toque em `⚙️ Opções` > `📥 Importar Histórico de Backup`.
   - Selecione o arquivo `.json`.
   - Todos os treinos anteriores serão imediatamente transferidos para o banco em nuvem do Firebase.
4. Seu login permanecerá salvo no iPhone. Sempre que abrir na academia, seus últimos pesos e recomendações de carga já estarão carregados!
