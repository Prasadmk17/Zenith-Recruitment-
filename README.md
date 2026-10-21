# Zenith Recrutare SRL — Website Oficial

Un website modern, ultra-rapid și complet optimizat pentru o companie românească de recrutare și servicii HR (**Zenith Recrutare SRL**).

Construit conform standardelor web moderne (HTML5 semantic, CSS3 Vanilla și JavaScript pur), fără framework-uri greoaie sau pași complicați de compilare/build, gata pentru găzduire pe orice platformă (Netlify, Vercel, GitHub Pages, cPanel/Apache, Nginx etc.).

---

## 📁 Structura Proiectului

```text
ZENITH RECRUITMENT/
├── index.html            # Main Homepage (English - Primary Language)
├── services.html         # Recruitment Sectors & Job Categories (English)
├── about.html            # About Us, Mission & Team (English)
├── contact.html          # Contact Form & Office Location (English)
├── ro/                   # Versiunea în limba Română (Limba Secundară)
│   ├── index.html        # Pagina Principală (Română)
│   ├── servicii.html     # Domenii de Recrutare & Categorii (Română)
│   ├── despre-noi.html   # Despre Noi, Misiune & Echipă (Română)
│   └── contact.html      # Formular Contact & Sediu (Română)
├── favicon.svg           # Favicon SVG personalizat cu inițialele "ZR"
├── ASSETS/               # Sigla oficială a companiei (logo.jpg)
├── css/
│   └── style.css         # Sistem complet de design, selector de limbă, responsive
├── js/
│   └── main.js           # Navigare mobilă, antet fix, formulare bilingve, modale
├── images/               # Director pentru imagini locale
└── README.md             # Ghid complet de administrare și lansare
```

---

## 🌐 Suport Bilingv (Engleză Principală 🇬🇧 / Română Secundară 🇷🇴)

Site-ul oferă o experiență bilingvă completă cu limba engleză ca limbă principală și română ca limbă secundară:
- **Limba Principală (Engleză)**: Disponibilă direct la rădăcina site-ului (`/index.html`, `/services.html`, `/about.html`, `/contact.html`).
- **Limba Secundară (Română)**: Disponibilă în folderul `/ro/` (`/ro/index.html`, `/ro/servicii.html`, `/ro/despre-noi.html`, `/ro/contact.html`).
- **Selector de limbă în Header**: Buton elegant `RO | EN` disponibil instantaneu în bara de navigare superioară.
- **Selector în Meniul Mobil**: În sertarul glisant (hamburger menu) pe ecrane de smartphone/tabletă.
- **Navigare sincronizată între pagini echivalente**:
  - `index.html` (EN) ⇄ `ro/index.html` (RO)
  - `services.html` (EN) ⇄ `ro/servicii.html` (RO)
  - `about.html` (EN) ⇄ `ro/despre-noi.html` (RO)
  - `contact.html` (EN) ⇄ `ro/contact.html` (RO)
- **Optimizare SEO Internațională**: Toate paginile conțin etichete canonice `hreflang` (`en`, `ro`, `x-default`) pentru indexare optimă în motoarele de căutare.


---

## 🎨 Identitate Vizuală și Paletă de Culori

- **Deep Navy** (`#0B1F3A`): Autoritate, încredere, sobrietate premium.
- **Warm Gold** (`#C9A227`): Prestigiul parteneriatului, atenție la detalii.
- **Off-White / Neutral Body** (`#FAF9F6`, `#FFFFFF`): Spațiere aerisită, lizibilitate maximă.
- **Tipografie**:
  - Titluri: `Playfair Display` (serif rafinat, elegant)
  - Text & UI: `Plus Jakarta Sans` (sans-serif contemporan, lizibilitate excelentă cu diacritice românești complete: *ă, â, î, ș, ț*)

---

## ✏️ Cum se Editează Textul și Datele Companiei

Toate fișierele HTML conțin comentarii clare care marchează secțiunile cheie.

