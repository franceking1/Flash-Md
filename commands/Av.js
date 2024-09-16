const {king}=require("../france/king")
const {getContentType}=require("@whiskeysockets/baileys")





/*
king({nomCom:"vv2",categorie:"General",reaction:"🤩"},async(dest,zk,commandeOptions)=>{

const {ms,msg,auteurMessage,msgRepondu,repondre}=commandeOptions;


if(!msgRepondu){return repondre("*Mentionne a view once media* .");}


if(msgRepondu.viewOnceMessageV2)
{
      if(msgRepondu.viewOnceMessageV2.message.imageMessage)
       {
         var image =await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.imageMessage)
        var texte = msgRepondu.viewOnceMessageV2.message.imageMessage.caption
    
     await zk.sendMessage(auteurMessage,{image:{url:image},caption:texte},{quoted:ms})
      }else if(msgRepondu.viewOnceMessageV2.message.videoMessage){

    var video = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.videoMessage)
var texte =msgRepondu.viewOnceMessageV2.message.videoMessage.caption


await zk.sendMessage(auteurMessage,{video:{url:video},caption:texte},{quoted:ms})

}
}else
{
   return repondre("this message is not on view once .")
}



}) 
*/
king({nomCom:"vv2",categorie:"General",reaction:"🤩"}, async(dest, zk, commandeOptions) => {

    const { ms, msg, auteurMessage, msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        return repondre("*Mentionne a view once media*.");
    }

    if (msgRepondu.viewOnceMessageV2) {
        if (msgRepondu.viewOnceMessageV2.message.imageMessage) {
            var image = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.imageMessage);
            var texte = msgRepondu.viewOnceMessageV2.message.imageMessage.caption;

            await zk.sendMessage(auteurMessage, { image: { url: image }, caption: texte }, { quoted: ms });
        } else if (msgRepondu.viewOnceMessageV2.message.videoMessage) {
            var video = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.videoMessage);
            var texte = msgRepondu.viewOnceMessageV2.message.videoMessage.caption;

            await zk.sendMessage(auteurMessage, { video: { url: video }, caption: texte }, { quoted: ms });
        } else if (msgRepondu.viewOnceMessageV2.message.audioMessage) {
            var audio = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.audioMessage);
            var texte = msgRepondu.viewOnceMessageV2.message.audioMessage.caption;

            await zk.sendMessage(auteurMessage, { audio: { url: audio }, caption: texte }, { quoted: ms });
        } else {
            return repondre("Unsupported media type in view once message.");
        }
    } else {
        return repondre("This message is not on view once.");
    }

}); 
