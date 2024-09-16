const util = require('util');
const fs = require('fs-extra');
const axios = require('axios');
const { king } = require(__dirname + "/../france/king");
const { format } = require(__dirname + "/../france/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

// Define the style mapping for style number 10
const styles = {
    10: {
        "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
        "a": "ᴀ", "b": "ʙ", "c": "ᴄ", "d": "ᴅ", "e": "ᴇ", "f": "ғ", "g": "ɢ", "h": "ʜ", "i": "ɪ", "j": "ᴊ",
        "k": "ᴋ", "l": "ʟ", "m": "ᴍ", "n": "ɴ", "o": "ᴏ", "p": "ᴘ", "q": "ϙ", "r": "ʀ", "s": "s", "t": "ᴛ",
        "u": "ᴜ", "v": "v", "w": "ᴡ", "x": "x", "y": "ʏ", "z": "ᴢ", "A": "ᴀ", "B": "ʙ", "C": "ᴄ", "D": "ᴅ",
        "E": "ᴇ", "F": "ғ", "G": "ɢ", "H": "ʜ", "I": "ɪ", "J": "ᴊ", "K": "ᴋ", "L": "ʟ", "M": "ᴍ", "N": "ɴ",
        "O": "ᴏ", "P": "ᴘ", "Q": "ϙ", "R": "ʀ", "S": "s", "T": "ᴛ", "U": "ᴜ", "V": "v", "W": "ᴡ", "X": "x",
        "Y": "ʏ", "Z": "ᴢ"
    }
};

// Function to apply style mapping
const applyStyle = (text, styleNumber) => {
    const styleMap = styles[styleNumber];
    return text.split('').map(char => styleMap[char] || char).join('');
};

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

const runtime = function (seconds) { 
    seconds = Number(seconds); 
    var d = Math.floor(seconds / (3600 * 24)); 
    var h = Math.floor((seconds % (3600 * 24)) / 3600); 
    var m = Math.floor((seconds % 3600) / 60); 
    var s = Math.floor(seconds % 60); 
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
    return dDisplay + hDisplay + mDisplay + sDisplay; 
};

// Function to fetch GitHub repo data
const fetchGitHubStats = async () => {
    try {
        const repo = 'franceking1/Flash-Md'; // Replace with your repo
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        const forks = response.data.forks_count;
        const stars = response.data.stargazers_count;
        const totalUsers = (forks * 2) + (stars * 2);
        return {
            forks,
            stars,
            totalUsers
        };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

king({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../france/king");
    var coms = {};
    var mode = "public";

    if ((s.MODE).toLocaleLowerCase() != "public") {
        mode = "Private";
    }

    // Normalize category to uppercase and organize commands by category
    cm.map(async (com, index) => {
        const categoryUpper = com.categorie.toUpperCase();
        if (!coms[categoryUpper])
            coms[categoryUpper] = [];
        coms[categoryUpper].push(com.nomCom.toUpperCase());
    });

    // Set the default timezone from the configuration
    moment.tz.setDefault(s.TZ);

    // Create a date and time in the configured timezone
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Determine the greeting based on the current time
    const hour = moment().hour();
    let greeting = "Good Night";
    if (hour >= 0 && hour <= 11) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour <= 16) {
        greeting = "Good Afternoon";
    } else if (hour >= 16 && hour <= 21) {
        greeting = "Good Evening";
    } else if (hour >= 21 && hour <= 23) {
        greeting = "Good Night";
    }

    // Fetch GitHub stats
    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    let infoMsg = `
*${greeting} ${nomAuteurMessage}*\n
╭────✧𝐅𝐋𝐀𝐒𝐇-𝐌𝐃✧────◆
┃❃╭──────────────
┃❃│ *User :*  ${s.OWNER_NAME}
┃❃│ *Prefix :* ${s.PREFIXES} 
┃❃│ *Time :* ${temps}
┃❃│ *Date :* ${date} 
┃❃│ *Mode :* ${mode}
┃❃│ *Time Zone :* ${s.TZ}
┃❃│ *Total Users :* ${formattedTotalUsers}  
┃❃│ *Ram :* ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())} 
┃❃│ *Uptime :* ${runtime(process.uptime())} 
┃❃╰───────────────
╰─────✧The-GOAT✧─────◆ \n\n`;

    let menuMsg = `*◇ FLASH-MD COMMANDS ◇*\n\n${readmore}`;

    // Sort categories alphabetically and generate menu
    const sortedCategories = Object.keys(coms).sort();
    let commandNumber = 1; 

    for (const cat of sortedCategories) {
        menuMsg += `
*╭──❒⁠⁠⁠⁠ ${applyStyle(cat.toUpperCase(), 10)} ❒⁠⁠⁠⁠━━─⊷*
│╭────────────`;

        // Sort commands alphabetically within the category
        const sortedCommands = coms[cat].sort();

        for (const cmd of sortedCommands) {
            menuMsg += ` 
││ ${commandNumber++}. ${applyStyle(cmd, 10)}`;
        }
        menuMsg += `
│╰───────────
╰══════════════⊷\n`;
    }

    menuMsg += `${readmore}
◇ *THE FLASH MULTI DEVICE* ◇

   *Released: 22.2.2024*
   
 _Thanks For choosing FLASH-MD_

  Created by *France King ©²0²⁴* 
  
     *KEEP USING FLASH-MD*
`;

    try {
        await zk.sendMessage(dest, { 
            text: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: [nomAuteurMessage],
                externalAdReply: {
                    title: "THE FLASH MULTI DEVICE",
                    body: "POWERED BY FRANCE KING",
                    thumbnailUrl: "https://telegra.ph/file/4143dfac775bff078cc5a.jpg",
                    sourceUrl: 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
