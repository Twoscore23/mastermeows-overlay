// Shared music tag: reads Tuna, hands the JSON to NowPlaying.toTrack, and draws the result.
// Expects #tag, #song, #artist and #artist-line on the page.
// Add ?demo=long or ?demo=short to the file URL to preview without Tuna running.
(function () {
  const S = window.OVERLAY_SETTINGS;
  document.documentElement.style.setProperty("--scroll-seconds", `${S.scrollSeconds}s`);

  const DEMOS = {
    long: { status: "playing", title: "StreamBeats - Lofi Chill Beats to Stream and Relax To, Vol. 3 (Official Audio)", artists: [] },
    short: { status: "playing", title: "Moonlit", artists: ["StreamBeats"] },
  };

  const tag = document.getElementById("tag");
  const song = document.getElementById("song");
  const artist = document.getElementById("artist");
  const artistLine = document.getElementById("artist-line");
  let shown = null;

  function measure() {
    tag.querySelectorAll(".track").forEach(t => {
      const over = t.scrollWidth - t.clientWidth;
      t.classList.toggle("long", over > 2);
      t.style.setProperty("--shift", `${-over}px`);
    });
  }

  function render(track) {
    const key = track.playing ? `${track.song}\n${track.artist}` : "";
    if (key === shown) return;
    shown = key;
    tag.hidden = !track.playing;
    song.textContent = track.song;
    artist.textContent = track.artist;
    artistLine.hidden = !track.artist;
    requestAnimationFrame(measure);
  }

  async function poll() {
    try {
      const res = await fetch(S.tunaUrl, { cache: "no-store" });
      render(NowPlaying.toTrack(await res.json()));
    } catch {
      render(NowPlaying.toTrack(null)); // Tuna not running: hide the tag.
    }
    setTimeout(poll, S.pollEveryMs);
  }

  const demo = new URLSearchParams(location.search).get("demo");
  if (DEMOS[demo]) render(NowPlaying.toTrack(DEMOS[demo]));
  else poll();
  if (document.fonts) document.fonts.ready.then(measure);
})();
