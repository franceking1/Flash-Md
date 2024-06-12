const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>',
    PREFIXE: process.env.PREFIX || "FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0ZNQ3F2VGErRUE3UnBaZDhXQlJnS2FpZ2g0VkdXdDVhbmtBMTRnNElYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0l6dlJ6WFdQaHB1cWNheWpDSU4zaHNFSk94L0J2cUpkakR6MEFtaWpGbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSTJaNG93MkZsM3JUcFAwbzVlWkdjTTczRXNxL3ZTbUNDL2JDdEpUNTIwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2MjRJcytsVkZMUlNUb0pSK2hYVWhzdEFvMDl5ZFZrT20rTXN4aS9ZZG5BPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNCMGVNT0t3T3dGR1A5MGJkWHUzOUp1N1h3dlZJc3dXQm5YTkorQWM3RUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhPQkhmUTVlaTVvRmp4Ykt5dHQwMXpqMTlMTXlkNllQK3kwSVVsZFlQVUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0JzTkxOc085TS8vOExXOGlkb2tJbGk4ZkliS29sUFFYYXZURituazBtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMnBXM2J5Tk9qbmpTczR3QkdxQjNEbGpuU0FZOE9EQ3lDU1Rsb0lzbnBrVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJkMDJXb1lWY3UzK1Z4aDFPUmN4L01FV2llQzEwOTY4a1VDd1VHVGI5UThleEZhTVNnRVc4QTVpc2pjZDI0eTJGUGt3Y0taOWZ1NVVlTTY0VG11NGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU3LCJhZHZTZWNyZXRLZXkiOiJVeUJXNHFDU1JJM1Zzc1puSGhqcU9TQkNQVEwra0Y1TjlMcXpvbkloMDhNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYxNjA0NzExN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGQzVCRkNEREFCM0ExRkY3OTcwNkUxOEQxQ0NCNjFEOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE4MjI0NTIwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJSUVhBYktSQ1NObWk3V1diMm9vZy1nIiwicGhvbmVJZCI6IjJjNTljZTRlLWEyZWUtNDMwNS1iZDgzLTMxZjAyZTM3ZmRlNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5YXEzTHhQZ25ud3RnVHJVY3JmeWhWQ0JzUk09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEM0dlUwTlRDOUdhMzdPU3ZsVTN6eTJyYzBjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlMzNEM5SkVWIiwibWUiOnsiaWQiOiIyNTU2MTYwNDcxMTc6M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJNb2ggSGFzcyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGlDb0djUTlJeW9zd1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSWpZd1lsdG1WU0JkMXBIaDNjSFhkY05oYVNLeU5CYkR0MkdxaitTc2hSVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQktsalkvalphcDFHdzVXd2JNWDJ4TTVCUFJGOGJDWm1qT1lGcGtVK01VbUZIMGZXalRvUWhYa3ZHaVFzS0V4VVRVdGl4c3hJVHM3OFl5VHkrdUZIQVE9PSIsImRldmljZVNpZ25hdHVyZSI6ImFxT21FUktNbWZKVjl0R3NpcHhYN3loT2dObkcvSkw4RzlwdE5Sck41c1ZCZmdkcmg1QkZwNVNLUnY1VGtJR0ZVZ0FMQkxWSzFQYVJUMzI3UG96dmp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjE2MDQ3MTE3OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU0kyTUdKYlpsVWdYZGFSNGQzQjEzWERZV2tpc2pRV3c3ZGhxby9rcklVViJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxODIyNDUxNH0=",
    OWNER_NAME: process.env.OWNER_NAME || "moh berenger ",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "255616047117", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
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
