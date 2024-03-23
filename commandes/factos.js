const { zokou } = require('../framework/zokou');
const { default: axios } = require('axios');
//const conf = require('../set'); 


zokou({
        pattern: "fact",
        desc: "Sends fact in chat.",
        categorie: "NEW",
        reaction: "🙌" ,
    },
    async(dest, zk, text) => {
        const { data } = await axios.get(`https://nekos.life/api/v2/fact`)
        return zk.reply(`*Fact:* ${data.fact}\n\n*Powered by FLASH-MD*`)   
    }

)
