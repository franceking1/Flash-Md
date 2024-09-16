const { king } = require("../france/king");
var mumaker = require("mumaker");

king({ nomCom: "hacker", categorie: "Logo", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { prefixe, arg, ms, repondre } = commandeOptions;
    if (!arg || arg == "") {
        repondre("__Exemple : * " + prefixe + "hacker King");
        return;
    }
    try {
        let radio = "984dd03e-220d-4335-a6ba-7ac56b092240";
        let anu = await mumaker.ephoto("https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", arg);
        // // //
        let res = Object.values(anu)[3];
        // console.log("&€"+res);
        //  let lien = "https://e1.yotools.net" + res;
        repondre("PROCESSING...");
        await zk.sendMessage(origineMessage, { image: { url: anu.image }, caption: "LOGO BY FLASH-MD" }, { quoted: ms });
    } catch (e) {
        repondre("🥵🥵 " + e);
    }
});

king({ nomCom: "dragonball", categorie: "Logo", reaction: "🐉" }, async (dest, zk, commandeOptions) => {
    let { arg, repondre, prefixe, ms } = commandeOptions;
    try {
        const noArgMsg = `_EXEMPLE *:  ${prefixe}dragonball Djalega++`;
        if (arg == '' || !arg) {
            repondre(noArgMsg);
            return;
        }
        var lienMaker = "https://ephoto360.com/tao-hieu-ung-chu-phong-cach-dragon-ball-truc-tuyen-1000.html";
        var lienMaker2 = "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html";
        const imgInfo = await mumaker.ephoto(lienMaker2, arg.join(' '));

        await zk.sendMessage(dest, { text: "PROCESSING..." }, { quoted: ms });
        // var idImg = Object.values(imgInfo)[3];

        await zk.sendMessage(dest, { image: { url: imgInfo.image }, caption: "LOGO BY FLASH-MD" }, { quoted: ms });
    }
    catch (e) {
        repondre("🥵🥵 " + e);
    }
}); 
king({nomCom:"incandescent",categorie:"Logo",reaction:"😋"},async(dest,zk,commandeOptions)=>{let {ms,arg,prefixe,repondre}=commandeOptions; 
try{ 
  if(!arg||arg=="") { 
    repondre(prefixe+"incandescent king-MD");
    return; 
  }
  var lien="https://en.ephoto360.com/text-effects-incandescent-bulb-973.html";
  var img = await mumaker.ephoto(lien,arg.join(' '));
  repondre("PROCESSING...");
  await zk.sendMessage(dest,{image:{url:img.image},caption:"LOGO BY FLASH-MD"},{quoted:ms});
} catch(e) {
  repondre(e);
}
});

king({nomCom:"naruto",categorie:"Logo",reaction:"⛩"},async(dest,zk,commandeOptions)=>{let {ms,arg,prefixe,repondre}=commandeOptions;
try{
  if(!arg||arg==""){ repondre(prefixe+"naruto king-MD");return;} 
  const lien="https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html"; 
  const img = await mumaker.ephoto(lien,arg.join(' ')); 
  repondre("PROCESSING...") 
  await zk.sendMessage(dest,{image:{url:img.image},caption:"LOGO BY FLASH-MD"},{quoted:ms}) 
}catch(e){
  repondre(e)
}
});

king({nomCom:"water",categorie:"Logo",reaction:"💦"},async(dest,zk,commandeOptions)=>{var {ms,repondre,arg,prefixe}=commandeOptions; 
if(!arg||arg==""){ repondre(prefixe+"water king");return;}
try{ 
  var lien="https://en.ephoto360.com/create-water-effect-text-online-295.html";
  var img =await mumaker.ephoto(lien,arg);
  repondre("PROCESSING...");
  await zk.sendMessage(dest,{image:{url:img.image},caption:"LOGO BY FLASH-MD"});
}catch(e){
  repondre(`🥵🥵 ${e}`);
}});
king({ nomCom: "snow", categorie: "Logo", reaction: "❄️" }, async (dest, zk, commandeOptions) => { 
    const { arg, ms, prefixe, repondre } = commandeOptions; 
    if (!arg[0]) { 
        repondre(`Exemple of using commande:\n ${prefixe}snow My text`); 
        return; 
    } 
    const text = arg.join(" "); 
    try { 
        const data = await mumaker.textpro("https://textpro.me/create-beautiful-3d-snow-text-effect-online-1101.html", text); 
        await zk.sendMessage(dest, { image: { url: data.image }, caption: 'LOGO BY FLASH-MD' }, { quoted: ms }); 
    } catch (err) { 
        console.error("Une erreur s'est produite :", err); 
    } 
});

