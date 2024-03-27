const { france } = require('../framework/france')
france({ nomCom: "flash",
    desc: "To check ping",
    Categorie: "General",
    reaction: "🚨", 
   
       
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    var inital = new Date().getTime();
        const { key } = await zk.sendMessage(zk.chat, {text: '```PINGING!!...```'});
        var final = new Date().getTime();
       // await Flash.sleep(1000)
       return await zk.sendMessage(zk.chat, {text: '_FLASH 𝙥𝙤𝙣𝙜_\n *' + (final - inital) + ' ms* ', edit: key});
    }
);
