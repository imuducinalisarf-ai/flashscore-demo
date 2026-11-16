===============================================================
  FlashScore România – Website Scoruri Live Fotbal
  Proiect Web Frontend – Laborator
===============================================================

DESCRIERE PROIECT
-----------------
FlashScore România este un website de tip livescore/flashscore
pentru fotbal, construit exclusiv din HTML5, CSS3 și JavaScript
vanilla (fără framework-uri externe sau backend).

Proiectul simulează o platformă completă de scoruri live, cu:
- Meciuri live din 6 campionate majore
- Statistici detaliate per meci și per jucător
- Clasamente complete cu formă recentă
- Sistem de pariuri simulat (fără bani reali)
- Autentificare simulată cu localStorage
- Panel de administrare (UI)

---------------------------------------------------------------

ARHITECTURA PROIECTULUI
-----------------------

flashscore-project/
│
├── css/
│   ├── main.css        – Stiluri globale, variabile CSS, navbar, footer
│   ├── matches.css     – Carduri meciuri, cote pariuri, slip bilet
│   ├── league.css      – Pagina ligă: clasament, marcatori, formă
│   ├── auth.css        – Login, register, profil utilizator
│   ├── admin.css       – Panel administrare
│   ├── contact.css     – Pagina contact
│   └── gallery.css     – Galerie foto și slideshow
│
├── js/
│   ├── data.js         – Date fake: ligi, echipe, meciuri, clasamente
│   ├── app.js          – Utilitare comune: auth, navbar, toast, ticker
│   ├── matches.js      – Randare meciuri, modal detalii, simulare live
│   ├── betting.js      – Sistem bilet pariuri (simulat)
│   ├── league.js       – Pagina ligă: clasament, marcatori, formă
│   ├── auth.js         – Login/register/profil cu localStorage
│   ├── admin.js        – Panel admin: utilizatori, meciuri, statistici
│   └── gallery.js      – Slideshow automat și galerie foto
│
├── images/             – Director pentru imagini locale (opțional)
│
├── index.html          – Homepage cu meciuri live și statistici rapide
├── matches.html        – Toate meciurile cu filtrare și căutare
├── league.html         – Detaliu ligă (clasament, marcatori, formă)
├── login.html          – Autentificare utilizator
├── register.html       – Înregistrare cont nou
├── profile.html        – Profil utilizator, favorite, istoricul pariurilor
├── admin.html          – Panel administrare (doar pentru admini)
├── contact.html        – Formular contact, hartă Google Maps, social media
├── gallery.html        – Galerie foto cu slideshow automat la 3 secunde
└── readme.txt          – Documentație proiect

---------------------------------------------------------------

FUNCȚIONALITĂȚI PRINCIPALE
---------------------------

A. LIGI ȘI MECIURI
  - 6 campionate: Premier League, La Liga, Serie A,
    Bundesliga, Ligue 1, Superliga României
  - Meciuri cu status: LIVE, FT (finalizat), HT (pauză), NS (programat)
  - Simulare live: minutul și scorul se actualizează automat
  - Ticker live în bara de sus
  - Grupare meciuri pe ligi, colapsabile

B. DETALII MECI (click pe orice meci)
  - Statistici: posesie, șuturi, faulturi, cornere, cartonașe
  - Bara de statistici vizuală (comparativ)
  - Evenimente: goluri, cartonașe cu minutele aferente
  - Cote pariuri cu posibilitate de selecție directă

C. CLASAMENTE
  - Tabel complet: poziție, puncte, golaveraj, formă ultimele 5 meciuri
  - Indicator culoare pentru CL/EL/retrogradare
  - Legendă explicativă

D. STATISTICI CAMPIONATE
  - Top 5 marcatori per ligă (goluri, assist-uri, meciuri)
  - Tabel de formă echipe (performanța ultimelor 5 meciuri)
  - Statistici sumare: meciuri live, goluri/meci, lider

E. SISTEM PARIURI (SIMULAT)
  - Click pe cotă → adaugă la biletul din sidebar
  - Bilet cu maxim 10 selecții
  - Calcul cotă totală în timp real
  - Câștig potențial calculat automat
  - Istoric bilete salvat în localStorage
  - IMPORTANT: NU sunt bani reali, sistem educațional

