// Tuning numbers for the overlays. Change these, then refresh the browser source in OBS.
window.OVERLAY_SETTINGS = {
  // Where Tuna serves the current song (Tuna > Settings > "Host/receive information on local webserver").
  tunaUrl: "http://localhost:1608/",
  pollEveryMs: 1000,

  // How long one scroll of a long song title takes, in seconds.
  scrollSeconds: 10,

  // Webcam window, in 1920x1080 canvas pixels. left/top are the frame's outer corner.
  // In OBS, place the webcam source at (left + border, top + border), sized width x height.
  camera: { left: 1440, top: 420, width: 432, height: 243, border: 10 },

  // The line under "Be right back".
  brbMessage: "Back in a few minutes",
};
