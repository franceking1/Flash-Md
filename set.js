const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0hTZCt6WTJaZ0kxQUxvdmxBOURDNTRNSnViWXJsakdFUmpwVjY3aGpYRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia2p3OU44QUU1MVdjcEx0dXFBaVdCUFdjQUlwMGpaR2ZJMHhnY3ZtdFozUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQkpnVENySjJ0MW4reDNaQy92aVNQVGJWamw5YVhzMXJWQVpoSWZVTDNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2clVQdlRDSTE5S3RpTUlubGNXa0VoOTBPcUxhNUhBQ3R0bjJ2U3lUQkNjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNFUktkMGp6VWVnQ3FibzlBQndvTzh4YnkyQVZ3L0Z5alM0dGFrT0QybXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBHbnBmL0UyckJrUGIwZTVFQXRWRkVyNWx1YXdHZk5TMU9iM0NNSGJMV3c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVBtSmEvNzRtYUc3WFJGbEZ5ZmVmUlFyZzJHTzhNOEo0M3pncm1PS2wxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUi8wQVFIZ0RyMVNUcngwZXpFaXVjY3VQRlFweE9kRUFLdkZjd0dVNm9nOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRYODRvYTFwc29ZS1RmZ290dXpyaTNYWWptNGI5ejk0OGtBZk1OaTBGU09yZW5xTXVxdzlwcGtBcDliY0NJUUJra1piMGt4cXd4Rzd3a2ZPNDRuRURBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDAsImFkdlNlY3JldEtleSI6IjkyY2wrR2JJbG5wK2dqaTZvZnQ2MTJWQXJ3OTNSVUNENFVtRSsrWHQyQ1U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Iml5MFMxYVhWVDBxcWRVZzd2NHlxaHciLCJwaG9uZUlkIjoiZTRkNWZkNDYtZWFiOC00NGE0LWFmOGQtNGYxOGU3NGY3MmFmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpHTFkwV2VLNXNPMW9KS1dleGR1M2xGWFB3VT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5Y2Z3T3lNdE54WFJzTCtXWEprZVU2OW02MjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRkwxMVJHTEIiLCJtZSI6eyJpZCI6Ijk0NzY4NzA0MjU3OjEwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkI3wnZCi8J2QpPCdkKLwnZCy8J2QmiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSzJyaG9rQkVOenN5YlFHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMk00RDFXTjR3Q1kvSWIvZzJ6d29sT0d2OW14dDVXTmdxOWZkeDZ0SGRIMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiKzFMZEdUc1lKZWRGMkk4dVlXQWwzS1hLcTNXM285bmhPZjBGTmlUbEdUM2lVV2lzSWtrclJyK2JJNklKVHRIdi91T2t3citETUl6dTZrSzRNbmlMRHc9PSIsImRldmljZVNpZ25hdHVyZSI6Ilo1NXN3d2dNRHJVSFU2YThERmNGRG1jRVA2b21tUVVSQk5VU3Z5UVBPd1VadU1HNDQ5NnVleDR2b1NmcFNxYm1SdlFkUi8wVm12eU5MWmVpOEZWa0R3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3Njg3MDQyNTc6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGpPQTlWamVNQW1QeUcvNE5zOEtKVGhyL1pzYmVWallLdlgzY2VyUjNSOSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDg3NDYwMSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJUGIifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "nikiya",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "94768704257", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
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
