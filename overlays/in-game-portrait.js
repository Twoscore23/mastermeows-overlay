// Portrait in-game scene: positions the webcam frame and game band from settings, and cuts their holes in the sky.
// The music tag is handled by music-tag.js.
(function () {
  const S = window.OVERLAY_SETTINGS.portrait;
  const { game, skyPath } = PortraitLayout.layout({ canvas: { width: 1080, height: 1920 }, camera: S.camera, gameTop: S.gameTop });

  const css = document.documentElement.style;
  css.setProperty("--cam-left", `${S.camera.left}px`);
  css.setProperty("--cam-top", `${S.camera.top}px`);
  css.setProperty("--cam-width", `${S.camera.width}px`);
  css.setProperty("--cam-height", `${S.camera.height}px`);
  css.setProperty("--cam-border", `${S.camera.border}px`);
  css.setProperty("--cam-radius", `${S.camera.radius}px`);
  css.setProperty("--game-top", `${game.top}px`);
  css.setProperty("--game-height", `${game.height}px`);

  document.getElementById("sky").style.clipPath = `path(evenodd, "${skyPath}")`;
})();
