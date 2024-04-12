/** 

🇫‌🇱‌🇦‌🇸‌🇭‌-🇲‌🇩‌ 

  𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 (𝗖) 2024.
 𝗟𝗶𝗰𝗲𝗻𝘀𝗲𝗱 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲  𝗠𝗜𝗧 𝗟𝗶𝗰𝗲𝗻𝘀𝗲;
 𝗬𝗼𝘂 𝗺𝗮𝘆 𝗻𝗼𝘁 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗳𝗶𝗹𝗲 𝗲𝘅𝗰𝗲𝗽𝘁 𝗶𝗻 𝗰𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗟𝗶𝗰𝗲𝗻𝘀𝗲.
 𝗜𝘁 𝗶𝘀 𝘀𝘂𝗽𝗽𝗹𝗶𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝗶𝘁 𝗺𝗮𝘆 𝗯𝗲 𝘂𝘀𝗲𝗳𝘂𝗹.
 * @𝗽𝗿𝗼𝗷𝗲𝗰𝘁_𝗻𝗮𝗺𝗲 : 𝗙𝗹𝗮𝘀𝗵 𝗠𝗗, 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗮𝗻𝗱 𝗲𝗮𝘀𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀𝗲𝗿 𝗯𝗼𝘁 
 * @𝗼𝘄𝗻𝗲𝗿: 𝗙𝗿𝗮𝗻𝗰𝗲 𝗞𝗶𝗻𝗴 
 
 **/





const { france } = require("../framework/france");
const canvacord = require("canvacord");
const {uploadImageToImgur} = require("../framework/imgur")

// Generic function to create a canvacord order
function createCanvacordCommand(commandName, canvacordFunction) {
  france({
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














