# 🌐 Nithusan.no – Porteføljeside

Koden bak min personlige portefølje: [www.nithusan.no](https://www.nithusan.no)

## 🚀 Funksjoner
- Personlig forside (hero) med tydelige CTA-knapper
- `Om meg`-seksjon med oppdatert profiltekst og bilde
- Prosjektseksjon med LiftOff-kort og detaljert prosjektmodal
- LiftOff-modal med lokale app-skjermbilder
- Tospåklig støtte (norsk/engelsk) via språkknapp
- Responsivt design for desktop og mobil
- Kontaktseksjon med e-post, LinkedIn og GitHub

## ⚙️ Teknologi
- HTML5
- CSS3
- JavaScript (vanilla)
- Tailwind CSS (CDN)
- Google Fonts (`Inter`, `Space Grotesk`)

## 📂 Struktur
```text
.
├── AGENTS.md
├── CNAME
├── README.md
├── index.html
├── script.js
├── style.css
├── tailwind-input.css
├── tailwind.config.js
├── tailwind.min.css
├── om-meg/
│   └── index.html
└── assets/
    ├── Nithusan_Krishnasamymudali_CV.pdf
    ├── profile-2026.webp
    ├── RakettApp_*.webp
    └── øvrige bilder og ikoner
```

## 🛠️ Lokal utvikling

Installer avhengighetene:

```sh
npm install
```

Bygg Tailwind-stilarket etter endringer i `tailwind-input.css` eller Tailwind-konfigurasjonen:

```sh
npm run build:css
```

Nettsiden er statisk og kan deretter åpnes via en lokal HTTP-server.
