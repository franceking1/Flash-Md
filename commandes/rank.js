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
const conf = require("../set");
const {getMessagesAndXPByJID,getBottom10Users} = require("../bdd/level");


function get_level_exp(xp) {
    const levelThresholds = [
        { level: 1, xpThreshold: 500 },
        { level: 2, xpThreshold: 1000 },
        { level: 3, xpThreshold: 2000 },
        { level: 4, xpThreshold: 4000 },
        { level: 5, xpThreshold: 7000 },
        { level: 6, xpThreshold: 10000 },
        { level: 7, xpThreshold: 15000 },
        { level: 8, xpThreshold: 20000},
        { level: 9, xpThreshold: 25000},
        { level: 10, xpThreshold: 30000},
        { level: 11, xpThreshold: 35000},
        { level: 12, xpThreshold: 45000},
        { level: 13, xpThreshold: 55000},
        { level: 14, xpThreshold: 65000},
        { level: 15, xpThreshold: 75000},
        { level: 16, xpThreshold: 90000},
        { level: 17, xpThreshold: 105000},
        { level: 18, xpThreshold: 120000},
        { level: 19, xpThreshold: 135000},
        { level: 20, xpThreshold: 150000},
        { level: 21, xpThreshold: 170000},
        { level: 22, xpThreshold: 190000},
        { level: 23, xpThreshold: 210000},
        { level: 24, xpThreshold: 230000},
        { level: 25, xpThreshold: 255000},
        { level: 26, xpThreshold: 270000},
        { level: 27, xpThreshold: 295000},
        { level: 28, xpThreshold: 320000},
        { level: 29, xpThreshold: 345000},
        { level: 30, xpThreshold: 385000},
        { level: 31, xpThreshold: 425000},
        { level: 32, xpThreshold: 465000},
        { level: 33, xpThreshold: 505000},
        { level: 34, xpThreshold: 545000},
        { level: 35, xpThreshold: 590000},
        { level: 36, xpThreshold: 635000},
        { level: 37, xpThreshold: 680000},
        { level: 38, xpThreshold: 725000},
        { level: 39, xpThreshold: 770000},
        { level: 40, xpThreshold: 820000},
        { level: 41, xpThreshold: 870000},
        { level: 42, xpThreshold: 920000},
        { level: 43, xpThreshold: 970000},
        { level: 44, xpThreshold: 1020000},
        { level: 45, xpThreshold: 1075000},
        { level: 46, xpThreshold: 1130000},
        { level: 47, xpThreshold: 1185000},
        { level: 48, xpThreshold: 1240000},
        { level: 49, xpThreshold: 1295000},
        { level: 'Zk-GOD', xpThreshold: 2000000}
    ];

    let level = 0;
    let exp = xp;
    let xplimit = levelThresholds[level].xpThreshold;

    for (let i = 0; i < levelThresholds.length; i++) {
        if (xp >= levelThresholds[i].xpThreshold) {
            level = levelThresholds[i].level;
            xplimit = levelThresholds[i + 1]?.xpThreshold || 'No-limit';
            exp = xp - levelThresholds[i].xpThreshold;
        } else {
            break;
        }
    }

    return {
        level: level,
        xplimit: xplimit,
        exp: exp
    };
}

module.exports = {
   get_level_exp,
} ;

