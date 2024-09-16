const {king}=require("../france/king") ;



/*king({nomCom:"vv",categorie:"General",reaction:"🤲🏿"},async(dest,zk,commandeOptions)=>{

const {ms,msgRepondu,repondre}=commandeOptions;


if(!msgRepondu){return repondre("*Mention a view once media* .");}


if(msgRepondu.viewOnceMessageV2)
{
      if(msgRepondu.viewOnceMessageV2.message.imageMessage)
       {
         var image =await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.imageMessage)
        var texte = msgRepondu.viewOnceMessageV2.message.imageMessage.caption
    
     await zk.sendMessage(dest,{image:{url:image},caption:texte},{quoted:ms})
      }else if(msgRepondu.viewOnceMessageV2.message.videoMessage){

    var video = await zk.downloadAndSaveMediaMessage(msgRepondu.viewOnceMessageV2.message.videoMessage)
var texte =msgRepondu.viewOnceMessageV2.message.videoMessage.caption


await zk.sendMessage(dest,{video:{url:video},caption:texte},{quoted:ms})

}
}else
{
   return repondre("this message is not on view once .")
}



})
*/




king({
  'nomCom': "vv",
  'categorie': 'General',
  'reaction': "✊"
}, async (_0x24c03e, _0x4fc229, _0x9c1bfc) => {
  const {
    ms: _0x76d427,
    msgRepondu: _0x3fb391,
    repondre: _0x4d25dd
  } = _0x9c1bfc;
  if (!_0x3fb391) {
    return _0x4d25dd("*Mention a view once media, such as a video, image or a voice note* .");
  }
  console.log(_0x3fb391);
  if (_0x3fb391.viewOnceMessageV2 || _0x3fb391.viewOnceMessageV2Extension) {
    let _0x326255 = _0x3fb391.viewOnceMessageV2Extension ?? _0x3fb391.viewOnceMessageV2;
    if (_0x326255.message.imageMessage) {
      var _0x43a7a7 = await _0x4fc229.downloadAndSaveMediaMessage(_0x3fb391.viewOnceMessageV2.message.imageMessage);
      var _0x493ef4 = _0x3fb391.viewOnceMessageV2.message.imageMessage.caption;
      await _0x4fc229.sendMessage(_0x24c03e, {
        'image': {
          'url': _0x43a7a7
        },
        'caption': _0x493ef4
      }, {
        'quoted': _0x76d427
      });
    } else {
      if (_0x326255.message.videoMessage) {
        var _0x16bbf9 = await _0x4fc229.downloadAndSaveMediaMessage(_0x3fb391.viewOnceMessageV2.message.videoMessage);
        var _0x493ef4 = _0x3fb391.viewOnceMessageV2.message.videoMessage.caption;
        await _0x4fc229.sendMessage(_0x24c03e, {
          'video': {
            'url': _0x16bbf9
          },
          'caption': _0x493ef4
        }, {
          'quoted': _0x76d427
        });
      } else {
        if (_0x326255.message.audioMessage) {
          var _0x49dbaf = await _0x4fc229.downloadAndSaveMediaMessage(_0x326255.message.audioMessage);
          await _0x4fc229.sendMessage(_0x24c03e, {
            'audio': {
              'url': _0x49dbaf
            },
            'mymetype': 'audio/mp4'
          }, {
            'quoted': _0x76d427,
            'ptt': false
          });
        }
      }
    }
  } else {
    return _0x4d25dd("That is not a view once media.");
  }
}); 
