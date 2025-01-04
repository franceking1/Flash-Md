const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUN6S2tXR2tpM0dHYU1pRW1YR2xIT3pFTmNpc0lDZlU2dUNtUElhTmxWYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkFrelhNNFFqWVhOSS9BSll2SFBNT2tNdVpoSzJ1em5mTFFWYVI1NHFBdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTXJKUndQcXVmd2p6eFB2d3g2cEw5TW9tSlk2Zlc5SlV3Z3VXVVhXOUVZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4eDVCMDdidlQ4cUZwQ0FmYXFMem9RWXlnelVFQTJKSExSa2tjRXI0eEVZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZJY3ljVTVESnJaY2Z3TFlaS1ZJVUZsZStaTUxKWjBqNHoyQWdSelFMWEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IngxLzZ3TGtKOFordk5XZDcrTG1vaGkrTHdaODhsb1NsMDRMckYvbFY5UWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkpwaHZUalJERi9YZDRtbEUwN3A2cU9RejlremowQVlSWkhYbmJ3T0VsST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWE4ajQvZzFlUEc5b0VkUWhQcCtpM3I4YWhsSHFJck54anhPdzVuNG5DND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhCZlE1UkZKZEc2cjZGR0hSd29GWExna1VCNkJlem05NXhYWUVPN2tSL0V0YWovYTBjNzd5WjYvL3FsV1psamd4NzBOYUpiK1NIRGlnSVA4Qm1iN0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NywiYWR2U2VjcmV0S2V5IjoiYTBVN0RJK3RWdm9yaEdsRG5nOVBHQ054eFpiQnY4cWxBZllSc1JuNUZIST0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiSTJZZER3eTlTYXlTS1o4WmIyRFpXUSIsInBob25lSWQiOiJlZTRiMTJkMy0yOWZkLTQ0MDQtOGFkZC04NWI2OTMyYzhjMmMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmpYd2tnQmk4WlExVEQzT1d2UFJ6a0JjenE0PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxCUllTU2RNQzdoSGxXaXVkblp4TzhRdmpadz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJWNDhISlhLUiIsIm1lIjp7ImlkIjoiMjU0Nzg3NzIwODEyOjY2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNT1F1NmNCRUs2ejQ3c0dHQmdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJtbEtPNDI0LzZSTm90NjNUSmdWVlhPMGlkdHBZL0MzTER1SEE2eVRyVWtFPSIsImFjY291bnRTaWduYXR1cmUiOiJIcDRycW5ER0ptZWlkcmZ4MVlEUnVVVXJPN013M3Z2YTZsUTB2c2tQSVdzeGFPVzJudUNSdmFmOGZpd0JPM1VvaW1oMkkzU2k1OXVGVXdDMi9rYkhEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVytUY0JyRHhId003SXBJMWlXVEpwTE9xdVJyVGRETi9wajZTY1BBVy9ON2dJbnJOTDVEa1RGZURLSE9IbkJFS0hkbmJ5a3lVWU9PR3Jtc2JycEZXRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3ODc3MjA4MTI6NjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWnBTanVOdVAra1RhTGV0MHlZRlZWenRJbmJhV1B3dHl3N2h3T3NrNjFKQiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNTk3MzMwNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHZnYifQ==',
    PREFIXES: (process.env.PREFIX || '+').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Brian Gakenge",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254787720812",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '5',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
