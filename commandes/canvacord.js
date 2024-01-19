const { zokou } = require("../framework/zokou");
const canvacord = require("canvacord");
const {uploadImageToImgur} = require("../framework/imgur")

// Generic function to create a canvacord order
function createCanvacordCommand(commandName, canvacordFunction) {
  zokou({
    nomCom: commandName,
    categorie: "Image-Edit",
    reaction: "🎉"
  }, async (origineMessage, zk, commandeOptions) => {
    const { ms, msgRepondu, auteurMsgRepondu } = commandeOptions;
  const clientId = 'b40a1820d63cd4e' ;

    try {
      let img;
      if (msgRepondu) {

     if (msgRepondu.imageMessage) {
        const image = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage)
         img = await uploadImageToImgur(image, clientId )
     } else {
        
        img = await zk.profilePictureUrl(auteurMsgRepondu, 'image'); }
      } else {
        img = "https://i.pinimg.com/564x/84/09/12/840912dd744e6662ab211b8070b5d84c.jpg";
      }

      const result = await canvacordFunction(img);

      await zk.sendMessage(origineMessage, { image: result }, { quoted: ms });
    } catch (error) {
      console.error(`Error when ordering "${commandName}":`, error);
    }
  });
}

// Créer des commandes avec différentes fonctions canvacord
createCanvacordCommand("shit", canvacord.Canvacord.shit);
createCanvacordCommand("wasted", canvacord.Canvacord.wasted);
createCanvacordCommand("wanted", canvacord.Canvacord.wanted);
createCanvacordCommand("trigger", canvacord.Canvacord.trigger);
createCanvacordCommand("trash", canvacord.Canvacord.trash);
createCanvacordCommand("rip", canvacord.Canvacord.rip);
createCanvacordCommand("sepia", canvacord.Canvacord.sepia);
createCanvacordCommand("rainbow", canvacord.Canvacord.rainbow);
createCanvacordCommand("hitler", canvacord.Canvacord.hitler);
createCanvacordCommand("invert", canvacord.Canvacord.invert);
createCanvacordCommand("jail", canvacord.Canvacord.jail);
createCanvacordCommand("affect", canvacord.Canvacord.affect);
  createCanvacordCommand("beautiful", canvacord.Canvacord.beautiful);
    createCanvacordCommand("blur", canvacord.Canvacord.blur);

   createCanvacordCommand("circle", canvacord.Canvacord.circle);
        createCanvacordCommand("facepalm", canvacord.Canvacord.facepalm);
        createCanvacordCommand("greyscale", canvacord.Canvacord.greyscale);
        createCanvacordCommand("joke", canvacord.Canvacord.jokeOverHead);














