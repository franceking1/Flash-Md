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
    var inital = new Date().getTime();
        const { key } = await dest.sendMessage(zk.chat, {text: '```Ping!!!```'});
        var final = new Date().getTime();
       // await FlashMd.sleep(1000)
       return await dest.sendMessage(zk.chat, {text: '*Pong!!!*\n *' + (final - inital) + ' ms* ', edit: key});
    }
);
