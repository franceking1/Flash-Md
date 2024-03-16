const axios = require("axios");

module.exports = {
  config: {
    name: 'pi',
    version: '1.0.2',
    author: 'Shikaki & Aliester Crowley',
    countDown: 10,
    role: 0,
    category: 'Ai',
    description: {
      en: 'pi ai : Can use Internet.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },

  onStart: async function ({ api, message, event, args, commandName }) {
    let prompt = args.join(" ");

    if (!prompt) {
      message.reply("Please enter a query.");
      return;
    }

    if (prompt.toLowerCase() === "clear") {
      const clear = await axios.get(`https://pi.aliestercrowley.com/api/reset?uid=${event.senderID}`);
      message.reply(clear.data.message);
      return;
    }

    const startTime = new Date().getTime(); 

    api.setMessageReaction("⌛", event.messageID, () => { }, true);

    const url = `https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`;

    try {
      const response = await axios.get(url);
      const result = response.data.response;

      const endTime = new Date().getTime()
      const completionTime = ((endTime - startTime) / 1000).toFixed(2);

      const totalWords = result.split(/\s+/).filter(word => word !== '').length; 

      message.reply(`${result}\nCompletion time: ${completionTime} seconds\nTotal words: ${totalWords}`, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      });

      api.setMessageReaction("✅", event.messageID, () => { }, true);
    } catch (error) {
      message.reply('An error occurred.');
      api.setMessageReaction("❌", event.messageID, () => { }, true);
    }
  },

  onReply: async function ({ api, message, event, Reply, args }) {
    const prompt = args.join(" ");
    let { author, commandName } = Reply;
    if (event.senderID !== author) return;

    const startTime = new Date().getTime(); 

    if (prompt.toLowerCase() === "clear") {
      const clear = await axios.get(`https://pi.aliestercrowley.com/api/reset?uid=${event.senderID}`);
      message.reply(clear.data.message);
      return;
    }

    api.setMessageReaction("⌛", event.messageID, () => { }, true);

    const url = `https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`;
    try {
      const response = await axios.get(url);

      const content = response.data.response;

      const endTime = new Date().getTime()
      const completionTime = ((endTime - startTime) / 1000).toFixed(2);
      const totalWords = content.split(/\s+/).filter(word => word !== '').length;

      message.reply(`${content}\nCompletion time: ${completionTime}\nTotal words: ${totalWords}`, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      });

      api.setMessageReaction("✅", event.messageID, () => { }, true);
    } catch (error) {
      console.error(error.message);
      message.reply("An error occurred.");
      api.setMessageReaction("❌", event.messageID, () => { }, true);
    }
  },
};