### 1. Datele juridice și de contact (Footer & Contact)
Deschideți `index.html`, `servicii.html`, `despre-noi.html` și `contact.html` și căutați comentariul `Date Companie`:
- **Adresă**: Loc. Bragadiru, Str. Diamantului 86 A, Ap. 6, Cod 077025, Jud. Ilfov
- **Telefon**: `+40 769 133 037`
- **Email**: `zenithrecrutareromania@gmail.com`
- **CUI**: `47594287`
- **Nr. Reg. Comerțului**: `J2023002308408`
- **Autorizație ANOFM**: `Seria B nr. 000452/2023`

### 2. Cifrele statistice (în `despre-noi.html` și `about.html`)
În bannerul `<div class="stats-banner">`, numerele animate sunt definite prin atributele:
- `data-count="450"` (numărul până la care numără animația)
- `data-suffix="+"` sau `data-suffix="%"`

---

## 🖼️ Înlocuirea Imaginilor

Imaginile actuale folosesc placeholder-e de înaltă rezoluție de pe Unsplash marcate cu comentarii explicite `PLACEHOLDER IMAGE`.

Pentru a folosi propriile fotografii:
1. Copiați imaginile dorite în directorul `images/` (ex: `images/sediu-companie.jpg`, `images/birou-consultanta.jpg`).
2. Înlocuiți atributul `src` în fișierul HTML corespunzător:
   ```html
   <!-- Înainte: -->
   <img src="https://images.unsplash.com/photo-..." alt="...">

   <!-- După: -->
   <img src="images/sediu-companie.jpg" alt="Sediu Zenith Recrutare">
   ```
3. Păstrați dimensiunile recomandate pentru încărcare optimă (format `.webp` sau `.jpg` comprimat):
   - Hero / Banners: 1200x800px sau 800x650px
   - Portrete echipă: 600x630px (raport 1:1 sau 4:5)
   - Cartonașe industrii: 600x400px

---

## 📬 Conectarea Formularului de Contact (Formspree)

Formularul din `contact.html` este configurat să trimită direct datele (și fișierele CV atașate) către serviciul gratuit/freemium **Formspree**:

1. Creați un cont gratuit pe [formspree.io](https://formspree.io/).
2. Creați un formular nou (ex: *Zenith Recruitment Website*).
3. Copiați ID-ul generat (ex: `xbjvlqpo`).
4. Deschideți `contact.html` și actualizați atributul `action`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xbjvlqpo" method="POST" enctype="multipart/form-data">
   ```
5. Mesajele și fișierele încărcate vor sosi automat în căsuța dumneavoastră de e-mail și în dashboard-ul Formspree.

---

## 🚀 Cum se Publică (Deployment)

Fiind un site static pur (fără Node.js/PHP necesar pe server), îl puteți găzdui pe oricare dintre variantele următoare:

### Opțiunea 1: Netlify (Recomandat — Gratuit și Rapid)
1. Mergeți pe [app.netlify.com](https://app.netlify.com/).
2. Trageți cu mouse-ul folderul complet `ZENITH RECRUITMENT` în zona **"Drag & Drop your site folder"**.
3. Site-ul este online în 10 secunde, cu certificat SSL HTTPS automat.

### Opțiunea 2: GitHub Pages
1. Inițializați un depozit Git în folder:
   ```bash
   git init
   git add .
   git commit -m "Initial launch"
   ```
2. Publicați codul pe GitHub și activați **Pages** din *Settings > Pages* pe branch-ul `main`.

### Opțiunea 3: Gazduire Clasică cPanel / Apache / Nginx
1. Încărcați toate fișierele direct în directorul `public_html/` prin FTP (FileZilla) sau File Manager din cPanel.

---

## 🔒 Confidențialitate & GDPR

- Site-ul include un banner discret de consimțământ pentru module cookie conform directivelor europene.
- Sunt incluse ferestre modale complete și redactate profesional pentru:
  - **Politica de confidențialitate (GDPR)**
  - **Politica de utilizare a modulelor cookie**
- Ambele pot fi accesate din subsolul oricărei pagini sau din bannerul de consimțământ.