france( {
  nomCom : "rank",
 categorie : "Fun",
   }, 
   async(dest,zk, commandeOptions)=> {
  
    const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu , mybotpic} = commandeOptions ;

  if (msgRepondu) {
      
       try {
          
        let rank = await getMessagesAndXPByJID(auteurMsgRepondu) ;

        const data = await get_level_exp(rank.xp)
         let ppuser ;
    
         
         try {
              ppuser = await zk.profilePictureUrl(auteurMsgRepondu , 'image') ;
         } catch {
            ppuser = mybotpic()
         } ;
    
    
         let role ;
    
         if (data.level < 5) {
            role = 'baby'
         } else if (data.level >= 5 || data.level < 10) {
            role = 'kid-Ninja'
         } else if ( data.level >= 10 || data.level < 15 ) {
            role = 'Ninja-genin'
         } else if ( data.level >= 15 || data.level < 20 ) {
            role = 'Ninja-chunin'
         } else if ( data.level >= 20 || data.level < 25 ) {
            role = 'Ninja-jonin'
         } else if ( data.level >= 25 || data.level < 30 ) {
            role = 'ANBU'
         } else if ( data.level >= 30 || data.level < 35 ) {
            role = 'strong ninja'
         } else if ( data.level >= 35 || data.level < 40 ) {
            role = 'kage'
         } else if ( data.level >= 40 || data.level < 45 ) {
            role = 'Hermit seinin'
         } else if ( data.level >= 45 || data.level < 50 ) {
            role = 'Otsusuki'
         } else {
            role = 'GOD'
         }
    
    
         let msg = `
┏━━━┛ FLASH-MD Ranking┗━━━┓
         
    *Name :* @${auteurMsgRepondu.split("@")[0]}
    
    *Level :* ${data.level}
    
    *EXP :* ${data.exp}/${data.xplimit}
    
    *Role :* ${role}

    *Messages :* ${rank.messages}
    
   ┕━✿━┑  ┍━✿━┙`
    
     zk.sendMessage( 
        dest,
        {
            image : {url : ppuser},
            caption : msg,
            mentions : [auteurMsgRepondu]
        },
        {quoted : ms}
      )


       } catch (error) {
         repondre(error)
       }
  }   else {


      try {
        
        let jid = auteurMessage ;
          
        let rang = await getMessagesAndXPByJID(jid) ;

        const data =  get_level_exp(rang.xp)
         let ppuser ;
    
         
         try {
              ppuser = await zk.profilePictureUrl(jid, 'image') ;
         } catch {
            ppuser = mybotpic()
         } ;
    
    
         let role ;
    
         if (data.level < 5) {
            role = 'Nouveau né(e)'
         } else if (data.level >= 5 || data.level < 10) {
            role = 'kid-Ninja'
         } else if ( data.level >= 10 || data.level < 15 ) {
            role = 'Ninja-genin'
         } else if ( data.level >= 15 || data.level < 20 ) {
            role = 'Ninja-chunin'
         } else if ( data.level >= 20 || data.level < 25 ) {
            role = 'Ninja-jonin'
         } else if ( data.level >= 25 || data.level < 30 ) {
            role = 'ANBU'
         } else if ( data.level >= 30 || data.level < 35 ) {
            role = 'strong ninja'
         } else if ( data.level >= 35 || data.level < 40 ) {
            role = 'kage'
         } else if ( data.level >= 40 || data.level < 45 ) {
            role = 'Hermit seinin'
         } else if ( data.level >= 45 || data.level < 50 ) {
            role = 'Otsusuki'
         } else {
            role = 'level-GOD'
         }
    
    
         let msg = `
┏━━━┛ FLASH-MD Ranking ┗━━━┓
     
  *Name :* ${nomAuteurMessage}

  *Level :* ${data.level}

  *EXP :* ${data.exp}/${data.xplimit}

  *Role :* ${role}

  *Messages :* ${rang.messages}

   ┕━✿━┑  ┍━✿━┙`
    
     zk.sendMessage( 
        dest,
        {
            image : {url : ppuser},
            caption : msg
        },
        {quoted : ms}
      )

      } catch (error) {
         repondre(error)
      }

    } 


}) ;

france( {
  nomCom : "toprank",
 categorie : "Fun",
   }, 
   async(dest,zk, commandeOptions)=> {
  
    const {ms , arg, repondre,auteurMessage,nomAuteurMessage, msgRepondu , auteurMsgRepondu , mybotpic} = commandeOptions ;


       let msg = `┏━━┛ FLASH-MD-top-rang ┗━━┓\n\n`
       
      let topRanks = await getBottom10Users() ;
        let mention = [] ;
        for (const rank of topRanks ) {

             const data = await get_level_exp(rank.xp) ;

             let role ;
    
         if (data.level < 5) {
            role = 'Nouveau né(e)'
         } else if (data.level >= 5 || data.level < 10) {
            role = 'kid ninja'
         } else if ( data.level >= 10 || data.level < 15 ) {
            role = 'Ninja-genin'
         } else if ( data.level >= 15 || data.level < 20 ) {
            role = 'Ninja-chunin'
         } else if ( data.level >= 20 || data.level < 25 ) {
            role = 'Ninja-jonin'
         } else if ( data.level >= 25 || data.level < 30 ) {
            role = 'ANBU'
         } else if ( data.level >= 30 || data.level < 35 ) {
            role = 'strong ninja'
         } else if ( data.level >= 35 || data.level < 40 ) {
            role = 'kage'
         } else if ( data.level >= 40 || data.level < 45 ) {
            role = 'Hermit seinin'
         } else if ( data.level >= 45 || data.level < 50 ) {
            role = 'Otsusuki'
         } else {
            role = 'level-GOD'
         }
            msg += `-----------------------
            
 *Name :* @${rank.jid.split("@")[0]}
*Level :* ${data.level}
*Role :* ${role}\n` ;

        mention.push(rank.jid) ;
        }

       zk.sendMessage(dest,
                      {
                        image : { url : mybotpic() },
                        caption : msg,
                        mentions : mention
                      },
                      {quoted : ms})
       

   })


   
    
