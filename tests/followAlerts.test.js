const test = require("node:test");
const assert = require("node:assert/strict");
const { subscribeRequest, followerName, createAlertQueue, pickMeow } = require("../core/followAlerts.js");

function followEvent(data) {
  return { timeStamp: "2026-11-07T20:00:00-05:00", event: { source: "Twitch", type: "Follow" }, data };
}

test("asks Streamer.bot for Twitch follow events only", () => {
  assert.deepEqual(subscribeRequest("sub-1"), {
    request: "Subscribe",
    id: "sub-1",
    events: { Twitch: ["Follow"] },
  });
});

test("reads the follower's display name from a follow event", () => {
  const msg = followEvent({ user_id: "1", user_login: "tuxfan", user_name: "TuxFan", followed_at: "x" });
  assert.equal(followerName(msg), "TuxFan");
});

test("falls back to the login when there is no display name", () => {
  assert.equal(followerName(followEvent({ user_login: "tuxfan" })), "tuxfan");
});

test("also reads the targetUser shape the Streamer.bot docs describe", () => {
  const msg = followEvent({ targetUser: { id: "1", login: "tuxfan", name: "TuxFan", type: "twitch" }, isTest: false });
  assert.equal(followerName(msg), "TuxFan");
});

test("ignores anything that isn't a Twitch follow", () => {
  assert.equal(followerName({ request: "Hello", info: {} }), null);
  assert.equal(followerName({ id: "sub-1", status: "ok" }), null);
  assert.equal(followerName({ event: { source: "Twitch", type: "ChatMessage" }, data: { user_name: "TuxFan" } }), null);
  assert.equal(followerName(followEvent({})), null);
  assert.equal(followerName(null), null);
});

test("plays follows one at a time, in the order they arrived", () => {
  const q = createAlertQueue();
  q.add("A");
  q.add("B");
  assert.equal(q.next(), "A");
  assert.equal(q.next(), "B");
  assert.equal(q.next(), null);
});

test("doesn't alert twice for someone who unfollows and follows again", () => {
  const q = createAlertQueue();
  q.add("TuxFan");
  assert.equal(q.next(), "TuxFan");
  q.add("tuxfan");
  assert.equal(q.next(), null);
});

test("picks a meow take and a slight pitch change from the injected random numbers", () => {
  const takes = ["a.mp3", "b.mp3", "c.mp3"];
  const rolls = [0.5, 0.25]; // first roll picks the take, second sets the pitch
  const random = () => rolls.shift();
  assert.deepEqual(pickMeow(takes, [0.9, 1.1], random), { file: "b.mp3", rate: 0.95 });
});

test("never picks past the last take", () => {
  assert.equal(pickMeow(["a.mp3", "b.mp3"], [1, 1], () => 0.999).file, "b.mp3");
});

test("stays silent when no takes are listed", () => {
  assert.equal(pickMeow([], [0.9, 1.1], Math.random), null);
});
