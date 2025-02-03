const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0d0UUNudUFaM1FIOEFrMHcyY2tUbU9qSit0dHovdFFvbHM4RWdGRW0wOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaFNDbldwd05adXBsU0lCdTlodDJXT0hDdHl4ZkIwRk4wVVJEa05PSDBTbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5T3dtVE1YL2FIME00ZTNldEQxZ2c1dE9OYTEwZDNpZUJZbUNuQjFtUVVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxYkc0SWFQczJWV3Y4ZjYxdnN0MTlQdnNJNmlyR0VwRTFSWWZkZzg5Wm4wPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNOFJFcmZpVUdOQXVNRGlXNWliR09VZnczeTI1emNQKzlGT09OSWxpbmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR1WUJNYzZKS0tVYllwU0hjVnJWd2tUM2NkNDdLUy82WFNYeHNxTHF5VUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMExuam9EYW5xUStBbWF4KzVQZENwa2Zjck1CWjZSdXVuMWVUbXpRWkVWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOFBaMGg4dWRPSXJmUWg5TmVxR1VkZjhYbGljWXFPTDA3OGxtRkdkTzV4ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJZdDJ0VUhsTVBEdW5CWVBQbTNQKytSZGM1ZmxrUU5XcEUxalE4R002Sng2RXlDUWtBM2Fla3Z5Y2s0dkVnNmlyREdmcUZhOTRrSUkrMjNzbGtNQURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzMsImFkdlNlY3JldEtleSI6InR1WmxBWnEyTDh0VGVBMHorR043d3ppWVlqYTBwWFJaVzRYc2YybmM5S0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjRnNHd3aDdpVEpHTUhkeTBoYUxjZ0EiLCJwaG9uZUlkIjoiM2JlNDQwZWItYTZiZS00ZTQyLTgwMjUtMTg5MmY3NWNiMTEwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlb3RKV2Y4UTBFRnVXU0ZER0NDNWMyb01raz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzYXhGb0ZyQ1NvQ2tSaVhmSlF2ZU1FOVVNMUk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiV0NLMVo5R1YiLCJtZSI6eyJpZCI6IjI1NDEwMjkyOTc1OToyMkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTTJkMG9JQ0VQdWRncjBHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia2YrUFIyZ2Q0VWNxeGlXZURLUmtmYVovSHlPeTNBRlZnUURXZERPK2ZXND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWWwwYU1VQS90QU0raC9wMURxcDlyejJKUEpNZnZhMk9ZMmVyMW1nWVRGQk1mVFBxZWFMaWVyTmxrUHN6QkpxQXkvT3p0d2E3N1B5eDJCVXYzeTFyQkE9PSIsImRldmljZVNpZ25hdHVyZSI6ImRtQVZsa2VlSmZlc0h4VkNsMFNhcHA5ZTRBMzQ5eExpaVlabURpUXlXMXF5M3ZhMnZTTmhqZlIraW1hQit6emFTb0xTSWZHU092OFAranBOM09CVkJ3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTAyOTI5NzU5OjIyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpIL2owZG9IZUZIS3NZbG5neWtaSDJtZng4anN0d0JWWUVBMW5RenZuMXUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzg1NzU2MjV9;;;=>',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "king von",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254102929759",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
