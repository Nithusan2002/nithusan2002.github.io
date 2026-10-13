# Poengjeger

These instructions supplement the root `AGENTS.md` for this directory.

## Structure and scope

- `index.html`: Norwegian product landing page and waitlist form.
- `styles.css`: Hand-written styles shared with the support and privacy pages.
- `script.js`: Mobile menu, footer year and waitlist submission behavior.
- `config.js`: Public `window.POENGJEGER_CONFIG.waitlistEndpoint` configuration.
- `support/index.html` and `personvern/index.html`: Support and privacy pages.
- `assets/`: Product images and icon.

Keep this site lightweight and Norwegian unless another language is requested.
Use relative asset and navigation URLs that work from the nested pages.
Preserve consistency between the form, support information and privacy text
when changing what the waitlist collects or how it behaves.

## Waitlist integration

The form posts JSON to the Supabase Edge Function `join-waitlist` with
`email`, `consent`, `company` (honeypot) and `source`. Backend implementation
is outside this repository. Do not claim backend validation or storage
behavior has been verified from the frontend alone.

Keep secrets and privileged Supabase keys out of static files. Preserve
required consent, native form validation, submission status messages and
the disabled submit button while a request is pending.

Use mocked network responses or a test endpoint for routine form checks;
avoid creating entries in the live waitlist during validation.

## Validation

Serve the repository root and check `/poengjeger/`, `/poengjeger/support/`
and `/poengjeger/personvern/` at desktop and mobile widths when affected.
Check navigation, assets, keyboard interaction and browser console errors.
For form changes, check invalid input, missing consent, pending submission,
success and failure with mocked responses or a test endpoint.

This directory does not use Tailwind; changes to its own CSS do not require
`npm run build:css`.
