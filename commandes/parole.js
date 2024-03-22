const { zokou } = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics"); 
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({ nomCom: "lyrics",
        reaction: "✨",
        categorie: "Search" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions;  
        
   try {

    if (!arg || arg.length === 0) return repondre("please provide me the song name");

         const question = arg.join(' ');

 
  
 const searches = await Client.songs.search(question); 
 const firstSong = searches[0]; 
 const lyrics = await firstSong.lyrics(); 
 await zk.sendMessage(dest, { text: lyrics}, { quoted: ms }); 
 } catch (error) { 
             reply(`I did not find any lyrics for ${text}. Try searching a different song.`); 
             console.log(error); 
         } 



        })
