const { zokou } = require("../framework/zokou");
var mumaker = require("mumaker");
zokou({ nomCom: "avenger",
    categorie: "Logo", reaction: "⚓" }, async (origineMessage, zk, commandeOptions) => {
    const { prefixe, arg, ms, repondre } = commandeOptions;
    if (!arg || arg == "") {
        repondre("*__Exemple : * " + prefixe + "hacker France");
        return;
    }
    try {
        let radio = "984dd03e-220d-4335-a6ba-7ac56b092240";
        let anu = await mumaker.ephoto("https://en.ephoto360.com/create-logo-3d-style-avengers-online-427.html", arg); //
        //
       // let res = Object.values(anu)[3];
        // console.log("&€"+res);
      //  let lien = "https://e1.yotools.net" + res;
        repondre("*Avenging*");
        await zk.sendMessage(origineMessage, { image: { url:anu.image}, caption: "\t *Logo by FLASH-MD*" }, { quoted: ms });
    }
    catch (e) {
        repondre("🐐 📌" + e);
    }
