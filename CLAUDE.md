# Mastermeows999 overlay

OBS browser-source overlays for my wife's Twitch channel (Marvel Rivals). Plain HTML/CSS/JS, no build step.

## Commands
- `npm test` runs the logic tests (Node's built-in runner, no dependencies).
- Preview without Tuna: open `overlays/in-game.html?demo=long` or `overlays/brb.html?demo=short`.
- Package for her PC: zip `README.md`, `core/` and `overlays/` inside a `mastermeows-overlay/` folder to `~/Desktop/mastermeows-overlay.zip`. She runs OBS on her own PC.

## Architecture
- `core/` holds plain logic with no DOM, loaded with a `<script>` tag in OBS and with `require()` in tests. Logic is test-first.
- `overlays/` holds the thin UI: one HTML page per OBS scene at 1920x1080. Shared look in `cozy.css`, shared song tag in `music-tag.js`.
- Tuning numbers (positions, timings, the Tuna URL) live in `overlays/settings.js`.
- Song data comes from the Tuna OBS plugin's local webserver (`http://localhost:1608/`).

## Design rules
- Look: Cozy Purr (cream sticker outlines, cat ears, purple #7b4fd6). Original art only: no Marvel logos or hero art.
- The webcam sits on the right, under the kill feed. The tag below it shows only the music (song on top, artist below) and hides when nothing is playing.

## Scope
Scenes: In-game (done), Be Right Back (done). No Starting Soon (cut 2026-11-06). Ending: not yet confirmed. Later idea: lobby/match layouts.
Decisions log: `docs/decisions.md`. OBS setup: `README.md`.
