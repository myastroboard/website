# Copilot Instructions for web-myastroboard

## Project scope

This repository hosts the static showcase website for **WorldOfGZ/myAstroBoard**.
The positioning is premium, trustworthy, open-source, self-hosted, and privacy-first.

## Non-negotiable product messaging

- Users own their data.
- Data stays local by default.
- No telemetry by default.
- No account required.
- No forced subscriptions.
- No vendor lock-in.

Keep these themes visible across key sections, not buried in fine print.

## Technical constraints

- Must stay deployable on free OVH shared hosting.
- No backend runtime requirement.
- No SSR requirement.
- Output must remain static files.
- Keep dependencies minimal and bundle lightweight.

## Architecture guardrails

- Keep route structure clear for future documentation expansion:
  - `/`
  - `/features/`
  - `/pricing/`
  - `/docs/`
- Preserve compatibility with future Markdown/Starlight docs workflows.
- Maintain navigation entries for Features, Pricing, Documentation, and GitHub.

## Design and UX guardrails

- Dark mode by default, refined space-inspired atmosphere.
- Prefer subtle, performant animations only.
- Mobile-first readability and accessibility first.
- Avoid hype language, aggressive marketing tone, or noisy visuals.

## Compliance

- Keep GDPR/RGPD-friendly approach:
  - No analytics trackers by default
  - No tracking cookies by default
  - Clear transparency messaging in UI copy
