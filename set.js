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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ04xQVM0S1RTYm9yYzlEMkhaSUhNSUd5ZjlCNXRVL3NDZlpHMXlsZzRHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGs4VU04ODZaS1BZUjljL2lBQXNKa052eDhvYS90SFlzdGp0NUplS09sWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTEMvd1dnem9zSlpQWnpGMEFaUkV5UmtRK0tJeVBWczlJUHl0Z1NIVUVrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQNE0zNnZZWHBVTkE4SEhLeTVFMDRPNzhoNHJsTnVmK2dmbGRlRFZqMVVvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBNNloraGVjV2NIQUZXQWZPby9hRWFTajF1WFh6UFZ3UGdNbXRGQWtjVU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVWZHh3bStDU0o0WlhhVE9sM251ZHZIeHhiaUwxajR3QlBFTVlFZjBLazg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUlMSi9iYnE0bUVPaWhKWXd2NDdUcjZOVXFtSjkyZ0hnSEJtNFBGd1lsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0VDaWgrVy9OQWJWTEhoNG1OeVhTS2R4dDNaQU5NMDI1cGhFYU9MRmFHbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9xZ2RlU3BvWVpkdkQ3bDR4QTNhMG81a1pJanFPczNSTFpqdGlMbml4SlBmRlcvV2lRN01OWVZZODlxUWR0NldDQjhOK09adHJrSFJRQmhXcVNOTERRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OSwiYWR2U2VjcmV0S2V5IjoiKzU5MFNvYXpKQlF4YU1TQnNpTW5ZL0RGNjJXUVRjbVZLRmdsYVhiZ2E2ST0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIxODY4Mjk2MTkxMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwNkRGRjA3ODM5NkJFREUwQjRCREU0ODRDQkExOUFGRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMyNjQ5NDkwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIxODY4Mjk2MTkxMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFODVFNkZCMzI4QjFEQkMxRUU1QjYwNzRBOUQzM0Q5QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMyNjQ5NDkwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIxODY4Mjk2MTkxMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3M0IzRjQxRDJCMzg0RjAzOTI5QTI0NTVDMEQ4Q0FEQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMyNjQ5NDk3fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJvZU5OdzhOaFRmT3RIMEZBLXdKajl3IiwicGhvbmVJZCI6IjhmNzAwZTJlLWYzM2EtNGZjOC05YzViLWFkYmNkZTMwMDQxYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUc1lLUURsTnBpdlF3MUJ5QTd2MFc3S3hlVms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTFGL1h4L3RZeHhvM2l0OFkyNVNaWjVzbWFFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhZTTk0UjhGIiwibWUiOnsiaWQiOiIxODY4Mjk2MTkxMjo1NkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJFbWFu8J+RvyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0xRNmNRRkVJVEVtTG9HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiODdzTHVURkdXZ1J4S0Y4aWxiMWs5NklCbkpaZ3hhT1BsRG81UjVTVlpVbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoieTJORVk4bjFGbmtHVnkxV1RpRVp5NzA2VWZNMmFxcGtHa0NaNWlVclRSVUJDdTZrMW9nME5qbmtqeTg5emR6cHhMUCtSUTJxNkJNVnFTVEt6SDYvQXc9PSIsImRldmljZVNpZ25hdHVyZSI6InRFeCtGc242R2lpME81Y2pkRVF2WmpYTVRlZkNPbHhvdkoxVWVDazZhK2xIVXlxb0J2bjg4NnU2WGlhOXpGUW5lSHR5d2t2UytZYVVYZnVXcTBZOURnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTg2ODI5NjE5MTI6NTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZk83QzdreFJsb0VjU2hmSXBXOVpQZWlBWnlXWU1Xamo1UTZPVWVVbFdWSyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMjY0OTQ4OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGWjQifQ==,
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Emmanuel",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "18682961912",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'off',
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
