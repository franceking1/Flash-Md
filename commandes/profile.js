
/** 

🇫‌🇱‌🇦‌🇸‌🇭‌-🇲‌🇩‌ 

  𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 (𝗖) 2024.
 𝗟𝗶𝗰𝗲𝗻𝘀𝗲𝗱 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲  𝗠𝗜𝗧 𝗟𝗶𝗰𝗲𝗻𝘀𝗲;
 𝗬𝗼𝘂 𝗺𝗮𝘆 𝗻𝗼𝘁 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗳𝗶𝗹𝗲 𝗲𝘅𝗰𝗲𝗽𝘁 𝗶𝗻 𝗰𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗟𝗶𝗰𝗲𝗻𝘀𝗲.
 𝗜𝘁 𝗶𝘀 𝘀𝘂𝗽𝗽𝗹𝗶𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝗶𝘁 𝗺𝗮𝘆 𝗯𝗲 𝘂𝘀𝗲𝗳𝘂𝗹.
 * @𝗽𝗿𝗼𝗷𝗲𝗰𝘁_𝗻𝗮𝗺𝗲 : 𝗙𝗹𝗮𝘀𝗵 𝗠𝗗, 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗮𝗻𝗱 𝗲𝗮𝘀𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀𝗲𝗿 𝗯𝗼𝘁 
 * @𝗼𝘄𝗻𝗲𝗿: 𝗙𝗿𝗮𝗻𝗰𝗲 𝗞𝗶𝗻𝗴 
 
 **/





const {france} = require("../framework/france");
const conf = require("../set")
const {jidDecode}=require("@whiskeysockets/baileys")


france( {
  nomCom : "whois",
 categorie : "User",
   },
      async(dest,zk, commandeOptions)=> {

        const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu} = commandeOptions ;
        let jid = null 
          let nom = null ;

          



        if (!msgRepondu) {
            jid = auteurMessage;
           nom = nomAuteurMessage;

           try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = conf.IMAGE_MENU};
          const status = await zk.fetchStatus(jid) ;

           mess = {
            image : { url : ppUrl },
            caption : '*Nom :* '+ nom + '\n*Status :*\n' + status.status
        }
          
        } else {
            jid = auteurMsgRepondu;
            nom ="@"+auteurMsgRepondu.split("@")[0] ;

            try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = conf.IMAGE_MENU};
          const status = await zk.fetchStatus(jid) ;

             mess = {
              image : { url : ppUrl },
              caption : '*Name :* '+ nom + '\n*Status :*\n' + status.status,
               mentions:[auteurMsgRepondu]
          }
            
        } ;

     
      
      
         
            zk.sendMessage(dest,mess,{quoted : ms})
      });
