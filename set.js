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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1BSK1JzbWI4NlVsaU5vL0c4amd5RWh4TGxNZXF4aVdBOVMzVkFIbFpsOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2wwY3E4UCtQcWJPa1V0WC9FSDB4TXRpUCtRbEthbnFKS0p5cFI5NlpuZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRFl4dmw4d0FoeWkrN1Y5NGFKQXg2WW9ib0NKN2NKeURFRXAwbmJkZEdvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyZllzYzUzajZVS0Q5QytVeHJVKzdUb0R3RmNNV3duTjZuVEdPblRxaXhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBMUzFDYTJKbHhOS0ZwaGFjR1dJT29EeTZGNmw2QUY4RWlzWUVEVllPM009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjA1M0FDQjdmZ1MyVHhaMTl5Ykg3amRIS2FHekxzcHZZRm9lS1NsTmI2SGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUQvTjZCU3JBa0dwcEIwb2JMc29pbkhOVWdYZVR6NktzSHg4elkxdFBXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQzFNeXpkeDN5dHBPcDdLUDcrc3NabllFak1yOXVXWndZMy9tLyt2STdrQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhkQ1hQanRiOW9HWDBHUU9ZdHo2TVJqejViV2ZaRGxwWmpRMlRReWJDajRmNS82MmwzSFhCcHJ0V29qUmhFc2dMcU1CRng1ZlZBL1VFRVUvUkgvbWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODQsImFkdlNlY3JldEtleSI6Iit4MVQ1cGVlZncxa0F2cFFTN0o1aUFGNnVsUVNpbVp0OTlXTFdNOHRNOVU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Inl3bEs5bU5mUU95bVNTd3VlcDBBZkEiLCJwaG9uZUlkIjoiNzg4ZWY1NDEtYTc1Mi00NmIzLWExZGEtMzdlODM5ZmQ3NmFlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpNd011N0xsN0VORmRLMXRvT21TalJRMjI4MD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnTnNVdUIrWjFPY29XV1l1NjBEb0tXM0pvUTA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSFFGUFM2RFYiLCJtZSI6eyJpZCI6IjIzMjc0NDQ4MTMwOjMzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1yIFRha2UgVGVlIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNaURvZE1ERUsvTXFMb0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJPWGovS0RzSE9iUDgyamdESWZiRGxIUXFGMFZxUEpkc1FSOGtPdXpHSVFBPSIsImFjY291bnRTaWduYXR1cmUiOiIvU0NlbStQU0gyclgvcnlYVElFTWVseWNFWUJZSzE5NWlVYmxkdVhYRTB6UytPY2VxNUdWUU43MHppVlVRNzlsTUR3YThHVkNBYXFZRDMzL0p5OHlCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiR3hHSThDdGxjd0FiL3BxSWk4SnQxZy95OXJkdHlqemxEN3FZZFpUU1Y1bWVPb3R5eGkxVFVBZE1iNkwreE1qMzBkcjZSMWE2eEtEdjNueDJDMVR3aFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzI3NDQ0ODEzMDozM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUbDQveWc3Qnptei9ObzRBeUgydzVSMEtoZEZhanlYYkVFZkpEcnN4aUVBIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyOTEyNzAxfQ==',
    PREFIXES: (process.env.PREFIX || '').split('.').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Mr Take  Tee",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "23274448130",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
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
