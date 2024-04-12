/** 

🇫‌🇱‌🇦‌🇸‌🇭‌-🇲‌🇩‌ 

  𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 (𝗖) 2024.
 𝗟𝗶𝗰𝗲𝗻𝘀𝗲𝗱 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲  𝗠𝗜𝗧 𝗟𝗶𝗰𝗲𝗻𝘀𝗲;
 𝗬𝗼𝘂 𝗺𝗮𝘆 𝗻𝗼𝘁 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗳𝗶𝗹𝗲 𝗲𝘅𝗰𝗲𝗽𝘁 𝗶𝗻 𝗰𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗟𝗶𝗰𝗲𝗻𝘀𝗲.
 𝗜𝘁 𝗶𝘀 𝘀𝘂𝗽𝗽𝗹𝗶𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝗶𝘁 𝗺𝗮𝘆 𝗯𝗲 𝘂𝘀𝗲𝗳𝘂𝗹.
 * @𝗽𝗿𝗼𝗷𝗲𝗰𝘁_𝗻𝗮𝗺𝗲 : 𝗙𝗹𝗮𝘀𝗵 𝗠𝗗, 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗮𝗻𝗱 𝗲𝗮𝘀𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀𝗲𝗿 𝗯𝗼𝘁 
 * @𝗼𝘄𝗻𝗲𝗿: 𝗙𝗿𝗮𝗻𝗰𝗲 𝗞𝗶𝗻𝗴 
 
 **/








const axios = require('axios');
const { france } = require("../framework/france");
const fs = require("fs-extra");
const { exec } = require("child_process");
const child_process = require('child_process');
const {unlink } = require ('fs').promises ;


// fonction sleep

const sleep =  (ms) =>{
    return new Promise((resolve) =>{ setTimeout (resolve, ms)})
    
    } 

// Fonction pour la conversion de GIF en vidéo et récupération du buffer vidéo
const GIFBufferToVideoBuffer = async (image) => {
    const filename = `${Math.random().toString(36)}`;
    await fs.writeFileSync(`./${filename}.gif`, image);
    child_process.exec(
        `ffmpeg -i ./${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./${filename}.mp4`
    );
    await sleep(4000);
  
    var buffer5 = await fs.readFileSync(`./${filename}.mp4`);
    Promise.all([unlink(`./${filename}.mp4`), unlink(`./${filename}.gif`)]);
    return buffer5;
};

const generateReactionCommand = (reactionName, reactionEmoji) => {
    france({
        nomCom: reactionName,
        categorie: "Reaction",
        reaction: reactionEmoji,
    },
    async (origineMessage, zk, commandeOptions) => {
        const { auteurMessage, auteurMsgRepondu, repondre, ms, msgRepondu } = commandeOptions;

        const url = `https://api.waifu.pics/sfw/${reactionName}`;
        try {
            const response = await axios.get(url);
            const imageUrl = response.data.url;

            // Obtenir le buffer du GIF en utilisant la fonction getBuffer
             const gifBufferResponse = await  axios.get(imageUrl, {
                responseType: 'arraybuffer' }) ;
            const gifBuffer = await gifBufferResponse.data;

            // Convertir le GIF en vidéo et obtenir le buffer vidéo
            const videoBuffer = await GIFBufferToVideoBuffer(gifBuffer);

            // Envoyer la vidéo avec france
            if (msgRepondu) { 
              var txt =` @${auteurMessage.split("@")[0]}  ${reactionName} @${auteurMsgRepondu.split("@")[0]}`
       zk.sendMessage(origineMessage, { video: videoBuffer,gifPlayback: true,caption:txt,mentions:[auteurMessage,auteurMsgRepondu] }, { quoted: ms });
    
            } else {
                const videoMessage = {
                    video: videoBuffer,
                    gifPlayback: true,
                    caption: `@${auteurMessage.split("@")[0]} ${reactionName} everyone`,
                    mentions: [auteurMessage]
                };
                zk.sendMessage(origineMessage, videoMessage, { quoted: ms });
            }

        } catch (error) {
            repondre('Erreur lors de la récupération des données :' + error);
            console.log(error);
        }
    });
};

// ... (utilisation de la fonction generateReactionCommand pour créer des commandes de réaction)


generateReactionCommand("bully", "👊");
generateReactionCommand("cuddle", "🤗");
generateReactionCommand("cry", "😢");
generateReactionCommand("hug", "😊");
generateReactionCommand("awoo", "🐺");
generateReactionCommand("kiss", "😘");
generateReactionCommand("lick", "👅");
generateReactionCommand("pat", "👋");
generateReactionCommand("smug", "😏");
generateReactionCommand("bonk", "🔨");
generateReactionCommand("yeet", "🚀");
generateReactionCommand("blush", "😊");
generateReactionCommand("smile", "😄");
generateReactionCommand("wave", "👋");
generateReactionCommand("highfive");
generateReactionCommand("handhold");
generateReactionCommand("nom","👅" );
generateReactionCommand("bite", "🦷");
generateReactionCommand("glomp", "🤗");
generateReactionCommand("slap", "👋");
generateReactionCommand("kill", "💀");
generateReactionCommand("kick", "🦵");
generateReactionCommand("happy", "😄");
generateReactionCommand("wink", "😉");
generateReactionCommand("poke", "👉");
generateReactionCommand("dance", "💃");
generateReactionCommand("cringe", "😬");
