# Mastermeows999 OBS overlay

Two screens in the Night Glass look, plus a follow alert:
- **In-game**: glowing cat-ear webcam frame on the right, with the current song underneath.
- **Be Right Back**: full-screen night-sky card, with the current song underneath.
- **Follow alert**: when someone follows, a tuxedo cat bounces in with their name, "Just became a cat!", and meows.

## 1. Put the folder on her PC

1. On this repo's GitHub page, click the green **Code** button, then **Download ZIP**.
2. Right-click the downloaded zip > **Extract All**.
3. Move the extracted folder somewhere it will stay, for example `Documents\mastermeows-overlay`. You can rename it first. GitHub names it `mastermeows-overlay-main`.

OBS remembers the exact location, so **don't move or rename the folder after setup**. If you do, re-pick the files in step 4.

**Updating later:** download the ZIP again, and copy its `core` and `overlays` folders over the old ones. If you changed `overlays\settings.js`, keep a copy of yours and put it back afterwards. Then right-click each browser source in OBS and choose **Refresh**.

## 2. Check the OBS canvas size

Settings > Video > **Base (Canvas) Resolution: 1920x1080**. The overlays are drawn for that size.

## 3. Install Tuna (shows the current song)

1. Download and install Tuna: https://obsproject.com/forum/resources/tuna.843/ then restart OBS.
2. Tools > Tuna. Set the song source to **Windows Media Control** and pick the browser she plays YouTube in.
3. Tick **Host/receive information on local webserver** and leave the port at **1608**.
4. Play a YouTube video. Tuna should show its title. If it doesn't, the song tag won't appear yet, but everything else still works.

## 4. Install Streamer.bot (shows follow alerts)

1. Download Streamer.bot from https://streamer.bot, unzip it somewhere it will stay (e.g. `Documents\Streamer.bot`), and run `Streamer.bot.exe`.
2. **Platforms > Twitch > Accounts**: connect her **Broadcaster** account and allow the permissions it asks for.
3. **Servers/Clients > WebSocket Server**: tick **Auto Start**, leave the address `127.0.0.1`, port `8080` and endpoint `/`, then click **Start Server**.
4. Leave Streamer.bot running while streaming. It can start minimised with Windows (Settings > General).

## 5. Build the scenes

### Scene "Marvel Rivals"
Add these in this order. The last one added sits on top.
1. **Game Capture**: Marvel Rivals.
2. **Video Capture Device**: her webcam. Right-click it > Transform > Edit Transform:
   - Position **1450, 430**
   - Bounding Box Type **Scale to outer bounds**, Bounding Box Size **432 x 243**
   - Tick **Crop to Bounding Box**
3. **Browser**: tick **Local file**, choose `overlays\in-game.html`, width **1920**, height **1080**.
4. **Browser** named "Follow alert": tick **Local file**, choose `overlays\follow-alert.html`, width **1920**, height **1080**. Tick **Control audio via OBS** so the meow shows in the Audio Mixer and its volume can be set there.

### Scene "Be Right Back"
1. **Browser**: tick **Local file**, choose `overlays\brb.html`, width **1920**, height **1080**.
2. Add the follow alert here too: **Add > Browser > Add Existing**, pick "Follow alert". Using the same source in both scenes means it never misses a follow while switching.

## 6. Use it while streaming

- Click a scene in the **Scenes** box to switch. To switch with a key instead, set it in Settings > Hotkeys (e.g. F9 for Be Right Back).
- The song tag appears when a YouTube video is playing and hides when it's paused.
- Her mic stays live on the BRB screen. Mute it in the Audio Mixer if she steps away.
- **First time:** ask a friend (or a second account) to follow. The cat should pop up within a second or two and meow. If nothing shows, check Streamer.bot is open and its WebSocket server is started (step 4), then right-click "Follow alert" > **Refresh**. Someone who unfollows and follows again won't trigger a second alert until the source is refreshed, so use a new account for each test.

## Changing things

Edit `overlays\settings.js` in Notepad, save, then right-click the browser source > **Refresh**.
- `brbMessage`: the line under "Be right back".
- `camera`: where the webcam frame sits. If you move it, move the webcam source to match (left + border, top + border).
- `scrollSeconds`: how fast long song titles scroll.
- `followAlert`: where the follow alert sits (`left`, `top`) and how long it stays (`showSeconds`).
- `meows`: the meow sound. Add more files to the list and it picks one at random for each follow; empty the list for no sound.

## If the follow alert doesn't show

1. Open Chrome or Edge, drag `overlays\follow-alert.html` into it, add `?check` to the end of the address (so it ends `follow-alert.html?check`) and press Enter. A panel on the right lists what the alert hears from Streamer.bot, newest at the top.
2. Type something in her Twitch chat, then follow from an account that has never followed her.
3. Read the panel:
   - **"Can't reach Streamer.bot"**: Streamer.bot isn't open, or its WebSocket server isn't started (step 4).
   - **Connected, but a reply says `"status": "error"`**: Streamer.bot refused the request. Send a screenshot of the panel.
   - **No `ChatMessage` line after typing in chat**: Streamer.bot isn't connected to Twitch. Check **Platforms > Twitch > Accounts**.
   - **Chat shows up but the follow doesn't**: Twitch isn't sending follows to Streamer.bot. Make sure her own account is connected as **Broadcaster**, not only a bot account.
   - **"That's a follow from ..." appears**: the alert works. In OBS, right-click "Follow alert" > **Refresh**.

## Previewing without Tuna

Open `overlays\in-game.html?demo=long` or `overlays\brb.html?demo=short` in a browser to see sample songs.
Open `overlays\follow-alert.html?demo=follow` to see two sample follow alerts (click the page first if the browser blocks the sound).
