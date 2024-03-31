const axios = require("axios");
const (zokou) = require("../framework/zokou");


  
    zokou({ nomCom: "fact", reaction: "👌", categorie: "NEW" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;


      
       const { data } = await axios.get(`https://nekos.life/api/v2/fact`)
        return response = zk.reply(`*Fact:* ${data.fact}\n\n*Powered by FLASH-MD*`)   
    }

)



  
