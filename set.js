const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0pKZU1IcHQrUTF0TlkwRFh4K3RyOHcvZW4rNnBDV0EwQlE3Z3h2amJFND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEpUK2NnazBnNkNUK0xzUkdaY04yWW11bmdkTENQRHN1MXA5NVlVRW1Ydz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTSFRDQ0I0OW93dDF3VldXcHFXc2JKQkpXY28wVXl5eWRMS05FYVJ3NkUwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6QlFUR2JqK3BqTFNXcDg2RWsyLzNUQUZseGdHSGhlZUNJTElUL3grbEdJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVCWll2ZXVmRzlVL0R4aEU5bllWd2JHdXRWM0hlTnE0N1Vpb1Fya2swM0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdUcE12Q3hyb01CaytvT2VxTzBrS3dwUkdvVWVsajlRTWhIdzRqYnlibGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0c1L1hOTlF1QVZGYU1jOHFvQzFiMlo4WHVacHVWUmJiT3l5bnNYakEyTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnpxcU9nRnN3SE84M01aeXMxTDMvTTVBLzNPMGc3VHUwRWRUNUkyR0prYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNRT2FQQkI1MDQxSkpmVW1KRTE5djhqYVFyRWV5NHQzeGNrT3BjaUpkcTN5Q0pxL1pJZEt1V1BNNkxTQ09PUGdUWEllNlVhWHkrMUg3OUdHTkI5a0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI2LCJhZHZTZWNyZXRLZXkiOiJCNzJoeFdnVERCMTNBTGRRYk5RK2FLNW12WG1lb2hJZjVOcnd1QWp2VVhvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJRktNcjRjMlEwZXhObnVwR180SDlRIiwicGhvbmVJZCI6ImYxM2RiOTMwLTcxM2ItNGM1Mi1iZmNkLWQ5ZmI0OTk0ZDk0OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYNzF3NGpBdENEZThNWGloaGYwV0JmR3Rudms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRS90ZU43Wk9Dc1RkZkt4M0JpbTRhZ1M0Qk04PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlgyVkUxRFBOIiwibWUiOnsiaWQiOiIyMzI4ODQyOTI0NToyMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlBwekswREVMdkJ5ck1HR0JnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZGpzcU1kMU9VNHRJSXc2SSt1bzlEdm5DU0w3bldEVFVhZDlwQXdCdjlCOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoib3BKSWxTUXVpNTl4Qkk3VzV1VGd6alJHckxKMWFHS0M3WEJ4RWZlQzIyYnhaWWUyQ3ArcEdFMEtvUDFWTGtvQVk1Z3JaSzlpMzM2akxLZ0I3REhiQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IkJ1UVRBQkN5Qyt1LzNXa3BsSzVqZEJYb0k5ZDFqMmsvYk5DU0FiRzhKMHRvRmw1cFRkeWRwKytLNkUrYUdPbXg0b1JzWGYrOHRIM3pYU3N6N0lQb0FnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjMyODg0MjkyNDU6MjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFk3S2pIZFRsT0xTQ01PaVBycVBRNzV3a2krNTFnMDFHbmZhUU1BYi9RZiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxODc4ODI5NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCUk0ifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mohamed k Bah",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "088429245", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'Takeoff',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
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
