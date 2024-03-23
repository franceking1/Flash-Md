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
        const { data } = await fetch(`https://nekos.life/api/v2/fact`)
        const response = zk.reply(`*Fact:* ${data.fact}\n\n*Powered by FLASH-MD*`)   
    }

)
