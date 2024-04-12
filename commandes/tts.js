
/** 

🇫‌🇱‌🇦‌🇸‌🇭‌-🇲‌🇩‌ 

  𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 (𝗖) 2024.
 𝗟𝗶𝗰𝗲𝗻𝘀𝗲𝗱 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲  𝗠𝗜𝗧 𝗟𝗶𝗰𝗲𝗻𝘀𝗲;
 𝗬𝗼𝘂 𝗺𝗮𝘆 𝗻𝗼𝘁 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗳𝗶𝗹𝗲 𝗲𝘅𝗰𝗲𝗽𝘁 𝗶𝗻 𝗰𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗟𝗶𝗰𝗲𝗻𝘀𝗲.
 𝗜𝘁 𝗶𝘀 𝘀𝘂𝗽𝗽𝗹𝗶𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝗶𝘁 𝗺𝗮𝘆 𝗯𝗲 𝘂𝘀𝗲𝗳𝘂𝗹.
 * @𝗽𝗿𝗼𝗷𝗲𝗰𝘁_𝗻𝗮𝗺𝗲 : 𝗙𝗹𝗮𝘀𝗵 𝗠𝗗, 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗮𝗻𝗱 𝗲𝗮𝘀𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀𝗲𝗿 𝗯𝗼𝘁 
 * @𝗼𝘄𝗻𝗲𝗿: 𝗙𝗿𝗮𝗻𝗰𝗲 𝗞𝗶𝗻𝗴 
 
 **/








const googleTTS = require('google-tts-api');
const {france} = require("../framework/france");


france( {
  nomCom : "dit",
 categorie : "tts",
  reaction : "👄" },
      async(dest,zk, commandeOptions)=> {
 
const {ms,arg,repondre} = commandeOptions;
      if (!arg[0]) {repondre("Insert a word");return} ;
 const mots = arg.join(" ")

const url = googleTTS.getAudioUrl( mots, {
  lang: 'fr',
  slow: false,
  host: 'https://translate.google.com',
});
console.log(url); 
             zk.sendMessage(dest, { audio: { url:url},mimetype:'audio/mp4' }, { quoted: ms,ptt: true });


        
}
) ;

france( {
  nomCom : "itta",
 categorie : "tts",
  reaction : "👄" },
      async(dest,zk, commandeOptions)=> {
 
const {ms,arg,repondre} = commandeOptions;
      if (!arg[0]) {repondre("Insert a word");return} ;
 const mots = arg.join(" ")

const url = googleTTS.getAudioUrl( mots, {
  lang: 'ja',
  slow: false,
  host: 'https://translate.google.com',
});
console.log(url); 
             zk.sendMessage(dest, { audio: { url:url},mimetype:'audio/mp4' }, { quoted: ms,ptt: true });


        
}
) ;

france( {
  nomCom : "say",
 categorie : "tts",
  reaction : "👄" },
      async(dest,zk, commandeOptions)=> {
 
const {ms,arg,repondre} = commandeOptions;
      if (!arg[0]) {repondre("Insert a word");return} ;
 const mots = arg.join(" ")

const url = googleTTS.getAudioUrl( mots, {
  lang: 'en',
  slow: false,
  host: 'https://translate.google.com',
});
console.log(url); 
             zk.sendMessage(dest, { audio: { url:url},mimetype:'audio/mp4' }, { quoted: ms,ptt: true });


        
}
) ;

