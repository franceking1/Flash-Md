const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const { default: axios } = require('axios'); 


  zokou({ nomCom: "quotes", reaction: "🌟", categorie: "NEW" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
  
      const response = await axios.get(`https://some-random-api.com/animu/quote}`);
      
      
