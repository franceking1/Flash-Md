const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const { default: axios } = require('axios');
//const conf = require('../set');


zokou({nomCom:"ping",reaction:"🐐",categorie:"IA"},async(dest,zk,commandeOptions)=>{
  const {repondre,ms,arg}=commandeOptions;
    pattern: 'ping ?(.*)',
    fromMe: true,
    desc: 'To check ping',
    type: 'misc',
  },
  async (message, match) => {
    const start = new Date().getTime()
    await message.send('```Ping!```')
    const end = new Date().getTime()
    return await message.send('*Pong!*\n ```' + (end - start) + '``` *ms*')
  }
)
