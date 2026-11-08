// Follow alert: listens to Streamer.bot for Twitch follows and plays the tuxedo cat for each one, one at a time.
// Add ?demo=follow to the file URL to play two sample follows without Streamer.bot, or ?check to see what Streamer.bot sends.
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

  // ?check: a text panel listing the connection and every message from Streamer.bot, for setting up on her PC.
  // It also asks for chat messages, so typing in chat shows whether any Twitch events arrive at all.
  const checking = new URLSearchParams(location.search).has("check");
  let note = () => {};
  if (checking) {
    const panel = document.createElement("pre");
    panel.className = "check";
    document.body.append(panel);
    note = text => { panel.textContent = `${new Date().toLocaleTimeString()}  ${text}\n\n` + panel.textContent; };
    note("Check mode. Waiting for Streamer.bot...");
  }

  function connect() {
    const socket = new WebSocket(S.streamerbotUrl);
    socket.onopen = () => {
      note(`Connected to Streamer.bot at ${S.streamerbotUrl}. Asking for follow events.`);
      socket.send(JSON.stringify(FollowAlerts.subscribeRequest("follow-alert")));
      if (checking) socket.send(JSON.stringify({ request: "Subscribe", id: "check-chat", events: { Twitch: ["ChatMessage"] } }));
    };
    socket.onmessage = e => {
      note(`Received: ${String(e.data).slice(0, 600)}`);
      let message;
      try { message = JSON.parse(e.data); } catch { return; }
      const name = FollowAlerts.followerName(message);
      if (name) { note(`That's a follow from ${name}. Playing the alert.`); onFollower(name); }
    };
    socket.onclose = () => {
      note(`Can't reach Streamer.bot at ${S.streamerbotUrl}. Is it open, with its WebSocket server started? Trying again in 3 seconds.`);
      setTimeout(connect, 3000); // Streamer.bot closed or not started yet: keep trying.
    };
  }

  if (new URLSearchParams(location.search).get("demo") === "follow") {
    onFollower("TuxFan");
    onFollower("xX_SpiderHamFan_Xx");
  } else {
    connect();
  }
})();
