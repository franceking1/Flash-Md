const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZCakhUYzAwVFZUU011WXprQ1dQalkwb3VacEVvU01CS1poWU82Z2VVND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEdhMk9EazVLWklXSDVQRmhpNHI4MkdlVi85MS8yQzUra2JvWEp4ZGNtTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1QUlGeVFVNngyc3crNUdHWjU5STZ6bmN3Rmtwc2lTbTEvdUtwZTFGY25zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGb3BaQ09GMHRKNTVGTHlXTGxlZmRlSlB6dXl3bTBqMzg2OVhVcVRFblZZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJJZ04ydXVvVWNPUWp5dHgvVXNYNld1Z2ZGVTBCUStSVFVXUXlWS0NkMTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNFalJXMkptVDROVElsZTNVaTdCOFN6SUZHOFJLZytVL1dhc09maDd2bU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU9Jbkg4cktSaXVoMENqVU41ODZ0dzc0WGFNQ3NEZ1RvYkIyRGo4elFYbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2F6SFpiWlNYempidk9hSy9nRnlPNUV1aUpBL0dFZ3UyR2UzQVgvNmhqbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1POW1sRGlaNTI0N0htdit3cmVoTVZ6NVNkelNQa3lBZ2J0NC9ibjhJL0ttdFZpZTVmS3d0RytyVysrQ3FkS1RFK3JwVjZjQklLUXlBUmpiQzhVN0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ2LCJhZHZTZWNyZXRLZXkiOiJEOHUyVlEwNTVqbWhWZjMzZFFoaCtQcXhaQmZLU2RDbXFvQWxFMjZRUXRvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzRC1DQkJEZlJxLXlGNVRoY3djcHJnIiwicGhvbmVJZCI6ImJmMjE2ZGNlLTkyZTctNGY1NC05MTUyLTQ5MDNmYTZkYTEyNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkSnNqOHZRMzc0ZytTcFEvbmk3MmtIZDJvdW89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjZSMHBwRkJ1TjFRSDNqVzVwZHFkc1B5RmhZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilo1TFpaVDFKIiwibWUiOnsiaWQiOiI5MjMyNTg1MzE5NzA6NjVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ011d3M3SUNFTW5rN2JVR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilc1ZUNZM1VmbU80Rko3UUlLeFYxV2lZNlE2SnpJdDZRbUNxWklHYXBkeWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IitJUmFZMEwxbG1xQTJtbmoxcGxCNE9uMzAxcWZFUnhPMjJWZU9Nc1lWeWZxM2NJRGdpMDZNNzFvSk9MRk1rcGszWHZwemozZ2QvRmdzckZJT2tMaUFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvaW5WZUprYjR5OGRpeFNidlhMSExPYitDY3JQeS9vYU1pRXhROUFRdEdpSC9hUTFaNkZ5Um1DdHYzL3oyQzh6Y3RjMk1ONzNPeWRoczdvVnpOVzdCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzI1ODUzMTk3MDo2NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWdVhnbU4xSDVqdUJTZTBDQ3NWZFZvbU9rT2ljeUxla0pncW1TQm1xWGNwIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNTYwNTM0fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "254105915061", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
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
