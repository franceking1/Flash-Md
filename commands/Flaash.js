"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { king } = require("../france/king");
king({ nomCom: "wagroup", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Hello 👋\n\nClick The link below to Join the OFFICIAL *FLASH-MD* WhatsApp Group\n\n';
    let d = 'https://chat.whatsapp.com/IH4xWuVTGpf7ibfzC3h6LM';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/6771f559b5e3138ee8610.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");

king({ nomCom: "channel", reaction: "🤍", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Hello 👋\n\nClick The link below to Join the OFFICIAL *FLASH-MD* WhatsApp Channel.\n\n';
    let d = 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/6771f559b5e3138ee8610.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *Zokou* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *Djalega++*'
      let varmess=z+d
      var img='https://wallpapercave.com/uwp/uwp3842939.jpeg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
