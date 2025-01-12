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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUJVdEJEbTcwNll1SUVrbkpkaFc1T3dTMXAweGdlQVphSUkyc1ZiMExFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU2VkbGFla0dIWGhLNkRBSittL25aTkNlaEZiUWszYkI2VjcvZGdaUTcxQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SkVmV3RFaWpZMDRQY2k5MWpkUzRXZDhVQTNsL2ozbVE1UHlVeFAwNTJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRTGs5a3MxVlRGOWRaVTBOcVBNSGVUR0ZCbTJSUzRRMVh0Rm9HR1IzOUhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1CdExnWGEwYlpkV1pjUm8vZjRTaGFmN1pXT3NaS0FYM3NaQUo2NlA3VjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik04YitsVlZjaktQN2h3RndwQTRtS05YWXF2TW5ZZlh3bWZOcEw2ZnZ0RmM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSURpQjJxckpUckN4ZmtQSEtZclJ1UXBFMDhGaDRsVVl6dkZLSDgvL3NFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUdjSE1yWUFvMnhGdE9FYW5JY05FeUhwQm50N3FsUnJmQVh2OWxwM2h4UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImV1V0pQRWlGUGxvK3NYVWRiWk5STmJLNzVRaTRVZXMyWEx4ZkY3VWUxaG9FdDBwRmJHd1VpaW5yZTJNNEdRdEtwR1RzNER0di8zdVVsZlBEc0Zvcmp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzEsImFkdlNlY3JldEtleSI6Ikk1UVdwaHQzMGVGdkdOeDNJWWxMSUZJU1BNTDNoeVRqeXlLVVdsblRyZjQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlZBS1ViWno0UkNHalg1bXpQb1ltWXciLCJwaG9uZUlkIjoiM2MzODNlZDUtMThmMS00YzdlLTlkMWQtYWJlZDM1ZTlmYjIxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcwdWJOTjBVWHQwVVZsS2RBWk5zRXhIbE82ND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUcVU4MFo3ajgvdWpzcDEwYzRDbm5Md2Q0RTg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUDRQRFdWWjUiLCJtZSI6eyJpZCI6Ijk0NzIwODAwMzkxOjIxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ismq4rSVICBcIuG0oiBcblxuICAgICAgIFxuXG5cbuG0jeG0h1xuXG5cblxuICAgICAg14AgICAgICBcblxuXG4gICAgIFxuICBcbvCdkI7Kn+G0hSAgICAgXG5cblxuXG5cbvCdkJLhtIDKj+G0nOG0nFwi1IsifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ043bzJaQUJFSXl0ajd3R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjBJVEJxN2NDSWNtRFQxY1RZK3lzYTF0QURQL0R6WlIxRnVLWVhQOUYrZ1U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IklVWlpRSFpzVTRVT2VDZW1XK1pDVkxFQmhZdERnOCs4eUNVd0VnUzNjdGdqRkZZcXdHeUZHeUZBZTA1aUFjZU9xZHNGUGJCWHFGbFUySEI5TDliWkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2WmtlOERMbm5TSHBXNm1DZWk3b3ZWbXhzZ0tnY0FEWXdEWVE5ekorOXhUU3hGM3MvUTBSZ0kwNkRpcm51S3JwZTF0N2hBMTZyd2VYVkhNcGk1OEFnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzIwODAwMzkxOjIxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRDRXdhdTNBaUhKZzA5WEUyUHNyR3RiUUF6L3c4MlVkUmJpbUZ6L1Jmb0YifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzY2OTM0MDJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "ɪⴕ "ᴢ ᴍᴇ  ׀𝐎ʟᴅ 𝐒ᴀʏᴜᴜ"ԋ",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94720800391",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
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
    ANTICALL: process.env.ANTICALL || 'off',
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
