# MyAstroBoard website - instructions for AI coding agents

The static showcase website for [MyAstroBoard](https://github.com/myastroboard/myastroboard).
The positioning is premium, trustworthy, open-source, self-hosted, and privacy-first.

## Organization standards

The rules shared by every MyAstroBoard repository live in the synced file below. They apply here
in full, except where "Relaxed here" says otherwise; this file only adds what is specific to the
website. Do not edit the synced copy: change it in
[myastroboard/.github](https://github.com/myastroboard/.github/tree/main/standards).

@.github/instructions/org-standards.instructions.md

### Relaxed here

- **Logging** (standards section 4): no backend, nothing to log. `console.log` is still not
  committed.
- **Changelog** (standards section 12): the website has no releases, so no `CHANGELOG.md` and no
  changelog gate. Commits still follow conventional commits.
- **Python tooling** (standards section 13): no Python in this repository except
  `scripts/validate_i18n.py`.

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
- No npm-based build requirement for deployment.
- No backend runtime requirement.
- No SSR requirement.
- Output must remain static files.
- Keep dependencies minimal and bundle lightweight; vendor them under `static/` (no CDN).

## Architecture guardrails

- Keep route structure clear for future documentation expansion:
  - `/`
  - `/features/`
  - `/pricing/`
  - `/docs/`
  - `/privacy/`
- Preserve compatibility with future Markdown/Starlight docs workflows.
- Maintain navigation entries for Features, Pricing, Documentation, and GitHub.

## Translations

- Every string shown on the site lives in `static/js/translations.js`
  (`window.MAB_TRANSLATIONS`, one object per language: en, fr, de, es, it, pt; `en` is the
  reference) and is applied by `static/js/i18n.js`.
- Every language carries the same keys, value types and `{placeholder}` names as `en`, with ASCII
  punctuation only. `python scripts/validate_i18n.py` checks it, and CI runs it.

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

## Checks before calling a change done

```bash
python scripts/validate_i18n.py     # translation parity + ASCII punctuation
python -m http.server 8080          # then check every touched page, desktop and phone width
```
