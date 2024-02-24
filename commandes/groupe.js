

const { zokou } = require("../framework/zokou")
//const { getGroupe } = require("../bdd/groupe")
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../bdd/antilien")
const {atbajouterOuMettreAJourJid,atbrecupererActionJid,atbverifierEtatJid,atbmettreAJourAction} = require("../bdd/antibot")
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
//const { uploadImageToImgur } = require('../framework/imgur');





zokou({ nomCom: "tagall", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿this command is reserved for groups ❌"); return; }
  if (!arg || arg === ' ') {
  mess = 'Aucun Message'
  } else {
    mess = arg.join(' ')
  } ;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; let car = `──────▄▌▐▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▌\n───▄▄██▌█ the Caravan \n▄▄▄▌▐██▌█ of Happiness is coming\n███████▌█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌\n▀(⊙)▀▀▀▀▀▀▀(⊙)(⊙)▀▀▀▀▀▀▀▀▀▀(⊙)▀▀`

  tag += `========================\n  
        🌟 *FLASH-MD* 🌟
========================\n
👥 Group : ${nomGroupe} 🚀 
👤 Autor : *${nomAuteurMessage}* 👋 
📜 Message : *${mess}* 📝
========================\n
\n

` ;




  let emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$','😟','🥵','🐅']
  let random = Math.floor(Math.random() * (emoji.length - 1))


  for (const membre of membresGroupe) {
    tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`
  }

 
 if (verifAdmin || superUser) {

  zk.sendMessage(dest, { text: tag, mentions: membresGroupe.map((i) => i.id) }, { quoted: ms })

   } else { repondre('command reserved for admins')}

});


zokou({ nomCom: "link", categorie: 'Group', reaction: "🙋" }, async (dest, zk, commandeOptions) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = commandeOptions;
  if (!verifGroupe) { repondre("wait bro , you want the link to my dm?"); return; };


  var link = await zk.groupInviteCode(dest)
  var lien = `https://chat.whatsapp.com/${link}`;

  let mess = `hello ${nomAuteurMessage} , here is the group link ${nomGroupe} \n

Lien :${lien}`
  repondre(mess)


});
/** *nommer un membre comme admin */
zokou({ nomCom: "promote", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("For groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              var txt = `🎊🎊🎊  @${auteurMsgRepondu.split("@")[0]} Has been successfully promoted as an Admin.`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            } else { return repondre("This member is already an administrator of the group.") }

          } else { return repondre("This user is not part of the group."); }
        }
        else { return repondre("Sorry, I cannot perform this action because I am not an administrator of the group.") }

      } else { repondre("please tag the member to be nominated"); }
    } else { return repondre("Sorry I cannot perform this action because you are not an administrator of the group.") }
  } catch (e) { repondre("oups " + e) }

})

//fin nommer
/** ***demettre */

zokou({ nomCom: "demote", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("For groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {

              repondre("This member is not a group administrator.")

            } else {
              var txt = `@${auteurMsgRepondu.split("@")[0]} was removed from his position as a group administrator\n`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            }

          } else { return repondre("This user is not part of the group."); }
        }
        else { return repondre("Sorry I cannot perform this action because I am not an administrator of the group.") }

      } else { repondre("please tag the member to be removed"); }
    } else { return repondre("Sorry I cannot perform this action because you are not an administrator of the group.") }
  } catch (e) { repondre("oups " + e) }

})



/** ***fin démettre****  **/
/** **retirer** */
zokou({ nomCom: "remove", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { ms, repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifAdmin, verifZokouAdmin, verifGroupe, utilisateur, mbre, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("for groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif"
              var sticker = new Sticker(gifLink, {
                pack: 'FLASH-MD', // The pack name
                author: nomAuteurMessage, // The author name
                type: StickerTypes.FULL, // The sticker type
                categories: ['🤩', '🎉'], // The sticker category
                id: '12345', // The sticker id
                quality: 50, // The quality of the output file
                background: '#000000'
              });

              await sticker.toFile("st.webp")
              var txt = `@${auteurMsgRepondu.split("@")[0]} was removed from the group.\n`
            /*  zk.sendMessage(dest, { sticker: fs.readFileSync("st.webp") }, { quoted: ms.message.extendedTextMessage.contextInfo.stanzaId})*/
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })

            } else { repondre("This member cannot be removed because he is an administrator of the group.") }

          } else { return repondre("This user is not part of the group."); }
        }
        else { return repondre("Sorry, I cannot perform this action because I am not an administrator of the group.") }

      } else { repondre("please tag the member to be removed"); }
    } else { return repondre("Sorry I cannot perform this action because you are not an administrator of the group .") }
  } catch (e) { repondre("oups " + e) }

})


/** *****fin retirer */


