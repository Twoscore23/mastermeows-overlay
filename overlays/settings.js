// Tuning numbers for the overlays. Change these, then refresh the browser source in OBS.
window.OVERLAY_SETTINGS = {
  // Where Tuna serves the current song (Tuna > Settings > "Host/receive information on local webserver").
  tunaUrl: "http://localhost:1608/",
  pollEveryMs: 1000,

  // How long one scroll of a long song title takes, in seconds.
  scrollSeconds: 10,

  // Webcam window, in 1920x1080 canvas pixels. left/top are the frame's outer corner.
  // In OBS, place the webcam source at (left + border, top + border), sized width x height.
  // The webcam hole is at (1450, 430), 432 x 243, the same as before Night Glass, so OBS doesn't need changing.
  camera: { left: 1446, top: 426, width: 432, height: 243, border: 4 },

  // The line under "Be right back".
  brbMessage: "Back in a few minutes",

  // Follow alert. Streamer.bot's WebSocket server (Streamer.bot > Servers/Clients > WebSocket Server).
  streamerbotUrl: "ws://127.0.0.1:8080/",
  // left/top: the alert box's corner in 1920x1080 canvas pixels (the box is 760x330). showSeconds: time on screen.
  followAlert: { left: 40, top: 380, showSeconds: 5 },
  // The meow sound (take 19 on the feedback page: Freesound #412017 by skymary, CC0). Empty list = no sound.
  meows: ["sounds/meow.mp3"],
  // Each meow plays at a random speed in this range, so repeats sound a little different (1 = normal).
  meowPitch: [0.93, 1.07],
};
