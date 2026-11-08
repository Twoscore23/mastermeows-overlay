# Decisions

- 2026-11-06: Build as HTML/CSS OBS browser sources, 1920x1080, transparent. Original art only.
- 2026-11-06: Look is **Cozy Purr** (round 1 feedback page, picked in chat).
- 2026-11-06: Webcam goes **right side, under the kill feed**. The HUD positions are estimates; no gameplay screenshot was used, per the user.
- 2026-11-06: The tag under the webcam shows **only the music**: no username, Twitch link or paw. Layout is **song on top, artist below** (round 3). Long titles scroll. The tag hides when nothing is playing (my default).
- 2026-11-06: Music comes from YouTube in the browser and reaches OBS through Tuna's local webserver. Flagged: Twitch mutes VODs that contain copyrighted music. Recommended StreamBeats or other stream-safe tracks.
- 2026-11-06: **No Starting Soon screen.** Added **Be Right Back**: a full-screen Cozy Purr card that also shows the music tag. Default message "Back in a few minutes" (editable in settings).

Feedback page with all rounds: https://claude.ai/artifact/WJSPEak52a3JcCAqKc89DT
- 2026-11-07: **Follow alert**: a tuxedo cat pops up with the follower's name and meows. Follows reach the overlay through **Streamer.bot**'s local WebSocket (same pattern as Tuna). She has no other follow alerts, so nothing needs turning off.
- 2026-11-07: Streamer.bot's docs and its client package disagree on the follow data (`targetUser.name` vs `user_name`). The core reads both until a real test follow shows which one arrives.

Follow alert picks (round 1): https://claude.ai/artifact/7rAhvEi9xyEBuyAcgoC87t
- 2026-11-07: Alert card wording: the **follower's name**, then **"Just became a cat!"** underneath (replaces "New follower").
- 2026-11-07: She didn't like the round 1 cat (green eyes, rounded sticker style). Round 2 offers five new looks: Mochi, Gentleman, Ink doodle, Sparkle eyes, Pixel.
- 2026-11-07: None of the round 2 cats landed. **Art direction: chibi style** from her reference (Adobe Stock #663491769, not licensed, so we match the style and don't trace it): big head, thick dark outline, glossy gradient eyes, blush, sitting body with a curled tail. Round 3 offers five tuxedo variants in that style.
- 2026-11-07: **Overlay look**, round 4 of the overlay picks page (polish). Picked **Night Glass**: dark tinted panels, thin cream line, purple glow, music meter instead of the note. Ratings: Night Glass 4, Velvet 4, Arena 3, Current 3, Plush 2, Line Art 1. Fixes asked for: ears must look attached to the frame, ears must not fade into the dark BRB card, "Be right back" on one centred line. Lesson: she likes dark and glowing, dislikes thin minimal and extra-cute.
- 2026-11-07: Round 3: she **picked "Big white face"** (chibi tuxedo, pink-to-gold eyes, larger white face mask). **The mouth doesn't open** when it meows. Round 4 offers six things to do instead: slow blink, ear wiggle, tail swish, head tilt, hearts, stars.
- 2026-11-07: **Overlay look**, round 5: ears are **dark with a cream outline**. Drawing the ears on top of the frame line made them look joined to the camera box, so she rejected it. Round 6 puts them behind the frame, cut off at the inner edge of the cream line, so the base never shows and nothing covers the webcam. Round 6 asks only how far the ears tilt.
- 2026-11-07: **Overlay look settled** (round 6): Night Glass, dark ears with a cream outline, **slight tilt (10deg)**, tucked behind the frame and cut off at the inner edge of the cream line. Mockup source of truth: the overlay picks page, round 6.
- 2026-11-07: Round 4: when it meows, the cat does a **slow blink with hearts floating up** (she picked the blink and asked to add the hearts).
- 2026-11-07: Round 5: the cat **bounces in** (option B) and the name card slides out from behind it.
- 2026-11-07: Round 7: she **picked meow take 19** (Freesound #412017, "cat meow short" by skymary, CC0, no credit needed). It's the only meow; each follow still plays it at a slightly random speed (`meowPitch`) so repeats don't sound identical. The other 37 takes were dropped.
