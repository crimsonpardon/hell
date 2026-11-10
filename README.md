# Activity Setter

Set a custom Discord Rich Presence activity (title, details, images, timer, buttons) from a single config file. Uses Discord's official local RPC, so **no user token is needed** and it is ToS-safe.

## Setup
1. Create an application at https://discord.com/developers/applications. Its name is shown as the activity title.
2. Under **Rich Presence → Art Assets**, upload your images and note their keys.
3. Copy your **Application ID**.
4. Install and configure:
   ```bash
   npm install
   cp config.example.json config.json
   ```
5. Edit `config.json` (clientId, text, image keys, buttons).
6. Make sure the **Discord desktop app** is running, then:
   ```bash
   npm start
   ```

## Notes
- Max 2 buttons. Buttons are not visible on your own profile; check from another account.
- Image keys must match the asset names you uploaded.
- Do not use user tokens (self bots) to set status. It violates Discord's ToS.

## License
MIT
