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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0IxRFhDQ1BEYXhWclV4Rm9HcHJuajdETTVHY2dTdnZjRUsvb3p0c3ltdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV05RcTl5Vm1KMDF5RHhHdTZsUUh0eEYzby9HNUpMNGhza2xoQnJ4OWYxRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTVJpWEdwckdGVnFkTVJBSDAwRk9hYmNVakZMQkU2cnBadXNBNGJYMkZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5eUtIOWQvbzg4Si9NNk4yRjFUNUpIWUtRYjdEVFVTZVA2SHp5eSs0cWpBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhLSVgwZ3J0YjY2cktQdGtTWXNPT1dNMmNFMzZLeXhIdEVTZVJibVFORzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9hSTJOOFlWcWdsUWxiWXlqU1BaU0Y2QzlEQjVoRVFhR3lqQ1MrTnRGQ0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0daUWkrRFBzcWZUZ3pEU3dpc2d0czhoT3VCa0hYdFJra0NhTDZkN1lFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWGxBaWJGMnlaZ1RpMWNyNkNRUlhMYjUySEtycHlFRGd3cm55MUFjTW5rRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZqZlNEb1FHc0NnQjhEZU1JTUNhWXpqcm5veU90cVBmNjdHS2ZXRGoxWnA0TmlxOVdMWTZrbEE5VUxON0g4RjJ6RUtjM29TbDBhREhiYnN3eE9RbEFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ1LCJhZHZTZWNyZXRLZXkiOiJ0Yy9RN0c0RHlnaWF1Qmd0MksxbVVhSTNiN1lkRTZxSnN4WjRIbWUwYmJFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYRVhoblBzRFFRQ19KMnZfcjN3bU5RIiwicGhvbmVJZCI6ImVlMWZlZWZkLTA1ZWMtNDExNy04YTYzLTIwNDFmNzY1ZmMzMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJodFZEOUVoVUJDN0krLzBwSW5tNngxM1dVYkU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRk56NytpVVY4U1FaQ2d3VVF2cm9oRjd2RjQ0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkVBUDdWWkYxIiwibWUiOnsiaWQiOiI5MjMwMTIxNDM3MzY6MjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVW5rbm93biB1c2VyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMK0p4c0lFRU5xSjlyMEdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJvV0RtMlpYSCt0OGVvU2szQkcwdGpQQUJHdVBwMXRaN211ZHpkSzgwSGk0PSIsImFjY291bnRTaWduYXR1cmUiOiJRb0RWZC9JdmdHRWhIa0hpcnpsamN3RU1CQ1JyaXlPa1BlaWZxNnBhYVBNYWZlVWJTVkhpNWI2MldVcTdFSHgwcmJ1L2d6MHhRTGpFenUyL3FrZ0dDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaFFSTXJWT0FraU8yeWNkQVQzUWljcjVhMWtmUFN5eU5JZXBuOHZ2UHRYZHNhNWxSTWw1MzBCUkhIVnBCUDlxcExaaGpudzJJaW12aDIvVjdXZm9XRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMwMTIxNDM3MzY6MjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYUZnNXRtVngvcmZIcUVwTndSdExZendBUnJqNmRiV2U1cm5jM1N2TkI0dSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MDQ3MzU3NSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGejgifQ==,
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Hacker",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923012143735",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
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
