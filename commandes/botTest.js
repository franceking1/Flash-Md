const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { default: axios } = require('axios');
//const conf = require('../set');


zokou({ nomCom: 'test',
    desc: 'To test the bot',
    Categorie: 'General',
    reaction: '🐐', 
    fromMe: 'true', 

       
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    return repondre('*FLASH-MD is Alive!!!!!!!*\n ```' + powered by + '``` *France King*```') 
  }
)
 
