const { king } = require('../france/king');
const traduire = require("../france/traduction");
const { default: axios } = require('axios');

king({ nomCom: "news", reaction: "🐐", categorie: "News" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;

    const apiUrl = 'https://samirxpikachuio.onrender.com/news';
    const response = await axios.get(apiUrl);
    const newsItems = response.data;

    if (Array.isArray(newsItems) && newsItems.length > 0) {
        // Iterate over the news items and construct a message
        let formattedResult = '*FLASH-MD NEWS:*\n\n';

        newsItems.forEach((news, index) => {
            formattedResult += `*${index + 1}. Title:* ${news.title}\n*Source:* ${news.source}\n\n`;
        });

        formattedResult += `\n> *POWERED BYFLASH-MD*`;

        await zk.sendMessage(dest, { text: formattedResult.trim() }, { quoted: ms });
    } else {
        await zk.sendMessage(dest, { text: 'No news available at the moment.' }, { quoted: ms });
    }
});
