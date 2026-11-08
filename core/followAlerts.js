// Turns Streamer.bot WebSocket messages into follow alerts, and queues them so they play one at a time.
// Plain script: loaded with a <script> tag in OBS, and with require() in tests.
(function (root) {
  function subscribeRequest(id) {
    return { request: "Subscribe", id, events: { Twitch: ["Follow"] } };
  }

  // The Streamer.bot client package says follow data has user_name/user_login; its docs page
  // says targetUser.name/login. Accept both until a real follow shows which one arrives.
  function followerName(message) {
    const event = message && message.event;
    if (!event || event.source !== "Twitch" || event.type !== "Follow") return null;
    const data = message.data || {};
    const user = data.targetUser || {};
    return data.user_name || data.user_login || user.name || user.login || null;
  }

  function createAlertQueue() {
    const waiting = [];
    const seen = new Set();
    return {
      add(name) {
        const key = name.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        waiting.push(name);
      },
      next() {
        return waiting.length ? waiting.shift() : null;
      },
    };
  }

  // Picks one meow take at random and a playback rate inside [low, high], so repeats sound a little different.
  function pickMeow(takes, [low, high], random) {
    if (!takes.length) return null;
    const file = takes[Math.min(takes.length - 1, Math.floor(random() * takes.length))];
    const rate = Math.round((low + random() * (high - low)) * 1000) / 1000;
    return { file, rate };
  }

  const api = { subscribeRequest, followerName, createAlertQueue, pickMeow };
  if (typeof module !== "undefined") module.exports = api;
  else root.FollowAlerts = api;
})(this);
