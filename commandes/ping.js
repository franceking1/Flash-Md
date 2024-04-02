const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { default: axios } = require('axios');
//const conf = require('../set');


zokou({ nomCom: 'ping',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '🚨', 
    fromMe: 'true', 

       
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    var inital = new Date().getTime();
        const { key } = await zk.sendMessage(repondre.chat, {text: '```Ping!!!```'});
        var final = new Date().getTime();
       return await zk.sendMessage(repondre.chat, {text: '*Pong*\n *' + (final - inital) + ' ms* ', edit: key});
  }
)
