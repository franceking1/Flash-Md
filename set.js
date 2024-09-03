const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID | FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0FOUjBmQXB5Qzl3alVRSFZMSm1Uam5FODlMU2FKaHBtbFRtdDQwU2VWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZFhCNzRsU1VOakRjYzJmeEpEUzlUVFVZcWxZTTFZUHV6c1dJQnZQWVVHST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTkViL3hrK3VTTEg0YVZHR1NxWEhQc0dTUnQ5TmdlMEozK1lpcC9rOUZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyaEUzZnVDR3J4YVMxQ0RkdC96TzYrbkJOMWV6ODZvWDBZeXRrVUN1OUdNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1JYllUSmlSYWZ3M0RuS3VQQXRDMmhjRXlCUFJBMFQ3a1JqQzgxOU5aVkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlN1bHlHVzY1Yk1QZzBMMTZlOER6MzNzWkdJcjcvZmM4U0lyRnVQNk9qeFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0ZlNklhbUdNa2hPOW1KTjMyZVFQMENualpKYVRGMHhuUG1rclhPalBGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3JkOW1hVjJPZGNaa09ja3o5WDloeWtLdWJRQUY0VFNvUndMZGxOOUJ4VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRXeVdiZUhXZk05S1Q0bWtZUzF1VW1zTWtXeERLYlBhTGVsOG5JbSt2b2l4eUdzRDVyNnRaa3JNM0o0c0U0YTdxYkgrYjc2c3UvMEpJbDNaZ0xGVGhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzAsImFkdlNlY3JldEtleSI6ImlVOTRWMjlTRW9sN1JPT2xveFI0VlZlS0diY0tEK1cvRkg3Z01rMGZ6UFU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1Njc0NDc3OTA4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY5MzI5NDlBQUQxN0Q4QTc4OTlBMzg0MDRBRjMxNUI3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjUzODAyMjR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY3NDQ3NzkwOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3RkJGNTBBNTFENUM0NTk4MUFBM0I0QUNEOUM3RjAxMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI1MzgwMjI1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJtYXpXWkp0MFF3bWRVYmlfZ29OZ1VRIiwicGhvbmVJZCI6IjdjZTI2ZGM0LTg1MDYtNGU1MC05NjllLTU4NWIwZWY0ZGI5YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwNEpoU3dxV2tKcmE4QnlpUXFibmk1U0FLTXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUTdnbTBKS1VLZnJ6U3pwMk9WOGNDeHp6MFJvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkxYSkg0SFBTIiwibWUiOnsiaWQiOiIyNTU2NzQ0Nzc5MDg6NTNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01qaGt1OENFT3ZzM0xZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImQ3NEowelI3Q3JJV3paeSt3RHNKcmpBSi9KUWFCNFB3THlsclhGVEk1enc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjliWm11YVpsazJqdjkwd05BN21yUURVQU1XSnM1Nk5UdVBGKzBmY0Z6V2F2TVVaWEh1b3hSaHNmYlp3dmpIeTZyYlhaZE1mNCtCZ3IwQkNHeEUwR0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJFZ3ZiYWxBNG5ldVhTaUR2c0xIRTVBOE95cWFNY0lmOStBS2RHa28zeWhJT0RQYXJWanVpVVJwUCtCdUxGYWdDMmhGTWY1QWRmSjgrRWNJM0tCMm5pQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY3NDQ3NzkwODo1M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYZStDZE0wZXdxeUZzMmN2c0E3Q2E0d0NmeVVHZ2VEOEM4cGExeFV5T2M4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1MzgwMjE2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBTWSJ9 | 'FLASH-MD-WA-BOT;;;=>',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "255674477908", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || '𝕣𝕚𝕔𝕙𝕒𝕣𝕕',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
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

