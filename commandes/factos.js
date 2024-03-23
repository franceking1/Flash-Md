const { zokou } = require('../framework/zokou');
const { axios } = require('axios');
//const conf = require('../set'); 


zokou({
        nomCom: "fact",
        desc: "Sends fact in chat.",
        categorie: "NEW",
        reaction: "🙌" ,
    },
    async(zk) => {
        const { data } = await axios.get(`https://nekos.life/api/v2/fact`)
        return zk.reply(`*Fact:* ${data.fact}\n\n*Powered by FLASH-MD*`)   
    }

)
