const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkV5MTVKMWFtQ3o5d1dTbnhPQ2NndmtWSjdIYmpmM0I3MW9GelM0Z0pIZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidDh0V1FKLzJlUzFSYUIzb1F4TTA5T21IZGp6aU9INTA3Q1dFVGNVTTVRQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTk9IVy9XN2FuNzlyRU1rbElIYnh0VjVKTE4yaXFiN0tJTUxhZXUxYUhBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxR1RQNTVjRHJyTTlBV3cxT09PNHpHSjFzdW9ZOTF4MzhkQ1FlVGY0WVc0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9CaTM3aldTTFZlbVlyRWhaVC9QRkJXL2wxcmhkdXF0VDFySFdzbkRnMWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ino5Ym50dlRrdWl4QXFsczNEbU5peDRwaTF0TThlczRVbHM1bDdzSGZjVk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUFMY1B3RUgwaUE5UWNaQnJvcnFBd1BaMWpkZkwyY2dMWDhvYVNmSklWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzVYbHk2ekpuaVVNSmQyT211dTdpOUxkNjRoVUxzeUgxdWtFcUFiRTAxZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkQzOXNnNUwvRDJ1eUFkdDhjK2UzRWdlTGtxVjdFUW5Nd21uUCtEdVRzRFpiVit0eWVsQWE3YitudVRlbWVCNlZwWmgvemZsQ2VGL29LTTdMbUFpK2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk1LCJhZHZTZWNyZXRLZXkiOiJQMUs1ay9jakpzb2lRQUp1NmR4RytjSmlndW5pSXV4cEZjWE1hRjk0WllBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmU1E4VXVCWFNlU2FJZWJIM1NWaXhRIiwicGhvbmVJZCI6IjgwODE1M2ViLWI0MDMtNGEwOS1iZWUwLTQzZDA4MTFiYTQ3YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJadFdJMFBGeWMxVWRhNWpVeHNKcjRSWHJscVU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWdNRU93RU1aOStUZzlEWGZtdFZYcGhoU2NJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjcyODZSVlhSIiwibWUiOnsiaWQiOiIyNTQ3NDY4MTI0MzE6MTRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ3lydXMg4oSiIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKcnN1ZFVCRU5EZnliRUdHQWdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5ZFBCMGlQbG5EM3JDb2IzVTBtSjR6aFllVm1LWUpEcDZ5S1JZczJsWWdzPSIsImFjY291bnRTaWduYXR1cmUiOiJrUzR6aExYeHFLNUw5VEpiN2FISXg0b1h3Nmo1UCt4U0FKWktBdklEeDFwc1JhY0xUdHlQN2tGb0t4WUI5eC9BK1UxRU5MMktTbnpDYjZNRk54VzBDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiclMyNXNuVmZSWGFtU2RSSkFnUmNDY0VEWXdaanlCQWxDQ2wzOGE0OFV0S2JyNnZObU93OSt6U0FyOVhoOHRSeUQvSHFjbGdaL0QvWjNNbU5pYTRFaUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDY4MTI0MzE6MTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY25Ud2RJajVadzk2d3FHOTFOSmllTTRXSGxaaW1DUTZlc2lrV0xOcFdJTCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNDU4MTQ3MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCL1AifQ==',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "cyrus",
    NUMERO_OWNER : process.env.OWNER_NUMBER || ""254746812431,              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'CYRUS-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
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
