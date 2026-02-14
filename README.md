# Markdown Checklist App

Local-browser checklist app for markdown runbooks.

## Run

Open `index.html` in any modern browser.

Optional local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What It Does

- Takes markdown with headings and nested list items.
- Renders interactive checkboxes for each list item.
- Saves markdown, checkbox progress, and input panel visibility in browser `localStorage`.
- No backend required.

## Input Panel Behavior

- Click `Render Checklist` to render and auto-hide the markdown input panel.
- Use `Show Input` in the checklist panel to bring input back.

Supported list markers:

- `- item`
- `* item`
- `+ item`
- `1. item`

Optional markdown checkbox prefixes are also parsed:

- `- [ ] pending`
- `- [x] done`
