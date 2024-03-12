const { zokou } = require("../framework/zokou");
var mumaker = require("mumaker");
zokou({ nomCom: "avenger", categorie: "Logo", reaction: "😎" }, async (dest, zk, commandeOptions) => {
    let { arg, repondre, prefixe, ms } = commandeOptions;
    try {
        const noArgMsg = `*_Example*:  ${prefixe}avenger FranceKing`;
        //  if(arg=='') {await zok.sendMessage(dest,{text:noArgMsg},{quoted:infoMessage}); return;}
        if (arg == '' || !arg) {
            repondre(noArgMsg);
            return;
        }
        var lienMaker = "https://en.ephoto360.com/logo-3d-style-avengers-online-427.html";
        var lienMaker2 = "https://en.ephoto360.com/create-logo-3d-style-avengers-style-text-effects-online-427.html";
      
       
        const imgInfo = await mumaker.ephoto(lienMaker2, arg.join(' '));
       
        await zk.sendMessage(dest, { text: " *\t Avenging...*" }, { quoted: ms });
       // var idImg = Object.values(imgInfo)[3];
       
        await zk.sendMessage(dest, { image: { url: imgInfo.image }, caption: " \t *Logo by FLASH-MD*" }, { quoted: ms });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
});
