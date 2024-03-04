const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");



zokou({ nomCom: 'ping',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '🚨', 
    fromMe: 'true', 

       
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    const start = new Date().getTime()
    return repondre('```Ping!```')
    const end = new Date().getTime()
    await repondre('*Pong!*\n ```' + (end - start) + '``` *ms*')
  }
)

