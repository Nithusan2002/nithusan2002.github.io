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
- Egen norsk produktside for Poengjeger med interesseliste, support og personvern

## ⚙️ Teknologi
- HTML5
- CSS3
- JavaScript (vanilla)
- Tailwind CSS (lokalt generert og versjonert)
- Lokalt hostede fonter (`Inter`, `Space Grotesk`)

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
│   └── index.html          # Videresender til /#om-meg
├── poengjeger/
│   ├── AGENTS.md
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── config.js
│   ├── assets/
│   ├── support/index.html
│   └── personvern/index.html
└── assets/
    ├── Nithusan_Krishnasamymudali_CV.pdf
    ├── profile-2026.webp
    ├── RakettApp_*.webp
    └── øvrige bilder og ikoner
```

## 🛠️ Lokal utvikling

Installer avhengighetene:

```sh
npm ci
```

Bygg Tailwind-stilarket etter endringer i Tailwind-klasser, `tailwind-input.css` eller Tailwind-konfigurasjonen:

```sh
npm run build:css
```

`tailwind.min.css` er generert og skal ikke redigeres manuelt. Konfigurasjonen
skanner `index.html` og `script.js`; nye filer med Tailwind-klasser må legges
til i `content` i `tailwind.config.js`.

Start en lokal HTTP-server fra roten av repoet (krever Python 3):

```sh
python3 -m http.server 8000
```

Åpne [localhost:8000](http://localhost:8000/). Stopp serveren med `Ctrl+C`.
Nettsiden publiseres via GitHub Pages med eget domene konfigurert i `CNAME`.

## Poengjeger

`/poengjeger/` er en separat, norskspråklig produktside med egne CSS- og
JavaScript-filer. Support ligger på `/poengjeger/support/` og personvern på
`/poengjeger/personvern/`.

Interesselisten bruker `waitlistEndpoint` i `poengjeger/config.js` og sender
en JSON-forespørsel til Supabase Edge Function `join-waitlist`. Nettleseren
sender e-post, samtykke, honeypot-feltet `company` og kilde. Backendkoden
ligger ikke i dette repoet. URL-en er offentlig konfigurasjon; hemmelige
nøkler skal ikke legges i nettsidens filer.

Ved lokal formsjekk: bruk en simulert respons eller et testendepunkt for å
unngå registreringer i den aktive interesselisten. Se
[Poengjeger-instruksjonene](poengjeger/AGENTS.md).

## Kontroll før publisering

Repoet har foreløpig ingen automatisert CI eller testpakke. Sjekk relevante
sider manuelt etter endringer:

- Forsiden og `/#om-meg` på desktop og mobil, og videresendingen fra `/om-meg/`.
- Norsk og engelsk porteføljeinnhold, språkknapp, navigasjon og prosjektmodaler.
- Lenker og nettleserkonsollen for feil.
- Ved Poengjeger-endringer: produktsiden, support, personvern og interesselistens
  validering og statusmeldinger med simulert respons eller testendepunkt.
- Kjør `npm run build:css` når Tailwind-kildene eller klassene er endret.

Agentinstruksjonene ligger i [AGENTS.md](AGENTS.md), med egne tillegg for
Poengjeger. Repoet krever ingen egne skills; relevante skills fra agentmiljøet
kan brukes ved behov.

## 📄 Lisens

Kildekoden i dette repoet er tilgjengelig under [MIT-lisensen](LICENSE).

Med mindre annet er oppgitt, er fotografier, CV-dokumenter, tekstinnhold,
prosjektskjermbilder, profilering og øvrige ressurser beskyttet av opphavsrett:
© 2025–2026 Nithusan Krishnasamymudali. Alle rettigheter reservert.
