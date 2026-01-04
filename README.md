# Hunger Games Event Bot

A Discord bot used for managing Hunger Games event registrations, conducted by me in https://discord.gg/sound. You can view this channel here: https://discord.gg/WVUBrBucjj.

## Setup

1. **Install dependencies:**
   npm install discord.js dotenv

2. **Initialize data file:**
   Create `data.json` in the root folder with:
   { "names": [] }

3. **Configure environment:**
   Create `.env` file with:
   ```TOKEN=your_token
   CLIENT_ID=your_client_id
   GUILD_ID=your_guild_id
   LOW_MEMBER_ROLE_ID=staff_role_id
   PORT=3000
   ```

4. **Run:**
   node index.js

## Commands

- `/addname`: Register yourself for the event.
- `/viewnames`: View participant list (Requires staff role).