zokou({ nomCom: "del", categorie: 'Group',reaction:"🧹" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe,auteurMsgRepondu,idBot, msgRepondu, verifAdmin, superUser, auteurMessage ,verifZokouAdmin} = commandeOptions;
  
  if (!msgRepondu) {
    repondre("Please mention the message to delete.");
    return;
  }
  if(superUser && auteurMsgRepondu==idBot )
  {
    
       if(auteurMsgRepondu==idBot)
       {
         const key={
            remoteJid:dest,
      fromMe: true,
      id: ms.message.extendedTextMessage.contextInfo.stanzaId,
         }
         await zk.sendMessage(dest,{delete:key});return;
       } 
  }

          if(verifGroupe)
          {
               if(verifAdmin || superUser)
               {
                    
                         try{
                
      
            const key=   {
               remoteJid : dest,
               id : ms.message.extendedTextMessage.contextInfo.stanzaId ,
               fromMe : false,
               participant : ms.message.extendedTextMessage.contextInfo.participant

            }        
         
         await zk.sendMessage(dest,{delete:key});return;

             }catch(e){repondre( "I need admin rights.")}
                    
                      
               }else{repondre("Sorry, you are not an administrator of the group.")}
          }

});

zokou({ nomCom: "info", categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, verifZokouAdmin } = commandeOptions;
  if (!verifGroupe) { repondre("order reserved for the group only"); return };

 try { ppgroup = await zk.profilePictureUrl(dest ,'image') ; } catch { ppgroup = conf.IMAGE_MENU}

    const info = await zk.groupMetadata(dest)

    /*console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc)*/


    let mess = {
      image: { url: ppgroup },
      caption:  `*━━━━『GROUP INFO』━━━━*\n\n*🎐Name:* ${info.subject}\n\n*🔩Group's ID:* ${dest}\n\n*🔍Desc:* \n\n${info.desc}`
    }


    zk.sendMessage(dest, mess, { quoted: ms })
  });



 //------------------------------------antilien-------------------------------

 zokou({ nomCom: "antilink", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { ms, repondre, arg, verifGroupe, auteurMessage, superUser, verifZokouAdmin, verifAdmin,prefixe, dev } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*for groups only*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre('Here is an explanation of how FLASH-MD\'s antilink works:\nTo activate the antilink, add after the command *on* or *off* To modify the action of the antilink, type after the command action/"your-action " ; the different actions are delete; warn and remove') ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("the antilink is already activated for this group")
                    } else {
                  await ajouterOuMettreAJourJid(dest,"oui");
                
              repondre("the antilink is activated successfully") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await ajouterOuMettreAJourJid(dest , "non");

                repondre("The antilink has been successfully deactivated");
                
              } else {
                repondre("antilink is not activated for this group");
              }
            } else if (arg.join('').split("/")[0] === 'action') {
                            

               await mettreAJourAction(dest,arg.join('').split("/")[1]);

               repondre(`the action of the antilink has been updated on ${arg.join('').split("/")[1]}`);
            

            } else repondre('Here is an explanation of how FLASH-MD\'s antilink works:\nTo activate the antilink, add after the command "on" or "off" To modify the action of the antilink, type after the command action/"your-action " ; the different actions are *delete* , *warn* and *remove*')

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('You are not entitled to this order')
  }

});




 //------------------------------------antibot-------------------------------

 zokou({ nomCom: "antibot", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { ms, repondre, arg, verifGroupe, auteurMessage, superUser, verifZokouAdmin, verifAdmin,prefixe, dev } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*for groups only*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await atbverifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre('Here is an explanation of how the FLASH-MD antibot works:\nTo activate the antibot, add *on* or *off* after the command;\nTo modify the action of the antibot, type after the command action/"your-action" ; the different actions are deleted; warn and remove') ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("the antibot is already activated for this group")
                    } else {
                  await atbajouterOuMettreAJourJid(dest,"oui");
                
              repondre("the antibot is successfully activated") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await atbajouterOuMettreAJourJid(dest , "non");

                repondre("The antibot has been successfully deactivated");
                
              } else {
                repondre("antibot is not activated for this group");
              }
            } else if (arg.join('').split("/")[0] === 'action') {

               await atbmettreAJourAction(dest,arg.join('').split("/")[1]);

               repondre(`the action of the antibot has been updated on ${arg.join('').split("/")[1]}`);
            

            } else repondre('Here is an explanation of how the FLASH-MD antibot works:\nTo activate the antibot, add "yes" or "no" after the command;\nTo modify the action of the antibot, type after the command action/"your-action" ; the different actions are deleted; warn and remove')

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('You are not entitled to this order')
  }

});

//----------------------------------------------------------------------------

zokou({ nomCom: "group", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage, arg } = commandeOptions;

  if (!verifGroupe) { repondre("order reserved for group only"); return };
  if (superUser || verifAdmin) {

    if (!arg[0]) { repondre('Instructions:\n\nType group open or close'); return; }
    const option = arg.join(' ')
    switch (option) {
      case "open":
        await zk.groupSettingUpdate(dest, 'not_announcement')
        repondre('group open')
        break;
      case "close":
        await zk.groupSettingUpdate(dest, 'announcement');
        repondre('Group close successfully');
        break;
      default: repondre("Please don't invent an option")
    }

    
  } else {
    repondre("order reserved for the administratorr");
    return;
  }
 

});

