const axios = require('axios');
const { zokou } = require('../framework');


zokou({
        nomCom: "fact",
        desc: "Sends fact in chat.",
        category: "fun",
        filename: __filename,
    },
    async(dest, zk, commandeOptions) => {
      const { ms, arg, repondre} = commandeOptions;
        const { data } = await axios.get(`https://nekos.life/api/v2/fact`)
        return zk.reply(`*Fact:* ${data.fact}\n\n*Powered by FLASH-MD*`)   
    }

)
