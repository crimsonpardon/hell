const fs = require("fs");
const path = require("path");
const { Client } = require("@xhayper/discord-rpc");

const configPath = path.join(__dirname, "..", "config.json");
if (!fs.existsSync(configPath)) {
  console.error("config.json not found. Copy config.example.json to config.json and edit it.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
if (!config.clientId || config.clientId === "YOUR_APPLICATION_ID") {
  console.error("Set your Discord Application ID as clientId in config.json.");
  process.exit(1);
}

function buildActivity(a) {
  const activity = {};
  for (const key of ["details", "state", "largeImageKey", "largeImageText", "smallImageKey", "smallImageText"]) {
    if (a[key]) activity[key] = a[key];
  }
  if (a.showTimer) activity.startTimestamp = new Date();
  if (Array.isArray(a.buttons) && a.buttons.length) {
    activity.buttons = a.buttons.slice(0, 2); // Discord allows max 2 buttons
  }
  activity.instance = false;
  return activity;
}

const client = new Client({ clientId: config.clientId });

client.on("ready", async () => {
  console.log(`Connected as ${client.user.username}`);
  await client.user.setActivity(buildActivity(config.activity));
  console.log("Activity set. Press Ctrl+C to stop.");
});

client.on("disconnected", () => console.log("Disconnected from Discord."));

client.login().catch((err) => {
  console.error("Could not connect. Is the Discord desktop app running?\n", err.message);
  process.exit(1);
});

process.on("SIGINT", async () => {
  try { await client.user?.clearActivity(); await client.destroy(); } catch {}
  process.exit(0);
});