king({ nomCom: "transformer", categorie: "Logo", reaction: "🤖" }, async (dest, zk, commandeOptions) => { 
    const { arg, ms, prefixe, repondre } = commandeOptions; 
    if (!arg[0]) { 
        repondre(`Exemple of using commande:\n ${prefixe}transformer My text`); 
        return; 
    } 
    const text = arg.join(" "); 
    try { 
        const data = await mumaker.textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", text); 
        await zk.sendMessage(dest, { image: { url: data.image }, caption: 'LOGO BY FLASH-MD' }, { quoted: ms }); 
    } catch (err) { 
        console.error("Une erreur s'est produite :", err); 
    } 
});

king({ nomCom: "thunder", categorie: "Logo", reaction: "⚡" }, async (dest, zk, commandeOptions) => { 
    const { arg, ms, prefixe, repondre } = commandeOptions; 
    if (!arg[0]) { 
        repondre(`Exemple of using commande:\n ${prefixe}thunder My text`); 
        return; 
    } 
    const text = arg.join(" "); 
    try { 
        const data = await mumaker.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", text); 
        await zk.sendMessage(dest, { image: { url: data.image }, caption: 'LOGO BY FLASH-MD' }, { quoted: ms }); 
    } catch (err) { 
        console.error("Une erreur s'est produite :", err); 
    } 
});

king({ nomCom: "harrypotter", categorie: "Logo", reaction: "🧙‍♂️" }, async (dest, zk, commandeOptions) => { 
    const { arg, ms, prefixe, repondre } = commandeOptions; 
    if (!arg[0]) { 
        repondre(`Exemple of using commande:\n ${prefixe}harrypotter My text`); 
        return; 
    } 
    const text = arg.join(" "); 
    try { 
        const data = await mumaker.textpro("https://textpro.me/create-harry-potter-text-effect-online-1025.html", text); 
        await zk.sendMessage(dest, { image: { url: data.image }, caption: 'LOGO BY FLASH-MD' }, { quoted: ms }); 
    } catch (err) { 
        console.error("Une erreur s'est produite :", err); 
    } 
});

king({ nomCom: "cat", categorie: "Logo", reaction: "🪟" }, async (dest, zk, commandeOptions) => { 
    const { arg, ms, prefixe } = commandeOptions; 
    if (!arg[0]) { 
        repondre(`Exemple of using commande:\n ${prefixe}cat My text`); 
        return; 
    } 
    const text = arg.join(" "); 
    try { 
        const data = await mumaker.textpro("https://textpro.me/write-text-on-foggy-window-online-free-1015.html", text); 
        await zk.sendMessage(dest, { image: { url: data.image }, caption: 'LOGO BY FLASH-MD' }, { quoted: ms }); 
    } catch (err) { 
        console.error("Une erreur s'est produite :", err); 
    } 
});

king({ nomCom: "whitegold", categorie: "Logo", reaction: "💫" }, async (dest, zk, commandeOptions) => { 
    const { arg, ms, prefixe, repondre } = commandeOptions; 
    if (!arg[0]) { 
        repondre(`Exemple of using commande:\n ${prefixe}whitegold My text`); 
        return; 
    } 
    const text = arg.join(" "); 
    try { 
        const data = await mumaker.textpro("https://textpro.me/white-gold-text-effect-970.html", text); 
        await zk.sendMessage(dest, { image: { url: data.image }, caption: 'LOGO BY FLASH-MD' }, { quoted: ms }); 
    } catch (err) { 
        console.error("Une erreur s'est produite :", err); 
    } 
});

king({ nomCom: "halloween", categorie: "Logo", reaction: "🎃" }, async (dest, zk, commandeOptions) => { 
    const { arg, ms, prefixe, repondre } = commandeOptions; 
    if (!arg[0]) { 
        repondre(`Exemple of using commande:\n ${prefixe}halloween My text`); 
        return; 
    } 
    const text = arg.join(" "); 
    try { 
        const data = await mumaker.textpro("https://textpro.me/halloween-fire-text-effect-940.html", text); 
        await zk.sendMessage(dest, { image: { url: data.image }, caption: 'LOGO BY FLASH-MD' }, { quoted: ms }); 
    } catch (err) { 
        console.error("Une erreur s'est produite :", err); 
    } 
});
