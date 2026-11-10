const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits, ActivityType } = require("discord.js");

const configPath = path.join(__dirname, "..", "config.json");
if (!fs.existsSync(configPath)) {
  console.error("config.json not found. Run: cp config.example.json config.json");
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
if (!config.token || config.token === "YOUR_BOT_TOKEN") {
  console.error("Put your BOT token in config.json.");
  process.exit(1);
}

const types = {
  playing: ActivityType.Playing,
  watching: ActivityType.Watching,
  listening: ActivityType.Listening,
  streaming: ActivityType.Streaming,
  competing: ActivityType.Competing,
};

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let i = 0;

function applyActivity() {
  const a = config.activities[i % config.activities.length];
  const activity = { name: a.name, type: types[(a.type || "playing").toLowerCase()] ?? ActivityType.Playing };
  if (a.url) activity.url = a.url;
  client.user.setPresence({ status: config.status || "online", activities: [activity] });
  console.log(`Activity: ${a.type} ${a.name}`);
  i++;
}

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
  applyActivity();
  if (config.activities.length > 1) {
    setInterval(applyActivity, Math.max(15, config.rotateSeconds || 30) * 1000);
  }
});

client.login(config.token).catch((e) => {
  console.error("Login failed:", e.message);
  process.exit(1);
});