zokou({ nomCom: "leave", categorie: "Mods" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;
  if (!verifGroupe) { repondre("order reserved for group only"); return };
  if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }
  await repondre('sayonnara') ;
   
  zk.groupLeave(dest)
});

zokou({ nomCom: "gname", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("order reserved for administrators of the group");
    return;
  };
  if (!arg[0]) {
    repondre("Please enter the group name");
    return;
  };
   const nom = arg.join(' ')
  await zk.groupUpdateSubject(dest, nom);
    repondre(`group name refresh: *${nom}*`)

 
}) ;

zokou({ nomCom: "gdesc", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("order reserved for administrators of the group");
    return;
  };
  if (!arg[0]) {
    repondre("Please enter the group description");
    return;
  };
   const nom = arg.join(' ')
  await zk.groupUpdateDescription(dest, nom);
    repondre(`group description update: *${nom}*`)

 
}) ;


zokou({ nomCom: "gpp", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifAdmin) {
    repondre("order reserved for administrators of the group");
    return;
  }; 
  if (msgRepondu.imageMessage) {
    const pp = await  zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;

    await zk.updateProfilePicture(dest, { url: pp })
                .then( res => {
                    zk.sendMessage(dest,{text:"Group pfp changed"})
                    fs.unlinkSync(pp)
                }).catch(() =>   zk.sendMessage(dest,{text:err})
)
        
  } else {
    repondre('Please mention an image')
  }

});

/////////////
zokou({nomCom:"hidetag",categorie:'Group',reaction:"🎤"},async(dest,zk,commandeOptions)=>{

  const {ms,repondre,msgRepondu,verifGroupe,prefixe, arg ,verifAdmin , superUser}=commandeOptions;

  if(!verifGroupe)  { repondre('This command is only allowed in groups.')} ;
  if (verifAdmin || superUser) { 

  let metadata = await zk.groupMetadata(dest) ;

  //console.log(metadata.participants)
 let tag = [] ;
  for (const participant of metadata.participants ) {

      tag.push(participant.id) ;
  }
  //console.log(tag)

    if(msgRepondu) {
      console.log(msgRepondu)
      let msg ;

      if (msgRepondu.imageMessage) {

        

     let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
     // console.log(msgRepondu) ;
     msg = {

       image : { url : media } ,
       caption : msgRepondu.imageMessage.caption,
       mentions :  tag
       
     }
    

      } else if (msgRepondu.videoMessage) {

        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;

        msg = {

          video : { url : media } ,
          caption : msgRepondu.videoMessage.caption,
          mentions :  tag
          
        }

      } else if (msgRepondu.audioMessage) {
    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
       
        msg = {
   
          audio : { url : media } ,
          mimetype:'audio/mp4',
          mentions :  tag
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
       
        msg = { sticker: stickerBuffer2 , mentions : tag}


      }  else {
          msg = {
             text : msgRepondu.conversation,
             mentions : tag
          }
      }

    zk.sendMessage(dest,msg)

    } else {

        if(!arg || !arg[0]) { repondre('Enter the text to announce or mention the message to announce');
        ; return} ;

      zk.sendMessage(
         dest,
         {
          text : arg.join(' ') ,
          mentions : tag
         }     
      )
    }

} else {
  repondre('Command reserved for administrators.')
}

});


zokou({ nomCom: "apk", reaction: "✨", categorie: "Download" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    const appName = arg.join(' ');
    if (!appName) {
      return repondre("*Enter the name of the application to search for*");
    }

    const searchResults = await search(appName);

    if (searchResults.length === 0) {
      return repondre("*can't find application, please enter another name*");
    }

    const appData = await download(searchResults[0].id);
    const fileSize = parseInt(appData.size);

    if (fileSize > 300) {
      return repondre("The file exceeds 300 MB, unable to download.");
    }

    const downloadLink = appData.dllink;
    const captionText =
      "『 *FLASH-MD App* 』\n\n*Name :* " + appData.name +
      "\n*Id :* " + appData["package"] +
      "\n*Last Update :* " + appData.lastup +
      "\n*Size :* " + appData.size +
      "\n";

    const apkFileName = (appData?.["name"] || "Downloader") + ".apk";
    const filePath = apkFileName;

    const response = await axios.get(downloadLink, { 'responseType': "stream" });
    const fileWriter = fs.createWriteStream(filePath);
    response.data.pipe(fileWriter);

    await new Promise((resolve, reject) => {
      fileWriter.on('finish', resolve);
      fileWriter.on("error", reject);
    });

    const documentMessage = {
      'document': fs.readFileSync(filePath),
      'mimetype': 'application/vnd.android.package-archive',
      'fileName': apkFileName
    };

    // Utilisation d'une seule méthode sendMessage pour envoyer l'image et le document
    zk.sendMessage(dest, { image: { url: appData.icon }, caption: captionText }, { quoted: ms });
    zk.sendMessage(dest, documentMessage, { quoted: ms });

    // Supprimer le fichier après envoi
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Erreur lors du traitement de la commande apk:', error);
    repondre("*Error during apk command processing*");
  }
});
