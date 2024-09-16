"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { king } = require("../france/king");

king({ nomCom: "fmd", reaction: "😌" }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/franceking1/Flash-Md';
  const img = 'https://telegra.ph/file/0820836f81fe0eb66850d.mp4';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count
      };

      // Calculate the total as forks * 2 + stars * 2
      const total = (repoInfo.forks * 2) + (repoInfo.stars * 2);

      // Construct the message
      const gitdata = `
*A total of ${total} people are using FLASH-MD.*

*${repoInfo.stars} People have starred it as a sign of Loving it.*

*KEEP USING FLASH-MD*

*Made With* 🤍`;

      // Send the video with the caption
      await zk.sendMessage(dest, { 
        video: { url: img }, 
        caption: gitdata 
      }, {
        contextInfo: {
          mentionedJid: [], // Ensure `auteurMessage` is defined somewhere in your code or adjust this as needed
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

      // Send the follow-up message
      await zk.sendMessage(dest, "*You can play that video and enjoy 🤍🗿*");

    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
