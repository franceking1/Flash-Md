const { king } = require('../france/king');
const axios = require("axios")
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("../data/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("../data/banGroup");

const { generateProfilePicture } = require("../france/dl/Function");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("../data/onlyAdmin");
const {removeSudoNumber,addSudoNumber,issudo} = require("../data/sudo");
//const conf = require("../set");
const fs = require('fs-extra');
const sleep =  (ms) =>{
  return new Promise((resolve) =>{ setTimeout (resolve, ms)})
  
  } ;


		
		
		
  	
			
		

	





    
king({ nomCom:' lastseen', categorie: 'WhatsApp' }, async (dest, zk, commandeOptions) => {

const { idBot, arg, ms, repondre, superUser, msgRepondu } = commandeOptions;

if (!superUser) {
      repondre('Only Owners can use this command'); return;
    }
if (!arg[0]) {
      repondre("Provide a setting to be updated. Example:\nlastseen all");
      return;
    }
  
    let priv = arg.join(' ');

const availablepriv = ['all', 'contacts', 'contact_blacklist', 'none'];

        if (!availablepriv.includes(priv)) return repondre(`Choose a setting from this list: ${availablepriv.join('/')}`);

await zk.updateLastSeenPrivacy(priv)
        await repondre(`Last seen privacy settings updated to *${priv}*`);

})



king({ nomCom: 'online', categorie: "WhatsApp" }, async (dest, zk, commandeOptions) => {

const { idBot, arg, ms, repondre, superUser, msgRepondu } = commandeOptions;

if (!superUser) {
      repondre('Only Owners can use this command'); return;
    }
if (!arg[0]) {
      repondre('Provide a setting to be updated. Example:\nonline all');
      return;
    }
  
    let priva = arg.join(' ');

const availablepriva = ['all', 'match_last_seen'];

        if (!availablepriva.includes(priva)) return repondre(`Choose a setting from this list: ${availablepriva.join('/')}`);

await zk.updateOnlinePrivacy(priva)
        await repondre(`Online privacy settings updated to *${priva}*`);

})

king({ nomCom: 'mydp', categorie: 'WhatsApp' }, async (dest, zk, commandeOptions) => {

const { idBot, arg, ms, repondre, superUser, msgRepondu } = commandeOptions;

if (!superUser) {
      repondre('Only Owners can use this command'); return;
    }
if (!arg[0]) {
      repondre('Provide a setting to be updated. Example:\nmydp all');
      return;
    }
  
    let privac = arg.join(' ');

const availableprivac = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!availableprivac.includes(privac)) return repondre(`Choose a setting from this list: ${availableprivac.join('/')}`);

await zk.updateProfilePicturePrivacy(privac)
        await repondre(`Your profile picture privacy settings updated to *${privac}*`);

})



king({ nomCom: 'mystatus', categorie: 'WhatsApp' }, async (dest, zk, commandeOptions) => {

const { idBot, arg, ms, repondre, superUser, msgRepondu } = commandeOptions;

if (!superUser) {
      repondre('Only Owners can use this command'); return;
    }
if (!arg[0]) {
      repondre("Provide a setting to be updated. Example:\nmystatus all");
      return;
    }
  
    let privacy = arg.join(' ');

const availableprivacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!availableprivacy.includes(privacy)) return repondre(`Choose a setting from this list: ${availableprivacy.join('/')}`);

await zk.updateStatusPrivacy(privacy)
        await repondre(`Your status privacy settings updated to *${privacy}*`);

})


king({ nomCom: 'groupadd', categorie: 'WhatsApp' }, async (dest, zk, commandeOptions) => {

const { idBot, arg, ms, repondre, superUser, msgRepondu } = commandeOptions;

if (!superUser) {
      repondre('Only Owners can use this command'); return;
    }
if (!arg[0]) {
      repondre('Provide a setting to be updated. Example:\ngroupadd all');
      return;
    }
  
    let privacq = arg.join(' ');

const availableprivacq = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!availableprivacq.includes(privacq)) return repondre(`Choose a setting from this list: ${availableprivacq.join('/')}`);

await zk.updateGroupsAddPrivacy(privacq)
        await repondre(`Your group add privacy settings updated to *${privacq}*`);

})







