# Mastermeows999 overlay

OBS browser-source overlays for my wife's Twitch channel (Marvel Rivals). Plain HTML/CSS/JS, no build step.

## Commands
- `npm test` runs the logic tests (Node's built-in runner, no dependencies).
- Preview without Tuna or Streamer.bot: open `overlays/in-game.html?demo=long`, `overlays/in-game-portrait.html?demo=long`, `overlays/brb.html?demo=short`, `overlays/brb-portrait.html?demo=short` or `overlays/follow-alert.html?demo=follow`.
- Package for her PC: zip `README.md`, `core/` and `overlays/` inside a `mastermeows-overlay/` folder to `~/Desktop/mastermeows-overlay.zip`. She runs OBS on her own PC.

## Architecture
- `core/` holds plain logic with no DOM, loaded with a `<script>` tag in OBS and with `require()` in tests. Logic is test-first.
- `overlays/` holds the thin UI: one HTML page per OBS scene at 1920x1080 (portrait pages at 1080x1920). Shared look in `night-glass.css`, shared song tag in `music-tag.js`.
- Tuning numbers (positions, timings, the Tuna URL) live in `overlays/settings.js`.
- Song data comes from the Tuna OBS plugin's local webserver (`http://localhost:1608/`).
- Follow events come from Streamer.bot's local WebSocket (`ws://127.0.0.1:8080/`). The follow alert is its own browser source, shared by both scenes.

## Design rules
- Look: Night Glass (dark tinted panels, thin cream line, purple glow, dark cat ears with a cream outline tucked behind the frame). Brand purple #7b4fd6. Original art only: no Marvel logos or hero art.
- Landscape: the webcam sits on the right, under the kill feed. Portrait: webcam on top, whole game as a band across the middle. The tag below it shows only the music (song on top, artist below) and hides when nothing is playing.

## Scope
Scenes: In-game and Be Right Back (done). Portrait versions of both at 1080x1920 for Twitch's vertical stream via the Aitum Vertical canvas (built 2026-11-08; no portrait follow alert; TikTok Live and clips later). Follow alert (built 2026-11-07; not yet tested with a real follow). No Starting Soon (cut 2026-11-06). Ending: not yet confirmed. Later idea: lobby/match layouts.
Decisions log: `docs/decisions.md`. OBS setup: `README.md`.
