// Turns Tuna's "now playing" JSON into what the music tag shows.
// Plain script: loaded with a <script> tag in OBS, and with require() in tests.
(function (root) {
  const NOTHING = { playing: false, song: "", artist: "" };

  // Bracketed bits made only of these words are YouTube noise, e.g. "(Official Music Video)" or "[4K]".
  const NOISE_WORDS = new Set([
    "official", "music", "lyric", "lyrics", "video", "audio", "visualizer", "visualiser",
    "mv", "m/v", "4k", "hd", "hq",
  ]);

  function isNoise(bracketText) {
    const words = bracketText.toLowerCase().split(/\s+/).filter(Boolean);
    return words.length > 0 && words.every(w => NOISE_WORDS.has(w));
  }

  function cleanTitle(title) {
    return title
      .replace(/\(([^)]*)\)|\[([^\]]*)\]/g, (match, round, square) => (isNoise(round ?? square) ? "" : match))
      .replace(/\s+/g, " ")
      .trim();
  }

  function cleanChannel(name) {
    return name.replace(/\s+-\s+Topic$/, "").replace(/VEVO$/, "").trim();
  }

  function toTrack(info) {
    if (!info || info.status !== "playing" || typeof info.title !== "string") return NOTHING;
    const title = cleanTitle(info.title);
    if (!title) return NOTHING;

    const dash = title.match(/^(.+?)\s+[-–—]\s+(.+)$/);
    if (dash) return { playing: true, song: dash[2], artist: dash[1] };

    const artists = Array.isArray(info.artists) ? info.artists.filter(a => typeof a === "string") : [];
    return { playing: true, song: title, artist: artists.map(cleanChannel).filter(Boolean).join(", ") };
  }

  const api = { toTrack };
  if (typeof module !== "undefined") module.exports = api;
  else root.NowPlaying = api;
})(this);
