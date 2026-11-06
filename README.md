# Mastermeows999 OBS overlay

Two screens, both in the Cozy Purr look:
- **In-game**: cat-ear webcam frame on the right, with the current song underneath.
- **Be Right Back**: full-screen card, with the current song underneath.

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

## 4. Build the scenes

### Scene "Marvel Rivals"
Add these in this order. The last one added sits on top.
1. **Game Capture**: Marvel Rivals.
2. **Video Capture Device**: her webcam. Right-click it > Transform > Edit Transform:
   - Position **1450, 430**
   - Bounding Box Type **Scale to outer bounds**, Bounding Box Size **432 x 243**
   - Tick **Crop to Bounding Box**
3. **Browser**: tick **Local file**, choose `overlays\in-game.html`, width **1920**, height **1080**.

### Scene "Be Right Back"
1. **Browser**: tick **Local file**, choose `overlays\brb.html`, width **1920**, height **1080**.

## 5. Use it while streaming

- Click a scene in the **Scenes** box to switch. To switch with a key instead, set it in Settings > Hotkeys (e.g. F9 for Be Right Back).
- The song tag appears when a YouTube video is playing and hides when it's paused.
- Her mic stays live on the BRB screen. Mute it in the Audio Mixer if she steps away.

## Changing things

Edit `overlays\settings.js` in Notepad, save, then right-click the browser source > **Refresh**.
- `brbMessage`: the line under "Be right back".
- `camera`: where the webcam frame sits. If you move it, move the webcam source to match (left + 10, top + 10).
- `scrollSeconds`: how fast long song titles scroll.

## Previewing without Tuna

Open `overlays\in-game.html?demo=long` or `overlays\brb.html?demo=short` in a browser to see sample songs.
