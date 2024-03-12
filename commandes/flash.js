"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "scanflash", reaction: "😁", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Wanna Scan *FLASH-MD*? \n\n ' + "*Click This Link.*";
    let d = ' https://flash-md-qr.onrender.com';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/f1f2303ff4e39b0a3b6b3.jpg';
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
   let z ='Salut je m\'appelle *FLASH-MD* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *France King*'
      let varmess=z+d
      var img='https://telegra.ph/file/13d63c21c1a665bfd8324.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 


zokou({ nomCom: "pairflash", reaction: "😁", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Wanna Get *FLASH-MD* session ID using Pairing code? \n\n ' + "*Click This Link.*";
    let d = ' https://replit.com/@franceking1/Flash-Md-Pairing-1?v=1';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/f1f2303ff4e39b0a3b6b3.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    
