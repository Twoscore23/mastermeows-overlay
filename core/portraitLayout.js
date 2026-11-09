// Where things sit on the portrait (phone) canvas: the webcam frame up top and the whole game as a 16:9 band
// across the middle. The night sky covers everything else, with see-through holes where OBS shows the webcam
// and the game underneath. skyPath is that shape, for clip-path: path(evenodd, ...).
// Plain script: loaded with a <script> tag in OBS, and with require() in tests.
(function (root) {
  function rect(x, y, w, h) {
    return `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
  }

  function roundedRect(x, y, w, h, r) {
    return `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}` +
      `V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}` +
      `H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}` +
      `V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
  }

  // camera: left/top is the frame's outer corner; width/height is the webcam inside the frame line (border).
  function layout({ canvas, camera, gameTop }) {
    const game = { left: 0, top: gameTop, width: canvas.width, height: Math.round(canvas.width * 9 / 16) };
    const camHole = {
      left: camera.left + camera.border,
      top: camera.top + camera.border,
      width: camera.width,
      height: camera.height,
      radius: camera.radius - camera.border,
    };
    const skyPath = [
      rect(0, 0, canvas.width, canvas.height),
      roundedRect(camHole.left, camHole.top, camHole.width, camHole.height, camHole.radius),
      rect(game.left, game.top, game.width, game.height),
    ].join(" ");
    return { game, camHole, skyPath };
  }

  const api = { layout };
  if (typeof module !== "undefined") module.exports = api;
  else root.PortraitLayout = api;
})(this);
