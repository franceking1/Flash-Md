const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");


zokou({ nomCom: 'ping ?(.*)',
    desc: 'To check ping',
    Categorie: 'General',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre} = commandeOptions;
    const start = new Date().getTime()
    await message.send('```Ping!```')
    const end = new Date().getTime()
    return await message.send('*Pong!*\n ```' + (end - start) + '``` *ms*')
  }
)

