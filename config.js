import dotenv from "dotenv";
dotenv.config();

const conf = {
  AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "on",
  AUTO_LIKE: process.env.AUTO_LIKE || "on",
  AUTO_READ_DM: process.env.AUTO_READ_DM || "off",
  AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || "off",
  ON: process.env.OWNER_NAME || "FLASH-MD",
  ANTICALL: process.env.ANTICALL || "off",
  timezone: process.env.TIME_ZONE || "Africa/Nairobi",
  PRESENCE_DM: process.env.DM_PRESENCE || "typing",
  PRESENCE_GROUP: process.env.GROUP_PRESENCE || "paused",
  MODE: process.env.MODE || "private",
  PREFIXES: process.env.PREFIX !== undefined 
  ? process.env.PREFIX.split(",").map(p => p.trim()) 
  : [""], 
  Session: process.env.SESSION || "",
  NUMBER: process.env.OWNER_NUMBER || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || ""
};

export default conf;
