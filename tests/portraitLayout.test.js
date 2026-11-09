const test = require("node:test");
const assert = require("node:assert/strict");
const { layout } = require("../core/portraitLayout.js");

const CAMERA = { left: 10, top: 20, width: 40, height: 30, border: 2, radius: 6 };

test("the game band fills the canvas width at 16:9", () => {
  const { game } = layout({ canvas: { width: 160, height: 400 }, camera: CAMERA, gameTop: 100 });
  assert.deepEqual(game, { left: 0, top: 100, width: 160, height: 90 });
});

test("the game band height rounds to whole pixels", () => {
  const { game } = layout({ canvas: { width: 1080, height: 1920 }, camera: CAMERA, gameTop: 0 });
  assert.equal(game.height, 608);
});

test("the webcam hole sits inside the frame line, with the line's inner corner radius", () => {
  const { camHole } = layout({ canvas: { width: 160, height: 400 }, camera: CAMERA, gameTop: 100 });
  assert.deepEqual(camHole, { left: 12, top: 22, width: 40, height: 30, radius: 4 });
});

test("the sky covers the canvas and cuts out the webcam and game holes", () => {
  const camera = { left: 0, top: 0, width: 10, height: 10, border: 0, radius: 0 };
  const { skyPath } = layout({ canvas: { width: 16, height: 40 }, camera, gameTop: 20 });
  assert.equal(skyPath, [
    "M0 0H16V40H0Z",
    "M0 0H10A0 0 0 0 1 10 0V10A0 0 0 0 1 10 10H0A0 0 0 0 1 0 10V0A0 0 0 0 1 0 0Z",
    "M0 20H16V29H0Z",
  ].join(" "));
});

test("the webcam hole's corners are rounded", () => {
  const camera = { left: 0, top: 0, width: 20, height: 10, border: 1, radius: 4 };
  const { skyPath } = layout({ canvas: { width: 16, height: 40 }, camera, gameTop: 30 });
  assert.match(skyPath, / M4 1H18A3 3 0 0 1 21 4V8A3 3 0 0 1 18 11H4A3 3 0 0 1 1 8V4A3 3 0 0 1 4 1Z /);
});
