// Follow alert: listens to Streamer.bot for Twitch follows and plays the tuxedo cat for each one, one at a time.
// Add ?demo=follow to the file URL to play two sample follows without Streamer.bot.
(function () {
  const S = window.OVERLAY_SETTINGS;
  const css = document.documentElement.style;
  css.setProperty("--alert-left", `${S.followAlert.left}px`);
  css.setProperty("--alert-top", `${S.followAlert.top}px`);

  const alert = document.getElementById("alert");
  const cat = document.getElementById("cat");
  const who = document.getElementById("who");
  cat.insertAdjacentHTML("afterbegin", TuxCat.svg("alert"));

  const queue = FollowAlerts.createAlertQueue();
  let playing = false;

  function fitName() {
    let size = 48;
    who.style.fontSize = `${size}px`;
    while (who.scrollWidth > 440 && size > 24) {
      size -= 2;
      who.style.fontSize = `${size}px`;
    }
  }

  function meow() {
    alert.classList.add("meowing");
    const pick = FollowAlerts.pickMeow(S.meows, S.meowPitch, Math.random);
    if (!pick) return;
    const sound = new Audio(pick.file);
    sound.preservesPitch = false;
    sound.playbackRate = pick.rate;
    sound.play().catch(() => {}); // A missing file shouldn't stop the alert.
  }

  function playNext() {
    if (playing) return;
    const name = queue.next();
    if (!name) return;
    playing = true;
    who.textContent = name;
    alert.className = "alert";
    alert.hidden = false;
    fitName();
    void alert.offsetWidth; // restart the CSS animations
    alert.classList.add("play");
    setTimeout(() => alert.classList.add("out"), S.followAlert.showSeconds * 1000);
  }

  alert.addEventListener("animationend", e => {
    if (e.animationName === "bounce") meow();
    if (e.animationName === "leave") {
      alert.hidden = true;
      playing = false;
      playNext();
    }
  });

  function onFollower(name) {
    queue.add(name);
    playNext();
  }

  function connect() {
    const socket = new WebSocket(S.streamerbotUrl);
    socket.onopen = () => socket.send(JSON.stringify(FollowAlerts.subscribeRequest("follow-alert")));
    socket.onmessage = e => {
      let message;
      try { message = JSON.parse(e.data); } catch { return; }
      const name = FollowAlerts.followerName(message);
      if (name) onFollower(name);
    };
    socket.onclose = () => setTimeout(connect, 3000); // Streamer.bot closed or not started yet: keep trying.
  }

  if (new URLSearchParams(location.search).get("demo") === "follow") {
    onFollower("TuxFan");
    onFollower("xX_SpiderHamFan_Xx");
  } else {
    connect();
  }
})();
