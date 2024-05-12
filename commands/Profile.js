const JavaScriptObfuscator = require('javascript-obfuscator')
const {france} = require("../framework/france");
const conf = require("../set")
const {jidDecode}=require("@whiskeysockets/baileys")

france( {
  nomCom : "enc",
 categorie : "General", 
   },
      async(dest,zk, commandeOptions)=> {

        const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu} = commandeOptions;
try {
  
let code = arg.join(' ')

  if (!arg[0]) { repondre('After the command, provide a valid JavaScript code for encryption');return}; 

  const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: false,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1
  });

await repondre(obfuscationResult.getObfuscatedCode());

} catch { repondre("Something is wrong, check if your code is logical and has the correct syntax")
}

});




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

           try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = "https://static.animecorner.me/2023/08/op2.jpg"};
          const status = await zk.fetchStatus(jid) ;

           mess = {
            image : { url : ppUrl },
            caption : '*Name :* '+ nom + '\n*Status :*\n' + status.status
        }
          
        } else {
            jid = auteurMsgRepondu;
            nom ="@"+auteurMsgRepondu.split("@")[0] ;

            try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = "https://static.animecorner.me/2023/08/op2.jpg"};
          const status = await zk.fetchStatus(jid) ;

             mess = {
              image : { url : ppUrl },
              caption : '*Name :* '+ nom + '\n*Status :*\n' + status.status,
               mentions:[auteurMsgRepondu]
          }
            
        } ;

     
      
      
         
            zk.sendMessage(dest,mess,{quoted : ms})
      }); 


        france( {
  nomCom : "getpp",
 categorie : "User", 
   },
      async(dest,zk, commandeOptions)=> {

        const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu} = commandeOptions ;
        let jid = null 
          let nom = null ;

          



        if (!msgRepondu) {
            jid = auteurMessage;
           nom = nomAuteurMessage;

           try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = "https://static.animecorner.me/2023/08/op2.jpg"};
          const status = await zk.fetchStatus(jid) ;

           mess = {
            image : { url : ppUrl },
            caption : 'Here is the Profile picture' 
        } 
          
        } else {
            jid = auteurMsgRepondu;
            nom ="@"+auteurMsgRepondu.split("@")[0] ;

            try { ppUrl = await zk.profilePictureUrl(jid , 'image') ; } catch { ppUrl = "https://static.animecorner.me/2023/08/op2.jpg"};
          const status = await zk.fetchStatus(jid) ;

             mess = {
              image : { url : ppUrl },
              caption : 'Here is the Profile picture', 
               mentions:[auteurMsgRepondu]
          }
            
        } ;

     
      
      
         
            zk.sendMessage(dest,mess,{quoted : ms})
      }); 
