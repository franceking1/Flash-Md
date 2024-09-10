const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUVIeHNhV0crcnh5SXk1cEduRTVYd0ZOK0hkKzlWUWZnMGJod3JSOEZHcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSDZuREZIZnVzWkJUZG4xVnVZTkRKa1UxRmhycERKeFp2b3pGZDU4Z1UyOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSFZOL2o2SWczZHZ1b1dCNG9XUE9oSU1nZS9tSWRHWllab3JjVzZrbUU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIZkdpVkNxQ3oxNmF4bndMdEhzaEkwMVphd2s3aW1DYXZ2UnN1KzlsS3djPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1ETzdMNkwxa255MDVrdUl3dmE1NTFuYzlNRDBIMExTOGIzUDc4RjBxa1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik92eVd5QnBEd3VaWjV5Qkl3NHhIZmcxUUVPOHFYcmdQblRKNFp2eWVad2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia092TFVtdzErdlVneWZ3cUZtUW8vcFRxUjAwUjVBdjlrZGRpN05HRXAzdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEljSURhMVZKeHBZMCsxOERPbEpOWk4zOU5uYlR0MmE5ckZaNjRyNjZDcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1MUVl3WTkrVWQ2NlFZZWlqbG5ZOE1jZU50ODMxRFMxS1Jlcjl5ZWdVR3FzSzZCUDhSZjEvdFRYV2FSL0MybHVLL2tqbXd3aXU5NWZUV1ZsNENnU0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjgsImFkdlNlY3JldEtleSI6Ii9Odzh3TVY0dS9BZXl4NVVoM0pqYUFpeld3WTZuWFlXZVZudDROMjNFRlk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImNPeURWWUdYU1pHZmp1WklYSURnd2ciLCJwaG9uZUlkIjoiZDBkNzc5M2UtYjc0OC00ZmNkLTliMWQtNDA2YjM2ZGVkMDJmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndxNW92UHhPNWhjTTAyS1BKenpSK1pHeC9nST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1K1Q0Q1ZqdGZNSVo2TE12cUV1WWJiSkZnTGc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMzlIRUFXSFYiLCJtZSI6eyJpZCI6IjIzNDgxNDY2MDU5MDY6MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUDNOcE9zREVPM1BnTGNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTE9kOUVidTJNMTUrMnlrc0RMODVmckQyY1JVRmVkMVBYbE9BejBVaDZUVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoialk2S05mdEg0OXpiRlJqYmpNQjQ2OVVUVjBhd0ZDU3Zua1ZRVUppUmFyd2MwTXVUeTB5azBOZ2Z4cTQwMzFBWWZFUDFjYnlsd1ptSVRoV0l3eng1QlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImZCL2Zqei9kRWtyb2tPZ1l5cURRbEFybUY1b0QzYlNmWTdSWmJPaXd6b1Brb0N3ZzBjUHYxZkVXSmp5WndHSE9YUUVNMmMveVhOVWV0NXRBWlZNZUNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE0NjYwNTkwNjoyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlN6bmZSRzd0ak5lZnRzcExBeS9PWDZ3OW5FVkJYbmRUMTVUZ005RkllazEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjU5NjYzMzIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUFJKIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Vivian♥️",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348146605906", 
             
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
    PRESENCE : process.env.PRESENCE || 'available',
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
