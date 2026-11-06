const test = require("node:test");
const assert = require("node:assert/strict");
const { toTrack } = require("../core/nowPlaying.js");

const NOTHING = { playing: false, song: "", artist: "" };

test("splits a YouTube-style 'Artist - Song' title", () => {
  const t = toTrack({ status: "playing", title: "Artist - Song", artists: ["ArtistVEVO"] });
  assert.deepEqual(t, { playing: true, song: "Song", artist: "Artist" });
});

test("splits on en and em dashes too", () => {
  assert.equal(toTrack({ status: "playing", title: "Artist – Song", artists: [] }).song, "Song");
  assert.equal(toTrack({ status: "playing", title: "Artist — Song", artists: [] }).artist, "Artist");
});

test("drops bracketed video noise from the title", () => {
  const t = toTrack({ status: "playing", title: "Artist - Song (Official Music Video) [4K]", artists: [] });
  assert.equal(t.song, "Song");
});

test("keeps brackets that are part of the song name", () => {
  const t = toTrack({ status: "playing", title: "Artist - Song (feat. Friend)", artists: [] });
  assert.equal(t.song, "Song (feat. Friend)");
});

test("uses the channel as the artist when the title has no dash", () => {
  const t = toTrack({ status: "playing", title: "Moonlit", artists: ["StreamBeats"] });
  assert.deepEqual(t, { playing: true, song: "Moonlit", artist: "StreamBeats" });
});

test("tidies YouTube channel names", () => {
  assert.equal(toTrack({ status: "playing", title: "Song", artists: ["Some Band - Topic"] }).artist, "Some Band");
  assert.equal(toTrack({ status: "playing", title: "Song", artists: ["SomeBandVEVO"] }).artist, "SomeBand");
});

test("leaves the artist empty when there is no dash and no channel", () => {
  const t = toTrack({ status: "playing", title: "Lofi Beats, Vol. 3", artists: [] });
  assert.deepEqual(t, { playing: true, song: "Lofi Beats, Vol. 3", artist: "" });
});

test("is not playing when paused or stopped", () => {
  assert.deepEqual(toTrack({ status: "paused", title: "Artist - Song", artists: [] }), NOTHING);
  assert.deepEqual(toTrack({ status: "stopped", title: "Artist - Song", artists: [] }), NOTHING);
});

test("is not playing when the title is empty", () => {
  assert.deepEqual(toTrack({ status: "playing", title: "  ", artists: ["X"] }), NOTHING);
});

test("treats missing or broken data as nothing playing", () => {
  assert.deepEqual(toTrack(null), NOTHING);
  assert.deepEqual(toTrack({}), NOTHING);
  assert.deepEqual(toTrack({ status: "playing", title: 42 }), NOTHING);
});
