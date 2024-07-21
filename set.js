const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk52Rnd6V20vUWVTWFBXQXJVdUZyVENHZUsySlJJcUlBM1RjVDBIZzBYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaytGYmpaWFc0Uis0WCtvTXYwTFZYbWNCMkpNWitFNkRVODIvTzBxVk9tZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSjZ3dHF3c1V2VmJVcVIwa1RqZk5UNnhLVlJ2Z2lhZlRKRk1heHl4alZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNdW9GK2JQVlhSOHYvTEJlTXYvb3VJakVCTVJCNlpsdW1mYWMxQTkrTlVBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVQMklrY1MyVkZOSGpoVllxY3hXNGhORjJ6TFBnZXp2Q3VRNlM0L3JvSGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZHOXVxS0YxNmdtSHpJL0R5UGcrdTN6UzcwYnZweVFxVzkrV25lQ3V4ZzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0Eyd1ZiUjB4V2RHMWFwYitMNHIvdTlxTDB2R0Rjb3k0dGdrOVdnT2pXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWkFRZVJEc0QvSWtPOXRnM1Y0b24wM3RKc1ZiRHJoQkw1RDZXL1hQUzgwYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjgraFM3OHlsRnNXUUtQODUyMHZ0cGVHWkwrS20wZFZTOGlBTFVXd1V4NHZFbmx1V3NZcm9ZMGVmTFRqU2dUZXA3U2NJUm94VHhjYVBCbG9NRUJsU2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAxLCJhZHZTZWNyZXRLZXkiOiIreTRlWU41MUhoc1hNQ2svS1ZNTkYvNnN2Nm9DZXdMcFZtMDJOQ2dOT1F3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4ZFg4c1NUd1RNbWJXMGd6M3M2d2ZRIiwicGhvbmVJZCI6IjZkMTNkYzIzLTVjN2EtNGUzYy1hYTljLTVkM2Q1YjUwNmRiMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMVzBTZWt2VE40WWVZT1NlMTFiUmV6MjByMlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWkR3bi96K0tKVDRNZUNyTURpVDM0YlZ1MnQ4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkszUUpHRUxOIiwibWUiOnsiaWQiOiIyMzQ4MDYxNDEzNTc3OjUyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNL3lsRHdRK2FYeHRBWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIyL2V2QzY0NWlXRloyRXY1ZzB6YlR2aTNzNnRYLzBvMjJQU08wc1lSazFRPSIsImFjY291bnRTaWduYXR1cmUiOiJKM2QvUE5ENTFEMkZLUmZrUTlIbzhEaU1ocVREdlhYYU1JenVUaG9zMFJnUXlYVVNBQXgxWGpMV3ZCMVNXOElOOWliWWExU0NVckd3NlJYajNjY1RCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSUYybUxrNmV3TGVlOHY3ZFNjMmFuRXdPODZrUGhzc053QXFhSFYyd2lIbnpaT1YyUFpOMWpYS05uVkpGcDcxWXBYZDFaVEZIaVRueFNObWd4ZThhaWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDYxNDEzNTc3OjUyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmR2M3J3dXVPWWxoV2RoTCtZTk0yMDc0dDdPclYvOUtOdGowanRMR0VaTlUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE1MjA5MDEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUDIvIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ayeni Josiah",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348061413577", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
