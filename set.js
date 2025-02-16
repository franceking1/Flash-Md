dconst fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0lKMzBScU1OLzR0akN4b1FHQUwvOHZDMERHZzl3UTRpdXBrQnJUWUpIMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWVhc2FKcmp4Mkg5UmgwbCtvV3BWZFAwKzBxaG1CN010UTI3SkZXRGhVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNTkVRaU1yWE5HTjY0elVmWVBSYjI2Z0RnWjQzeUc5eVovbFJWVlQ4L1hFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDTlczMDVyRnJNYlV3VitTakpWQ1ZveVBTaklVb0tNODlsS010c2tORTFjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktGRzYzNTJLSkk2Z1hzTndiOEpVTm16NndtUzJRS2cvSDQ0L3dpV3dTWEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9jd0R4MkpFeFViM3oySVppU0xaUmRpQkw1LzB4OWxyT3QyK3dqWC9Kam89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU1qUzZoaWR1a2xsRGJoYXFYOU9Qb013b1RmWm51bG10ZG81di9IVEJHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidFZSTHM0bUttSzBJbFBpaVpZMk56c21PNzNTQnhYSjZjRWRNaGhzN1dRYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZxaUNGSlpaeUVLSUJOL01Pd1owMWs1emFza29VL1FMV0tQWFdGYWNDVGJpQWo1ZnN3NFRHdVdpbEQxYjUrVGtld2NpRlZzS1lYSUxua1lHd3BtNWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDcsImFkdlNlY3JldEtleSI6IlFuWTkrUFJja2hhSzdiUG1iQ0tMbmtTemFYVW1DdlJ6ajdZR1dsMVA4bXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IndmTk53ejRkVF9hbHJkTkZOMUpQTEEiLCJwaG9uZUlkIjoiNzU4ZjJmMDktODcxOS00NTMzLTllYzktMGZjOTY2NmFhM2QyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF3RGZZSEN3bG05Q25QTy9aYWs5N3Mvdi9SVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrdWxBNGRwaXhpaHM3RlFKZERVWk9PSGVEc289In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUjdaOURTMTEiLCJtZSI6eyJpZCI6Ijk0NzU5MTI0MDM4OjEzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IsmqIOG0gOG0jVxuXG5cblxuXG7wnZCAXG5cblxuXG5cblxu8J2QlVxuXG5cblxuXG5cbvCdkIhcblxuXG5cblxuXG7wnZCSXG5cblxuXG5cblxu8J2Qh1xuXG5cblxuXG5cbvCdkIpcblxuXG5cblxuXG5cbvCdkIBcblxuXG5cblxuXG5cbuG0j+G0iy4uLiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTFdEK1dzUW9Zckh2UVlZQWlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYU92eW5GRHgxL0VVaTlxcDlpZUxkZVYwTnkyZlhVaUFOcDlNazFnM2pXcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiM2tlUEhyeVhHOVM3d3ZTdTB4alp1QjlzYmRNcXBLTHpNR0ZGQTlCVVEzeGZGWDFyZ2JMa1dLMlZ5Ny9HVXRFM1V2TVRBMjdZdmpYcmx1ZkxxM0MzQVE9PSIsImRldmljZVNpZ25hdHVyZSI6IktVMEFSS3d2TUdTMjg3eUJlNWVFQkJKVnZ1OWN6VStmNjBxMU5vSDBValBIbzJuOVFZaG1ORXVwQnNRNTJpa2pZODlhTjRWTkxhQ01HR2xqVEZGd2hnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NTkxMjQwMzg6MTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV2pyOHB4UThkZnhGSXZhcWZZbmkzWGxkRGN0bjExSWdEYWZUSk5ZTjQxciJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczOTcwMzU5OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDWEQifQ==',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
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
