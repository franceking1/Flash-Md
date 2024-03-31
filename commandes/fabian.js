const ( zokou ) = require("../framework/zokou");
const axios = require("axios");


  
    zokou({ nomCom: "fact", reaction: "👌", categorie: "NEW" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;


      
       const { data } = await fetch(`https://nekos.life/api/v2/fact`)
        const response = zk.sendMessage(`*Fact:* ${data.fact}\n\n*Powered by FLASH-MD*`)   
    }

)



  
