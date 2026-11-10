# Bot Status (Termux friendly)

Sets and rotates a custom activity on **your own Discord bot** using the official bot API. Runs anywhere Node.js runs, including Termux on Android.

> This changes the **bot's** status, not your personal profile. Discord only lets the desktop app set a user's Rich Presence.

## Setup (Termux)
```bash
pkg update && pkg upgrade
pkg install nodejs-lts unzip
unzip bot-status.zip
cd bot-status
npm install
cp config.example.json config.json
nano config.json     # paste your bot token, edit activities
npm start
```

## Get a bot token
1. https://discord.com/developers/applications → New Application → Bot → Reset Token.
2. Invite the bot to a server with OAuth2 → URL Generator → `bot` scope.

## Keep it running
Use `termux-wake-lock`, or `pkg install tmux` and run inside tmux.

## Notes
- Activity types: Playing, Watching, Listening, Streaming (needs a Twitch/YouTube url), Competing.
- Never share or commit config.json (it is in .gitignore).
