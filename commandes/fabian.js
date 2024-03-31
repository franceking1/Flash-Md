const ( zokou ) = require("../framework") 

  
    zokou({ nomCom: "fabian", reaction: "👌", categorie: "NEW" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;


         var inital = new Date().getTime();
        const { key } = await zk.sendMessage(dest.chat, {text: '```Ping!!!```'});
        var final = new Date().getTime();
       // await Flash.sleep(1000)
       return await zk.sendMessage(dest.chat, {text: '*Pong*\n *' + (final - inital) + ' ms* ', edit: key});
    }
);
  
