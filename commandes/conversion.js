
/** 

🇫‌🇱‌🇦‌🇸‌🇭‌-🇲‌🇩‌ 

  𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 (𝗖) 2024.
 𝗟𝗶𝗰𝗲𝗻𝘀𝗲𝗱 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲  𝗠𝗜𝗧 𝗟𝗶𝗰𝗲𝗻𝘀𝗲;
 𝗬𝗼𝘂 𝗺𝗮𝘆 𝗻𝗼𝘁 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗳𝗶𝗹𝗲 𝗲𝘅𝗰𝗲𝗽𝘁 𝗶𝗻 𝗰𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗟𝗶𝗰𝗲𝗻𝘀𝗲.
 𝗜𝘁 𝗶𝘀 𝘀𝘂𝗽𝗽𝗹𝗶𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝗶𝘁 𝗺𝗮𝘆 𝗯𝗲 𝘂𝘀𝗲𝗳𝘂𝗹.
 * @𝗽𝗿𝗼𝗷𝗲𝗰𝘁_𝗻𝗮𝗺𝗲 : 𝗙𝗹𝗮𝘀𝗵 𝗠𝗗, 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗮𝗻𝗱 𝗲𝗮𝘀𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀𝗲𝗿 𝗯𝗼𝘁 
 * @𝗼𝘄𝗻𝗲𝗿: 𝗙𝗿𝗮𝗻𝗰𝗲 𝗞𝗶𝗻𝗴 
 
 **/








const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { france } = require("../framework/france");
const traduire = require("../framework/traduction");
const { downloadMediaMessage,downloadContentFromMessage } =  require('@whiskeysockets/baileys');
const fs =require("fs-extra") ;
const axios = require('axios');  
const FormData = require('form-data');
const { exec } = require("child_process");



async function uploadToTelegraph(Path) {
  if (!fs.existsSync(Path)) {
      throw new Error("Fichier non existant");
  }

  try {
      const form = new FormData();
      form.append("file", fs.createReadStream(Path));

      const { data } = await axios.post("https://telegra.ph/upload", form, {
          headers: {
              ...form.getHeaders(),
          },
      });

      if (data && data[0] && data[0].src) {
          return "https://telegra.ph" + data[0].src;
      } else {
          throw new Error("Erreur lors de la récupération du lien de la vidéo");
      }
  } catch (err) {
      throw new Error(String(err));
  }
}



france({nomCom:"sticker",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{

let {ms,mtype,arg,repondre,nomAuteurMessage}=commandeOptions
  var txt=JSON.stringify(ms.message)

  var mime=mtype === "imageMessage" || mtype === "videoMessage";
  var tagImage = mtype==="extendedTextMessage" && txt.includes("imageMessage")
  var tagVideo = mtype==="extendedTextMessage" && txt.includes("videoMessage")

const alea = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;};


  const stickerFileName = alea(".webp");


            // image
  if (mtype === "imageMessage" ||tagImage) {
    let downloadFilePath;
    if (ms.message.imageMessage) {
      downloadFilePath = ms.message.imageMessage;
    } else {
      // picture mentioned
      downloadFilePath =
        ms.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
    }
    // picture
    const media = await downloadContentFromMessage(downloadFilePath, "image");
    let buffer = Buffer.from([]);
    for await (const elm of media) {
      buffer = Buffer.concat([buffer, elm]);
    }

    sticker = new Sticker(buffer, {
      pack:"FLASH-MD",
      author: nomAuteurMessage,
      type:
        arg.includes("crop") || arg.includes("c")
          ? StickerTypes.CROPPED
          : StickerTypes.FULL,
      quality: 100,
    });
  } else if (mtype === "videoMessage" || tagVideo) {
    // videos
    let downloadFilePath;
    if (ms.message.videoMessage) {
      downloadFilePath = ms.message.videoMessage;
    } else {
      downloadFilePath =
        ms.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
    }
    const stream = await downloadContentFromMessage(downloadFilePath, "video");
    let buffer = Buffer.from([]);
    for await (const elm of stream) {
      buffer = Buffer.concat([buffer, elm]);
    }

    sticker = new Sticker(buffer, {
      pack:"FLASH-MD", // pack stick
      author:  nomAuteurMessage, // name of the author of the stick
      type:
        arg.includes("-r") || arg.includes("-c")
          ? StickerTypes.CROPPED
          : StickerTypes.FULL,
      quality: 40,
    });
  } else {
    repondre("Please mention an image or video!");
    return;
  }

  await sticker.toFile(stickerFileName);
  await zk.sendMessage(
    origineMessage,
    {
      sticker: fs.readFileSync(stickerFileName),
    },
    { quoted: ms }
  );

try{
  fs.unlinkSync(stickerFileName)
}catch(e){console.log(e)}





  
});

france({nomCom:"scrop",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'make sure to mention the media' ) ; return } ;
  if(!(arg[0])) {
       pack = nomAuteurMessage
  } else {
    pack = arg.join(' ')
  } ;
  if (msgRepondu.imageMessage) {
     mediamsg = msgRepondu.imageMessage
  } else if(msgRepondu.videoMessage) {
mediamsg = msgRepondu.videoMessage
  } 
  else if (msgRepondu.stickerMessage) {
    mediamsg = msgRepondu.stickerMessage ;
  } else {
    repondre('Uh media please'); return
  } ;

  var stick = await zk.downloadAndSaveMediaMessage(mediamsg)

     let stickerMess = new Sticker(stick, {
            pack: 'Flash-Md',
            
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          zk.sendMessage(origineMessage, { sticker: stickerBuffer2 }, { quoted: ms });

});

