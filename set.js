const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || "FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU5xSjY2S0NNTklqOTRGQXB3ZStuc1NlSWtiYUpNRjBMWGVuYlQ5SDMyOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1pGTWV1NkZRQmMzbE1iTzFDM1MvV0RyUGNzbmxoWUVJUVJPdEkrSmdCRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQitBMTdyeEpiTXRkM2tTSnFDZEViWDJHMUl5MWhMSXdHN1lwS0I2ZW1zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaNmlFUUl0U205c3NtUnYxdDR2SCs2ZzNNc0JNSG9zaWJna0xFL2Rzc1ZZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1KdHl3V2pZYXpXeXpsaGphV0VzazJnWE5EUVowWG52M2FUQkhNUG16VVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNMOHYrUkJ6Wm5ScmM2WjQxZkwwd2p0Ymc2c2pnZTJJU2R4VEtSQmZrUkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0JUZkhwTUpGT2U2NzNBbTJjR1RFVm9KeXFsbG9wUG5qWmpkZ2EwNkJtOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGxqL3h4WTM3Nkd2MmJ4N0U5enFzaTF4RHZ4eis2ZkpMNllnQ05IWnlRaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNkQS9HMnE3YVNQNU1sZWpHSkNyd2YxQ2g2SXV3dS9KaDhCZ0VmbEtyRkV1Q1drb3pHY0RUeHpIZHU4czIzZHlSbDQrT1huSEh2Y05YTFlTYWFxMENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiIyaDUyNUdiRkljRlZXS2RqbGMrRWhFdVpnWlVUZEp6eXFPbnZKZ0gwZWdNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJEeGxnaUFlSlNlTzlMYm1qaFRkTVB3IiwicGhvbmVJZCI6IjY5MTlkNDdmLTlkNzUtNDIyNS04ZDQ3LWM4YmJlMjY1MzBiMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSVJ6ZnI4N3BBWGdUdVMwZzAvMTl1NzJjWlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicmYxTU9ycXVmcjd2MXpVRjljNlZWeCtDSlFFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNBNEZBMlREIiwibWUiOnsiaWQiOiIyNjM3MTc2NzIwNjg6NjBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0l5enVlc0hFUFQwbDdRR0dCSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhJeUZmVGJLMk1RaTNta21PQWRoSVQ3YjdFTngwTHVHMnllYkc2KzJYVGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImtIMlFubXk4RXFWMXVzcUtnTnduSTJzOUJKMTh3UFNyUEVvaWl0cU1uVUlvQjYzQ2t6ME9rM3JTRDZET2pBSnl1aHgrZDZUWHJ4cnpnZkcrMVZlTEN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJqbTZFSFp5eS80ZmhETzV5SW14WUxpTlpJdm5ITXAzLzZsajJ5cjNiR1NiT254YitlamlBWlNDYjFZSHRRNWw0WmlqQjdGSWwzYzNaQ3JzcWZsOS9BQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNzY3MjA2ODo2MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjU01oWDAyeXRqRUl0NXBKamdIWVNFKzIreERjZEM3aHRzbm14dXZ0bDA1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMDU2NDQ5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1PYiJ9"
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "k29promax",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "262717672068", 
             
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
