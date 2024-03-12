const { zokou } = require("../framework/zokou");
var mumaker = require("mumaker");
zokou({nomCom : "avenger",categorie : "Logo",reaction : "😎"} , async (dest,zk,commandeOptions) =>{

  const {arg,repondre,ms,prefixe} = commandeOptions;
  if(!arg[0]) { repondre( `Example:\n ${prefixe}avenger FLASH-MD` ); return ;}
   let text = arg.join(" ")
   mumaker.textpro("https://en.ephoto360.com/logo-3d-style-avengers-online-427.html", text)
.then((data) =>{
 zk.sendMessage(dest,{image : { url : data.image},caption : 'Logo by *France King*'},{quoted:ms})
}) 
.catch(console.log)
})
;
