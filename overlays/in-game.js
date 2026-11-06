// In-game scene: positions the webcam frame from settings. The music tag is handled by music-tag.js.
(function () {
  const cam = window.OVERLAY_SETTINGS.camera;
  const css = document.documentElement.style;
  css.setProperty("--cam-left", `${cam.left}px`);
  css.setProperty("--cam-top", `${cam.top}px`);
  css.setProperty("--cam-width", `${cam.width}px`);
  css.setProperty("--cam-height", `${cam.height}px`);
  css.setProperty("--cam-border", `${cam.border}px`);
})();
