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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMktUZzV5Y3ZnaTMvYzBMczZvemF4QWxtbUtncnhPbDFDWDFSZytRUTVWdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNmUrRHJKUGgzZ1E2ZU1WNlFYVGdiampWamZ6REhQd0lhM2hxR0JkZnFsQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TWwxNTlHaDZrNVRWeWt4Uk9OZ2k4RTNaZkdjZFlubW1hdFNlN25HeGtrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0Y0lHMEluaS9TYVNxRXhxaGlqM2NZdGRZZjludkRHV2RKWkQ4Uk5HMzJFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRObFEveUdlMFF5ZlB0bnRnR2I1OC9jaWNHTFVvb0h2OENmdE4vVUJUbnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InN5SEd4VExZL0hOb1ZFeWFFcTJzRjRhMnBTb0hnTVk5VCtVajFadG14Z2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU5sQ05KdHRCc2VQbHo0cWFTQlJOTnZPRmJaWGJ4VzB0NDRlZ3R6b0hGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGxGVG1NTllESThESTJDMGUycExqT3BPenBYMnpTckMxKzNVVGd0WW5IND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZrdVVmV0ZxNXNWNXJCL2hNY2c0amJSeUlmcmx1YmZyL1dCZU5nc2ZEc2RWY1FaSmJDZGxCV1BoWmpmbDI5emxxRHFrNG1PblNsVGNQNzlPSjM2UGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU0LCJhZHZTZWNyZXRLZXkiOiJuRU1hRzZWdGRMY1Q5MzZyTGMreEJneks5M3lENjQ4TkJNQzJFZDV0cUhFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI0UUlmWHZiVVQwS3hTa1dsb184bjVnIiwicGhvbmVJZCI6ImMzMWE3MjYyLTMwNTAtNDFmNC1hMGEwLTBmYWVmODMyYzkwNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTK3VySHJadFliSUpka2NYSzhoZ1ZIdjNYd1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3lpOHpISXRXVnV0eE4wVGdVaUczL0JQOW80PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdKTEFDRzVXIiwibWUiOnsiaWQiOiIyMzQ5MDE1NzE4MDQzOjU1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPT1VscThHRUxTdG1iOEdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ1SGdVYktTZEpKL1UxZHQwUE8vKzFnZzdXbjhXc2NocEtBWWdvSlNJOVZrPSIsImFjY291bnRTaWduYXR1cmUiOiJWSERCMENvRnY3Z0tYMUtzWDdwZmVKRlFyRjJmMUxLZkJGcU4rSTNXazBTWEl0K3BsaWdXdllvUGpHRHhyTXA4Y3dqUkF5QUdzV0NRTnZGSkh2WXNBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicTBDRVY4NEp4S2ExNnlsNHJLMDlHbXNpTG91cE45MEVOVHJrMmxyU0lBVVVCSmRzSVBYK0kvQXhraE94bXFMeVFad0g5MzNGZW9aUEthWWlaQ2pQakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDE1NzE4MDQzOjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJoNEZHeWtuU1NmMU5YYmREenYvdFlJTzFwL0ZySElhU2dHSUtDVWlQVloifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDMxNDg3MzgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSnhJIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
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
