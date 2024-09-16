const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const {king} = require("../france/king");

king({
  nomCom: "stickersearch",
  categorie: 'Search',
  reaction: "🍁"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    repondre("insert the type of stickers your want !");
    return;
  }

  const gifSearchTerm = arg.join(" ");
  const tenorApiKey = "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c"; // Remplacez par votre clé d'API Tenor

  try { for ( i = 0 ; i < 5 ; i++) {
    const gif = await axios.get(
      `https://tenor.googleapis.com/v2/search?q=${gifSearchTerm}&key=${tenorApiKey}&client_key=my_project&limit=8&media_filter=gif`
    );

    const gifUrl = gif.data.results[i].media_formats.gif.url;

    
   

    // Assurez-vous de remplacer les valeurs manquantes dans la création du sticker
    const packname = nomAuteurMessage; // Remplacez par le nom de votre pack de stickers

    const stickerMess = new Sticker(gifUrl, {
      pack: packname,
      author: 'FLASH-MD',
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 60,
      background: "transparent",
    });
    const stickerBuffer2 = await stickerMess.toBuffer();
    zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms }); }
  } catch (error) {
    console.error("Erreur lors de la recherche de stickers :", error);
    repondre("Erreur lors de la recherche de stickers.");
  }
});




king({
  nomCom: "attp",
  categorie: 'User',
  reaction: "🏏"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    repondre("insert the text to convert into a sticker!");
    return;
  }

  const at = arg.join(" ");
  

  try { for ( i = 0 ; i < 1 ; i++) {
    const gif = await axios.get(
      `https://api.maher-zubair.tech/maker/text2gif?q=`
    );

    const gifUrl = `https://api.maher-zubair.tech/maker/text2gif?q=${at}`;

    
   

    // Assurez-vous de remplacer les valeurs manquantes dans la création du sticker
    const packname = nomAuteurMessage; // Remplacez par le nom de votre pack de stickers

    const stickerMess = new Sticker(gifUrl, {
      pack: packname,
      author: 'FLASH-MD',
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 40,
      background: "transparent",
    });
    const stickerBuffer2 = await stickerMess.toBuffer();
    zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms }); }
  } catch (error) {
    console.error("An error occurred from sever:", error);
    repondre("Error while making that sticker.");
  }
});

king({
  nomCom: "mygroups",
  categorie: "User",
  reaction: "💿"
}, async (senn, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
let getGroupzs = await zk.groupFetchAllParticipating();
            let groupzs = Object.entries(getGroupzs)
                .slice(0)
                .map((entry) => entry[1]);
            let anaa = groupzs.map((v) => v.id);
            let jackhuh = `*GROUPS AM IN*\n\n`
            repondre(`You are Currently in ${anaa.length} groups, Flash MD will send that list in a moment. . .`)
            for (let i of anaa) {
                let metadat = await zk.groupMetadata(i);
               
                jackhuh += `*GROUP NAME:*- ${metadat.subject}\n`
                jackhuh += `*MEMBERS:*- ${metadat.participants.length}\n`
                jackhuh += `*GROUP ID:*- ${i}\n\n`

            }
          await repondre(jackhuh)

}
);


