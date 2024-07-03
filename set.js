const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || "FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU9CL3lUbmY4OWtRL3Q1VjFDRnFFSkN0Mk9EeTMzc3NpT0I5b3BUemgxMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGFmMC8zNmV0aTBiVGplYjlaWWNEOGp5MTFpR1Rmb2dVcTBLQ29PRUpSUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtRzlZTzJycDQwTHJpSGdMak8zMjFkMTRiaFM0cytZRFRJV3ovemQvOFZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDdEtrL2ZDZmo0S0ZiY3Uzamh6SEhPeVB5eDVBMWNYYksyNmdhTCtVQzBJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNJV0xicWJQVWtFbTk3dHpTajdiTktLN2kvSE40OFdvek5EeURaRnZLWHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJLUU1jT1UzZnkyQ0NNZU1qYS82blJ5d2xSY2JIUlY0OGhLeFgxdzZQaEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUlMRVZXejhwWG9WVFVCaFpzUTRwRmdkUERCd2xobXhMcTBaaFJPb1VVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ3lyU0VHM1J5Y0Y0RDlEcHdDZWovZkZXOUFvK0xkd3NqdzREOVkrZTdWQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ing2RjY2YnNwOVV2ekVRN0I0eGl6eXM5anJGTU5KaG85UjBGc2dnU0lzbENhM3BJblM4YjU1SENhR2xCckJKWjhvYWd6WW5PWWNKZmZhS3RnNDk4aEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ0LCJhZHZTZWNyZXRLZXkiOiJkKytzUGpsYU9tRHY1MWNkZVhoVkl2blRJdFNJNHp4VzFXMzZWWVNyNXprPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXYmNhV0NwZVJqZW4yY1RhN01ocjR3IiwicGhvbmVJZCI6IjczYzRiZTBkLTE5MzktNDQxMC04MmU4LWFhYmYwOTIxNzAwYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3WXd4WjhUa0tFMzArL0p6a0Vsa0YwTmEzQzA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWFmdnFLMVJrb2JpNlpKUlp1RUpSdHNXT2VJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik05WEJQN1NEIiwibWUiOnsiaWQiOiIyNjM3MTc2NzIwNjg6NTNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l5enVlc0hFTFhabHJRR0dBc2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhJeUZmVGJLMk1RaTNta21PQWRoSVQ3YjdFTngwTHVHMnllYkc2KzJYVGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlhHN0xuZ2MyRU1zMFU5OVFQc1pWaDZORFhUekhGVHBSbG4zWnZ1TitqMGE5MTNjM1B5b09uZmZiRk4vYktnN3poN2NKNUdGTGsvak1wNy9lME9RaENBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJzblJPd2VUbGhYSFhjb3VQM2VHYThpdWwvTW9aWkp6eEJXOXE5MDB0TWtSa1RWckNWN2UwVWVJZ29BdEUvZFk5OW9IRW5Zb0t0VG14dUlrV1kyelFDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNzY3MjA2ODo1M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjU01oWDAyeXRqRUl0NXBKamdIWVNFKzIreERjZEM3aHRzbm14dXZ0bDA1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMDM2NTQ2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1PUCJ9"
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "k29promax",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "262717672069", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "public",
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
