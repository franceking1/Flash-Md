//"use strict";
//const fetch = require('node-fetch');
const { king } = require('../france/king');

// Register the command with its aliases
king({
    nomCom: "repo",
    aliases: ["sc", "script"], // Adding aliases
    reaction: "🤍",
    nomFichier: __filename
}, async (dest, zk, commandeOptions) => {
    const githubRepo = 'https://api.github.com/repos/franceking1/Flash-Md';
    const img = 'https://telegra.ph/file/73d05b8d0ae57de7b564a.jpg';
    const { repondre, auteurMessage } = commandeOptions;

    try {
        const response = await fetch(githubRepo);
        const data = await response.json();

        if (data) {
            const repoInfo = {
                stars: data.stargazers_count,
                forks: data.forks_count,
                update: data.updated_at,
                owner: data.owner.login,
            };

            const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
            //const updateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

            const gitdata = `*HEY 👋 THIS IS FLASH-MD.*\n\nI'm A WhatsApp bot created by *©France King*.\n
[✨] *STARS:* - ${repoInfo.stars}
[🧧] *FORKS:* - ${repoInfo.forks}
[📅] *RELEASE DATE:* - ${releaseDate}
[🗼] *REPO:* - ${data.html_url}
[👨‍💻] *OWNER:* - *France King* 
__________________________________
             *Made With* 🤍`;

            await zk.sendMessage(dest, { 
                text: gitdata,
                contextInfo: {
                    mentionedJid: [auteurMessage],
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
        } else {
            console.log("Could not fetch data");
            repondre("An error occurred while fetching the repository data.");
        }
    } catch (error) {
        console.error("Error fetching repository data:", error);
        repondre("An error occurred while fetching the repository data.");
    }
});