france({nomCom:"take",categorie: "Conversion", reaction: "👨🏿‍💻"},async(origineMessage,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'make sure to mention the media' ) ; return } ;
  if(!(arg[0])) {
       pack = nomAuteurMessage
  } else {
    pack = arg.join(' ')
  } ;
  if (msgRepondu.imageMessage) {
     mediamsg = msgRepondu.imageMessage
  } else if(msgRepondu.videoMessage) {
mediamsg = msgRepondu.videoMessage
  } 
  else if (msgRepondu.stickerMessage) {
    mediamsg = msgRepondu.stickerMessage ;
  } else {
    repondre('Uh a media please'); return
  } ;

  var stick = await zk.downloadAndSaveMediaMessage(mediamsg)

     let stickerMess = new Sticker(stick, {
            pack: nomAuteurMessage,
            
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
          zk.sendMessage(origineMessage, { sticker: stickerBuffer2 }, { quoted: ms });

});



france({ nomCom: "write", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!msgRepondu) {
    repondre('Please mention an image');
    return;
  }

  if (!msgRepondu.imageMessage) {
    repondre('The command only works with images');
    return;
  } ;
  text = arg.join(' ') ;
  
  if(!text || text === null) {repondre('Make sure to insert text') ; return } ;
 
  
  const mediamsg = msgRepondu.imageMessage;
  const image = await zk.downloadAndSaveMediaMessage(mediamsg);

  //Create a FormData object
  const data = new FormData();
  data.append('image', fs.createReadStream(image));

  //Configure headers
  const clientId = 'b40a1820d63cd4e'; // Replace with your Imgur client ID
  const headers = {
    'Authorization': `Client-ID ${clientId}`,
    ...data.getHeaders()
  };

  // Configure the query
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.imgur.com/3/image',
    headers: headers,
    data: data
  };

  try {
    const response = await axios(config);
    const imageUrl = response.data.data.link;
    console.log(imageUrl)

    //Use imageUrl however you want (meme creation, etc.)
    const meme = `https://api.memegen.link/images/custom/-/${text}.png?background=${imageUrl}`;

    // Create the sticker
    const stickerMess = new Sticker(meme, {
      pack: nomAuteurMessage,
      author: 'FLASH-MD',
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 70,
      background: "transparent",
    });

    const stickerBuffer2 = await stickerMess.toBuffer();
    zk.sendMessage(
      origineMessage,
      { sticker: stickerBuffer2 },
      { quoted: ms }
    );

  } catch (error) {
    console.error('Error uploading to Imgur :', error);
    repondre('An error occurred while creating the meme.');
  }
});



france({nomCom:"photo",categorie: "Conversion", reaction: "👨🏿‍💻"},async(dest,zk,commandeOptions)=>{
   const {ms , msgRepondu,arg,repondre,nomAuteurMessage} = commandeOptions ;

  if(!msgRepondu) { repondre( 'make sure to mention the media' ) ; return } ;
 
   if (!msgRepondu.stickerMessage) {
      repondre('Um mention a non-animated sticker'); return
  } ;

 let mediaMess = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);

  const alea = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;};
  
  let ran = await alea(".png");

  
        exec(`ffmpeg -i ${mediaMess} ${ran}`, (err) => {
          fs.unlinkSync(mediaMess);
          if (err) {
            zk.sendMessage(
              dest,
              {
                text: 'A non-animated sticker please',
              },
              { quoted: ms }
            );
            return;
          }
          let buffer = fs.readFileSync(ran);
          zk.sendMessage(
            dest,
            { image: buffer },
            { quoted: ms }
          );
          fs.unlinkSync(ran);
        });
});

france({ nomCom: "trt", categorie: "Conversion", reaction: "👨🏿‍💻" }, async (dest, zk, commandeOptions) => {

  const { msgRepondu, repondre , arg } = commandeOptions;

  
   if(msgRepondu) {
     try {
      
     

       if(!arg || !arg[0]) { repondre('(eg : trt en)') ; return }
   

         let texttraduit = await traduire(msgRepondu.conversation , {to : arg[0]}) ;

         repondre(texttraduit)

        } catch (error) {
          
          repondre('Mention a texte Message') ;
      
        }

   } else {
     
     repondre('Mention a texte Message')
   }



}) ;


france({ nomCom: "url", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
  const { msgRepondu, repondre } = commandeOptions;

  if (!msgRepondu) {
      repondre('mention a image or video');
      return;
  }

  let mediaPath;

  if (msgRepondu.videoMessage) {
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
  } else if (msgRepondu.imageMessage) {
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
  } else {
      repondre('mention a image or video');
      return;
  }

  try {
      const telegraphUrl = await uploadToTelegraph(mediaPath);
      fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

      repondre(telegraphUrl);
  } catch (error) {
      console.error('Erreur lors de la création du lien Telegraph :', error);
      repondre('Opps error');
  }
});
