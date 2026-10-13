# AGENTS.md

## Delt kontekst i Notion

Før oppgaver som gjelder boligsøk, jobbsøknader, Radio Nova, Avarn eller
sideinntekt: søk i Notion etter «Codex — delt kontekst» og les relevant
seksjon/database: https://app.notion.com/p/399154f5854e8167a875ec5f214fdf64.

Behandle siden som delt langtidshukommelse mellom Claude, ChatGPT og Codex.
Skill mellom instruksjoner i brukerens nåværende melding og fakta/status i
dokumenter eller Notion. Når noe avklares eller endres i disse temaene, vurder
før avslutning om samme side eller riktig databaserad bør oppdateres.
Oppdater uten å spørre ved klare, varige fakta-/statusoppdateringer. Spør først
ved usikre eller sensitive oppdateringer eller nye tolkninger/beslutninger.
Sett alltid «Sist oppdatert» til dagens dato ved radoppdateringer, og legg
konkrete videre handlinger i «Neste steg» når et tydelig neste steg finnes.

## Project overview

This repository contains the static portfolio site for `www.nithusan.no`.
Keep the implementation lightweight: HTML, CSS, and vanilla JavaScript only,
unless the user explicitly requests a larger architectural change.

## Important files

- `index.html`: Main page content and structure.
- `om-meg/index.html`: Legacy URL redirecting to `/#om-meg`; About content lives in `index.html`.
- `style.css`: Hand-written site styles.
- `tailwind-input.css`: Tailwind source file.
- `tailwind.min.css`: Generated Tailwind output; do not edit manually.
- `script.js`: Language switching, navigation, and project modal behavior.
- `assets/`: Images, icons, screenshots, and the downloadable CV.
- `poengjeger/`: Separate Norwegian product site, with its own styles, scripts,
  waitlist configuration, support and privacy pages. See `poengjeger/AGENTS.md`.
- `README.md`: Local setup, page structure and validation instructions.

## Working conventions

- Preserve the existing visual identity and responsive behavior unless a redesign is requested.
- Keep Norwegian and English portfolio content in sync when changing user-facing text.
  Poengjeger currently has Norwegian content only.
- Prefer semantic HTML and accessible controls, labels, focus behavior, and image alt text.
- Preserve the custom domain configuration in `CNAME`.
- Use relative URLs that work on GitHub Pages, including from nested pages.
- Do not overwrite unrelated or pre-existing user changes.
- Do not add frameworks, build systems, or dependencies without a clear project need.

## Validation

Install the locked dependencies with `npm ci`. Serve the repository root with
`python3 -m http.server 8000` and open `http://localhost:8000/`.

After changing Tailwind classes, `tailwind-input.css` or `tailwind.config.js`, run:

```sh
npm run build:css
```

Tailwind currently scans `index.html` and `script.js` only. Add any new files
using Tailwind classes to `content` in `tailwind.config.js`. Poengjeger uses
its own CSS and does not currently need a Tailwind build.

For user-facing changes, also check:

- The main page, including `/#om-meg`, at desktop and mobile widths.
- That `/om-meg/` still redirects to the About view.
- Norwegian and English content where applicable.
- Navigation, external links, and the project modal.
- The browser console for errors.
- For Poengjeger changes, its landing, support and privacy pages and the
  relevant form behavior described in `poengjeger/AGENTS.md`.

There is currently no automated CI or test suite. Report which checks were
actually performed and any checks that could not be completed.

## Definition of done

A change is complete when the relevant pages render correctly, responsive and
interactive behavior still works, both languages remain consistent, and any
required CSS build has completed successfully.