F. UTILIZATOR (simulat cu localStorage)
  - Înregistrare / Autentificare / Deconectare
  - Salvare echipe și ligi favorite
  - Istoricul pariurilor plasate
  - Editare profil
  - Date de test admin: admin@flashscore.ro / admin123

G. ADMIN PANEL (UI)
  - Acces restricționat (doar rol admin)
  - Dashboard cu statistici
  - Gestionare utilizatori (CRUD simulat)
  - Gestionare meciuri (editare, ștergere simulat)
  - Gestionare ligi
  - Jurnal activitate

H. GALERIE
  - Slideshow automat la 3 secunde
  - Butoane prev/next
  - Dots și thumbstrip pentru navigare
  - Bară de progres animată
  - Lightbox fullscreen
  - Suport tastatura (←/→/Escape) și swipe touch
  - Grid galerie suplimentar

I. CONTACT
  - Formular de contact cu validare
  - Google Maps embed (locatie București)
  - Social media links (Twitter, Facebook, Instagram, YouTube, Telegram)
  - Secțiune FAQ cu accordion

---------------------------------------------------------------

INSTRUCȚIUNI DE RULARE
-----------------------

Opțiunea 1 (Recomandat) – Live Server VS Code:
  1. Deschide folderul în Visual Studio Code
  2. Instalează extensia "Live Server" (ritwickdey.LiveServer)
  3. Click dreapta pe index.html → "Open with Live Server"
  4. Se deschide automat în browser la http://localhost:5500

Opțiunea 2 – Fișier direct în browser:
  1. Deschide folderul proiectului
  2. Dublu-click pe index.html
  NOTĂ: Unele imagini externe pot fi blocate fără server HTTP.

Opțiunea 3 – Orice server HTTP simplu:
  - Python: python -m http.server 8080
  - Node.js: npx serve .
  Apoi deschide http://localhost:8080

CONT DE TEST ADMIN:
  Email: admin@flashscore.ro
  Parolă: admin123

---------------------------------------------------------------

TEHNOLOGII UTILIZATE
--------------------
  - HTML5 (semantic markup, meta viewport)
  - CSS3 (variabile custom, flexbox, grid, animații, responsive)
  - JavaScript ES6+ (vanilla, fără framework-uri)
  - Google Fonts (Inter)
  - localStorage API (persistență date client-side)
  - Picsum Photos API (imagini placeholder pentru galerie)
  - Google Maps Embed API (hartă contact)

---------------------------------------------------------------

DESIGN
------
  - Dark mode (temă închisă), inspirat din Flashscore
  - Paleta: #0e0e10 background, #00c2ff accent, #22c55e verde, #ef4444 roșu
  - Responsive: mobile, tablet, desktop
  - Animații: hover effects, transitions, pulse pentru LIVE, ticker scroll
  - Componente reutilizabile: navbar, cards, badges, tabs, filters

---------------------------------------------------------------

CERINȚE RESPECTATE
------------------
  ✓ HTML5, CSS3 în fișiere separate
  ✓ JavaScript vanilla, organizat pe module
  ✓ Structură clară folderele css/, js/, images/
  ✓ Design responsive (mobile + desktop)
  ✓ Dark mode modern
  ✓ Navigare funcțională între toate paginile
  ✓ Homepage cu meciuri live
  ✓ Pagina meciuri cu filtrare și căutare
  ✓ Pagina ligă cu clasament, marcatori, formă
  ✓ Login / Register / Edit Profile
  ✓ Admin panel UI complet
  ✓ Pagina contact cu formular + hartă + social media
  ✓ Galerie cu slideshow automat la 3 secunde
  ✓ Sistem pariuri simulat cu bilet
  ✓ Favorite echipe/ligi (localStorage)
  ✓ Componentă ticker live
  ✓ Modal detalii meci cu statistici
  ✓ readme.txt cu documentație completă

---------------------------------------------------------------

ARHIVARE
--------
Arhiva trebuie să se numească conform cerințelor:
  Grupa.Nume.Prenume.TemaWebLaborator.zip

Exemplu:
  3101.Popescu.Ion.TemaWebLaborator.zip

Conținut arhivă (fără folderul rădăcină):
  /css/
  /js/
  /images/
  index.html
  matches.html
  league.html
  login.html
  register.html
  profile.html
  admin.html
  contact.html
  gallery.html
  readme.txt


