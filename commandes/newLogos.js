const { zokou } = require("../framework/zokou");
var mumaker = require("mumaker");
zokou({ nomCom: "avenger", categorie: "Logo", reaction: "😋" }, async (dest, zk, commandeOptions) => {
    let { arg, repondre, prefixe, ms } = commandeOptions;
   try {
     var titre = "\t *Logo by FLASH-MD*";
      var lien = "https://en.ephoto360.com/create-logo-3d-style-avengers-online-427.html";
        if (!arg || arg == "") {
           repondre(`*exemple :* ${prefixe}avenger France King`)
            return ;
        }
     
        var maker =await mumaker.ephoto(lien,arg.join(' '));
    
        
     repondre('*Avenging...*')
       await zk.sendMessage(dest, { image: { url: maker.image}, caption: titre });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
    }
);
