const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK05ZTUpVeXBldGl5OXJiL2lpV2Zsb3gzcTU2RVBYK1dVOUs3aWhBNGhIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUZGaW01SmJVQ2JPZ1hKUDRsSngxK0xLQ051QVJjUTViLzJUZ1RkRE9FZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0QU5tbDlxeHU5ME9XY29SL2dUQ1pocW9RdFJEUnJDSWFCY0FPTTMwZ21FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQThNUllzWEV0ODZveVE1eFVOMjRIdGlrU1pCeDB3cGdkUUUwYW9qSmlzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtDWmh1cCs1ek5hSGlGbFpBTlIzNHM0Zk5vQm9wVk1uNTBXa1pLczlsMVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdMRmo5UEpRRFJlOTJQK2I5azY3MWpxaGg0NEU1NU1QNEdBbkZhcTl1RW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY05oWUNBc2VZSm54SzlZWUxDQjdrN2pYa2FpQmw1UDJibzZsenNoWEFFYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUc2NlBPSjExM3FJRkZUN1NLMnlBRjFpNHFBZlZVR3ZKWXFCQVVlamxoND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZzRjdvY2pKbDhBV2g0WHkwQ1dBQjdUSHZGeDFoc1FFTzI0elFNdGVPVXZRZThITjZmZktNZU5iWjFYZ0ZzdzZjWGw5UE5EV1lpQXFXUld5QThyQ0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzQsImFkdlNlY3JldEtleSI6InZIMm5keDNGaXlnaDRyYzEzTnNxcTc0RUFXVXY2VWFjTE5QYkJNSEJ5UVk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjdFVTEtLWxxUkpDdDE3MDRLeFU3c3ciLCJwaG9uZUlkIjoiMTdhZWM5NWUtNWRmZi00ZjNiLWI5NGQtMDA4MmJmOGZhNjEyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktjMjN3L0ZWbEJKVEJsYVIrZkJxQnhkanpxaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHV0F3SmJ1NGlxSGVOTW14OXh0VkE3SzZ6ZWs9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ1BaNUI5QkwiLCJtZSI6eyJpZCI6IjI2MzcxNzg2OTU3NDo2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOZW0xOGtIRU9YeTE3RUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJleTdKR0p3ZndnY080YzhWVGZnSmduQmxlaWtLVWhLbGYvL2R2dStBY0RVPSIsImFjY291bnRTaWduYXR1cmUiOiJ1QnRZKy9JK3R6NGFHMHE5ZVZPenI4THlRa0FMWWdrbnY5SDhGRDFBVnRwbEFNRWRrakoraG9Yc2VXTXUzbDF3OExweGlZa24yOU9GbEhpY0x2ampBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiU0lsN0cvU3g0NTB6T0tGc3k4WHFUU2JLTWRKc05ENWlQQ0tqLzU2UHV5NzBpYmE1ak9raW41cjcwdjVKRXRiVGNGM2xrMGFlcGpIN3ZWcWUrSG95RHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTc4Njk1NzQ6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYc3V5UmljSDhJSER1SFBGVTM0Q1lKd1pYb3BDbElTcFgvLzNiN3ZnSEExIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE0ODEzMzAzfQ== || 'zokk',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Lilnem",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",   263717869574           
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