king({ nomCom: 'privacy' , categorie: 'WhatsApp' }, async (dest, zk, commandeOptions) => {

const { idBot, ms, repondre, superUser, msgRepondu } = commandeOptions;

if (!superUser) {
      repondre('Only Owners can use this command'); return;
    }

const {
                readreceipts,
                profile,
                status,
                online,
                last,
                groupadd,
                calladd
        } = await zk.fetchPrivacySettings(true);

const msgg = `*Privacy settings*

*Name :* ${zk.user.name}
*Online :* ${online}
*Profile :* ${profile}
*Last Seen :* ${last}
*Read Receipt :* ${readreceipts}
*Group Add :* ${groupadd}
*Call Add :* ${calladd}`;


const avatar = await zk.profilePictureUrl(idBot, 'image').catch(_ => 'https://telegra.ph/file/b34645ca1e3a34f1b3978.jpg');

await zk.sendMessage(dest, { image: { url: avatar}, caption: msgg}, { quoted: ms}) 

// await repondre(msgg);

});


king({ nomCom: 'fullpp', categorie: 'User' }, async (dest, zk, commandeOptions) => {

const { idBot, ms, repondre, superUser, msgRepondu } = commandeOptions;

if (!msgRepondu) return repondre('Tag an image you want to set as your Profile picture');

if (!superUser) {
      repondre('Only Owners can use this command'); return;
    }
        const medis = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage, 'ppbot.jpeg');

/* let medis = await zk.downloadAndSaveMediaMessage(msgRepondu, 'ppbot.jpeg'); */

var {
                        img
                    } = await generateProfilePicture(medis)
                    await zk.query({
                        tag: 'iq',
                        attrs: {
                            to: idBot,
                            type: 'set',
                            xmlns: 'w:profile:picture'
                        },
                        content: [{
                            tag: 'picture',
                            attrs: {
                                type: 'image'
                            },
                            content: img
                        }]
                    })
fs.unlinkSync(medis)
                   
                    repondre('Your Profile Picture has been Updated Successfully')
                })

  

  king({ nomCom: 'tgs', categorie: 'Mods' }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;
  
    if (!superUser) {
      repondre('Only Mods can use this command'); return;
    }
    //const apikey = conf.APILOLHUMAIN
  
   // if (apikey === null || apikey === 'null') { repondre('Veillez vérifier votre apikey ou si vous en avez pas , veiller crée un compte sur api.lolhuman.xyz et vous en procurer une.'); return; };
  
    if (!arg[0]) {
      repondre("put a telegram sticker link ");
      return;
    }
  
    let lien = arg.join(' ');
  
    let name = lien.split('/addstickers/')[1] ;
  
    let api = 'https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=' + encodeURIComponent(name) ;
  
    try {
  
      let stickers = await axios.get(api) ;
  
      let type = null ;
  
      if (stickers.data.result.is_animated === true ||stickers.data.result.is_video === true  ) {
  
          type = 'animated sticker'
      } else {
        type = 'not animated sticker'
      }
  
      let msg = `   Flash-stickers-dl
      
  *Name :* ${stickers.data.result.name}
  *Type :* ${type} 
  *Length :* ${(stickers.data.result.stickers).length}
  
      Downloading...`
  
      await  repondre(msg) ;
  
       for ( let i = 0 ; i < (stickers.data.result.stickers).length ; i++ ) {
  
          let file = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${stickers.data.result.stickers[i].file_id}`) ;
  
          let buffer = await axios({
            method: 'get',  // Utilisez 'get' pour télécharger le fichier
            url:`https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file.data.result.file_path}` ,
            responseType: 'arraybuffer',  // Définissez le type de réponse sur 'stream' pour gérer un flux de données
          })
  
  
          const sticker = new Sticker(buffer.data, {
            pack: nomAuteurMessage,
            author: "FLASH-MD",
            type: StickerTypes.FULL,
            categories: ['🤩', '🎉'],
            id: '12345',
            quality: 50,
            background: '#000000'
          });
    
          const stickerBuffer = await sticker.toBuffer(); // Convertit l'autocollant en tampon (Buffer)
    
          await zk.sendMessage(
            dest,
            {
              sticker: stickerBuffer, // Utilisez le tampon (Buffer) directement dans l'objet de message
            },
            { quoted: ms }
          ); 
       }
  
    } catch (e) {
      repondre("we got an error \n", e);
    }
  });

king({ nomCom: "crew", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage, superUser, auteurMsgRepondu, msgRepondu } = commandeOptions;

  if (!superUser) { repondre("only modds can use this command"); return };

  if (!arg[0]) { repondre('Please enter the name of the group to create'); return };
  if (!msgRepondu) { repondre('Please mention a member added '); return; }

  const name = arg.join(" ")

  const group = await zk.groupCreate(name, [auteurMessage, auteurMsgRepondu])
  console.log("created group with id: " + group.gid)
  zk.sendMessage(group.id, { text: `Welcome to ${name}` })

});

 king({ nomCom: "left", categorie: "Group" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;
 if (!verifGroupe) { repondre("group only"); return };
 if (!superUser) {
    repondre("order reserved for the owner");
    return;
  }

  await zk.groupLeave(dest)
}); 

king({ nomCom: "join", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!superUser) {
    repondre("This command is for the bot owner");
    return;
  }
  let result = arg[0].split('https://chat.whatsapp.com/')[1] ;
 await zk.groupAcceptInvite(result) ;
  
      repondre(`Succes`).catch((e)=>{
  repondre('Unknown error')
})

})


king({ nomCom: "jid", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }
              if(!msgRepondu) {
                jid = dest
              } else {
                jid = auteurMsgRepondu
              } ;
   zk.sendMessage(dest,{text : jid },{quoted:ms});

        }) ;

  /*

king({ nomCom: "block", categorie: "User" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }
             
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('Be sure to mention the person to block'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "block")
    .then( repondre('succes'))   } ;

  });
*/
king({ nomCom: "unblock", categorie: "User" }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage,auteurMsgRepondu } = commandeOptions;

         if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }
              if(!msgRepondu) { 
                if(verifGroupe) {
                  repondre('Please mention the person to be unlocked'); return
                } ;
                jid = dest

                 await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes')) 
              } else {
                jid = auteurMsgRepondu
             await zk.updateBlockStatus(jid, "unblock")
    .then( repondre('succes'))   } ;
  
    });

king({ nomCom: "kickall", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { auteurMessage ,ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser,prefixe } = commandeOptions

  const metadata = await zk.groupMetadata(dest) ;
 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿this command is reserved for groups ❌"); return; }
  if (superUser || auteurMessage == metadata.owner) { 
  
   repondre('No_admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.') ;
   await sleep(5000)
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";
try {
  let users = membresGroupe.filter((member) => !member.admin)

  for (const membre of users) {

    

   
    
await zk.groupParticipantsUpdate(
        dest, 
        [membre.id],
        "remove" 
    ) 
    await sleep(500)
    
  }  
} catch (e) {repondre("I need administration rights")} } else {
  repondre("Order reserved for the group owner for security reasons"); return
}
});

king({
    nomCom: 'ban',
    categorie: 'User',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;

    
  if (!superUser) {repondre('This command is only allowed to the bot owner') ; return}
    if (!arg[0]) {
        // Function 'reply' must be defined to send a response.
        repondre(`mention the victim by typing ${prefixe}ban add/del to ban/unban the victim`);
        return;
    };

    if (msgRepondu) {
        switch (arg.join(' ')) {
            case 'add':

           
   let youareban = await isUserBanned(auteurMsgRepondu)
           if(youareban) {repondre('This user is already banned') ; return}
               
           addUserToBanList(auteurMsgRepondu)
                break;
                case 'del':
                  let estbanni = await isUserBanned(auteurMsgRepondu)
    if (estbanni) {
        
        removeUserFromBanList(auteurMsgRepondu);
        repondre('This user is now free.');
    } else {
      repondre('This user is not banned.');
    }
    break;


            default:
                repondre('bad option');
                break;
        }
    } else {
        repondre('mention the victim')
        return;
    }
});



king({
    nomCom: 'bangroup',
    categorie: 'User',
}, async (dest, zk, commandeOptions) => {

    const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser,verifGroupe } = commandeOptions;

    
  if (!superUser) {repondre('This command is only allowed to the bot owner') ; return};
  if(!verifGroupe) {repondre('order reservation for groups' ) ; return };
    if (!arg[0]) {
        // Function 'reply' must be defined to send a response.
        repondre(`type ${prefix}bangroup add/del to ban/unban the group`);
        return;
    };
    const groupalreadyBan = await isGroupBanned(dest)

        switch (arg.join(' ')) {
            case 'add':

           

            if(groupalreadyBan) {repondre('This group is already banned') ; return}
               
            addGroupToBanList(dest)

                break;
                case 'del':
                      
    if (groupalreadyBan) {
      removeGroupFromBanList(dest)
      repondre('This group is now free.');
        
    } else {
       
      repondre('This group is not banned.');
    }
    break;


            default:
                repondre('bad option');
                break;
        }
    
});


king({
  nomCom: 'onlyadmin',
  categorie: 'Group',
}, async (dest, zk, commandeOptions) => {

  const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser,verifGroupe , verifAdmin } = commandeOptions;

  
if (superUser || verifAdmin) { 
if(!verifGroupe) {repondre('order reservation for groups' ) ; return };
  if (!arg[0]) {
      // Function 'reply' must be defined to send a response.
      repondre(`type ${prefix}onlyadmin add/del to ban/unban the group`);
      return;
  };
  const groupalreadyBan = await isGroupOnlyAdmin(dest)

      switch (arg.join(' ')) {
          case 'add':

         

          if(groupalreadyBan) {repondre('This group is already in onlyadmin mode') ; return}
             
          addGroupToOnlyAdminList(dest)

              break;
              case 'del':
                    
  if (groupalreadyBan) {
    removeGroupFromOnlyAdminList(dest)
    repondre('This group is now free.');
      
  } else {
     
    repondre('This group is not in onlyadmin mode.');
  }
  break;


          default:
              repondre('bad option');
              break;
      }
} else { repondre('You are not entitled to this order')}
});

king({
  nomCom: 'sudo',
  categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {

  const { ms, arg, auteurMsgRepondu, msgRepondu , repondre,prefixe,superUser } = commandeOptions;

  
if (!superUser) {repondre('This command is only allowed to the bot owner') ; return}
  if (!arg[0]) {
      // Function 'reply' must be defined to send a response.
      repondre(`mention the person by typing ${prefixe}sudo add/del`);
      return;
  };

  if (msgRepondu) {
      switch (arg.join(' ')) {
          case 'add':

         
 let youaresudo = await issudo(auteurMsgRepondu)
         if(youaresudo) {repondre('This user is already sudo') ; return}
             
         addSudoNumber(auteurMsgRepondu)
         repondre('succes')
              break;
              case 'del':
                let estsudo = await issudo(auteurMsgRepondu)
  if (estsudo) {
      
      removeSudoNumber(auteurMsgRepondu);
      repondre('This user is now non-sudo.');
  } else {
    repondre('This user is not sudo.');
  }
  break;


          default:
              repondre('bad option');
              break;
      }
  } else {
      repondre('mention the victim')
      return;
  }
});


king({ nomCom: "save", categorie: "User" }, async (dest, zk, commandeOptions) => {

  const { repondre , msgRepondu , nomAuteurMessage , auteurMessage } = commandeOptions;
  
    if(nomAuteurMessage) { 
  
      if(msgRepondu) {

        console.log(msgRepondu) ;

        let msg ;
  
        if (msgRepondu.imageMessage) {
  
          
  
       let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
       // console.log(msgRepondu) ;
       msg = {
  
         image : { url : media } ,
         caption : msgRepondu.imageMessage.caption,
         
       }
      
  
        } else if (msgRepondu.videoMessage) {
  
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;
  
          msg = {
  
            video : { url : media } ,
            caption : msgRepondu.videoMessage.caption,
            
          }
  
        } else if (msgRepondu.audioMessage) {
      
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
         
          msg = {
     
            audio : { url : media } ,
            mimetype:'audio/mp4',
             }     
          
        } else if (msgRepondu.stickerMessage) {
  
      
          let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)
  
          let stickerMess = new Sticker(media, {
            pack: 'FLASH-MD',
            type: StickerTypes.CROPPED,
            categories: ["🤩", "🎉"],
            id: "12345",
            quality: 70,
            background: "transparent",
          });
          const stickerBuffer2 = await stickerMess.toBuffer();
         
          msg = { sticker: stickerBuffer2}
  
  
        }  else {
            msg = {
               text : msgRepondu.conversation,
            }
        }
  
      zk.sendMessage(auteurMessage,msg)
  
      } else { repondre('Mention the message that you want to save') }
  
  } else {
    repondre('only mods can use this command')
  }
  

  })
;


king({
  nomCom : 'mention',
  categorie : 'Mods',
} , async (dest,zk,commandeOptions) => {

 const {ms , repondre ,superUser , arg} = commandeOptions ;

 if (!superUser) {repondre('you do not have the rights for this command') ; return}

 const mbdd = require('../data/mention') ;

 let alldata = await  mbdd.recupererToutesLesValeurs() ;
  data = alldata[0] ;
    

 if(!arg || arg.length < 1) { 

  let etat ;

  if (alldata.length === 0 ) { repondre(`To activate or modify the mention; follow this syntax: mention link type message
  The different types are audio, video, image, and sticker.
  Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is France King`) ; return}

      if(data.status == 'non') {
          etat = 'Desactived'
      } else {
        etat = 'Actived' ;
      }
      
      mtype = data.type || 'no data' ;

      url = data.url || 'no data' ;


      let msg = `Status: ${etat}
Type: ${mtype}
Link: ${url}

*Instructions:*

To activate or modify the mention, follow this syntax: mention link type message
The different types are audio, video, image, and sticker.
Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is France King 

To stop the mention, use mention stop`;

    repondre(msg) ;

    return ;
          }

 if(arg.length >= 2) {
   
      if(arg[0].startsWith('http') && (arg[1] == 'image' || arg[1] == 'audio' || arg[1] == 'video' || arg[1] == 'sticker')) {

            let args = [] ;
              for (i = 2 ; i < arg.length ; i++) {
                  args.push(arg[i]) ;
              }
          let message = args.join(' ') || '' ;

              await mbdd.addOrUpdateDataInMention(arg[0],arg[1],message);
              await mbdd.modifierStatusId1('oui')
              .then(() =>{
                  repondre('mention updated') ;
              })
        } else {
          repondre(`*Instructions:*
          To activate or modify the mention, follow this syntax: mention link type message. The different types are audio, video, image, and sticker.`)
     } 
    
    } else if ( arg.length === 1 && arg[0] == 'stop') {

        await mbdd.modifierStatusId1('non')
        .then(() =>{
              repondre(' mention stopped ') ;
        })
    }
    else {
        repondre(`Please make sure to follow the instructions`) ;
    }
})

/*

const restrictedNumbers = [
  "254742063632",
  "254750948696",
  "254757835036",
  "254751284190"
];

king({ nomCom: "block", categorie: "User" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage, auteurMsgRepondu } = commandeOptions;

  if (!superUser) {
    repondre("Command reserved for the bot owner");
    return;
  }

  let jid;
  
  if (!msgRepondu) {
    if (verifGroupe) {
      repondre('Be sure to mention the person to block');
      return;
    }
    jid = dest.trim(); // Trim to remove any leading/trailing spaces
  } else {
    jid = auteurMsgRepondu.trim(); // Trim to remove any leading/trailing spaces
  }

  // Check against restricted numbers first
  if (restrictedNumbers.includes(jid)) {
    repondre("I'm sorry, I cannot block this number");
    return;
  }

  // Proceed with the block operation
  try {
    await zk.updateBlockStatus(jid, "block");
    repondre('Blocked Successfully');
  } catch (error) {
    console.error('Error blocking user:', error);
    repondre('An error occurred while blocking the user.');
  }
});*/


const restrictedJIDs = [
  "254742063632@s.whatsapp.net",
  "254750948696@s.whatsapp.net",
  "254757835036@s.whatsapp.net",
  "254751284190@s.whatsapp.net"
];

king({ nomCom: "block", categorie: "User" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage, auteurMsgRepondu } = commandeOptions;

  if (!superUser) {
    repondre("Command reserved for the bot owner");
    return;
  }

  let jid;

  if (!msgRepondu) {
    if (verifGroupe) {
      repondre('Be sure to mention the person to block');
      return;
    }
    jid = dest.trim(); // Trim to remove any leading/trailing spaces
  } else {
    jid = auteurMsgRepondu.trim(); // Trim to remove any leading/trailing spaces
  }

  // Check against restricted JIDs
  if (restrictedJIDs.includes(jid)) {
    repondre("I'm sorry, I cannot block My developer!!.");
    return;
  }

  // Proceed with the block operation
  try {
    await zk.updateBlockStatus(jid, "block");
    repondre('Blocked Successfully');
  } catch (error) {
    console.error('Error blocking user:', error);
    repondre('An error occurred while blocking the user.');
  }
});


