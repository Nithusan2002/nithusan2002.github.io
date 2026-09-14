# AGENTS.md

## Project overview

This repository contains the static portfolio site for `www.nithusan.no`.
Keep the implementation lightweight: HTML, CSS, and vanilla JavaScript only,
unless the user explicitly requests a larger architectural change.

## Important files

- `index.html`: Main page content and structure.
- `om-meg/index.html`: Dedicated About page.
- `style.css`: Hand-written site styles.
- `tailwind-input.css`: Tailwind source file.
- `tailwind.min.css`: Generated Tailwind output; do not edit manually.
- `script.js`: Language switching, navigation, and project modal behavior.
- `assets/`: Images, icons, screenshots, and the downloadable CV.

## Working conventions

- Preserve the existing visual identity and responsive behavior unless a redesign is requested.
- Keep Norwegian and English content in sync when changing user-facing text.
- Prefer semantic HTML and accessible controls, labels, focus behavior, and image alt text.
- Preserve the custom domain configuration in `CNAME`.
- Use relative URLs that work on GitHub Pages, including from nested pages.
- Do not overwrite unrelated or pre-existing user changes.
- Do not add frameworks, build systems, or dependencies without a clear project need.

## Validation

After changing Tailwind classes or `tailwind-input.css`, run:

```sh
npm run build:css
```

For user-facing changes, also check:

- The main page and `/om-meg/` at desktop and mobile widths.
- Norwegian and English content where applicable.
- Navigation, external links, and the project modal.
- The browser console for errors.

## Definition of done

A change is complete when the relevant pages render correctly, responsive and
interactive behavior still works, both languages remain consistent, and any
required CSS build has completed successfully.
