const {king} =require("../france/king");
const axios =require("axios");
const Genius = require("genius-lyrics");
// const fetch = require("node-fetch");
 const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

king({ nomCom: "bible",
        reaction: "🎎",

        categorie: "General" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 

const verse = arg.join(' ');

if (!verse) return repondre(`Please specify the book, the chapter and the verse you want to read. Example: bible john 3:16`);

let VerseRes = await fetch(`https://bible-api.com/${verse}`);

if (!VerseRes.ok) return repondre(`Please specify the chapter number or name. Example: bible john 3:16`);

let verseData = await VerseRes.json();

let bibleChapter = `📖 *THE HOLY BIBLE*\n
📜 *_WE'RE READING:_* ${verseData.reference}\n
🔢 *_NUMBER OF VERSES:_* ${verseData.verses.length}\n
🤍 *_NOW READ:_* ${verseData.text}\n
🌍 *_LANGUAGE_:* ${verseData.translation_name}\n\n
╭────────────────◆
│ *_Powered by FLASH-MD._*
╰─────────────────◆`

await repondre(bibleChapter);

});
    
    



king({ nomCom: "poll",
        reaction: "✨",
        categorie: "General" }, async (origineMessage, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 
const polll = arg.join(' ');



let [poll, opt] = polll.split("/")

if (polll.split("/") < 2)
                return repondre(`Incorrect format.\nExample: poll what is 1+1/2, 3, 4`);

let options = []
            for (let i of opt.split(',')) {
                options.push(i)
            }
            await zk.sendMessage(origineMessage, {
                poll: {
                    name: poll,
                    values: options
                }
            })

})

 king({ nomCom: "fact",
        reaction: "✌️",
        categorie: "User" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 



const response = await fetch('https://nekos.life/api/v2/fact');


const data = await response.json();

repondre(`◆━━━━━━✦FACT✦━━━━━━◆  
*◇* ${data.fact}




*◇* Powered by *France King*

╔═════◇
║◇ *KEEP USING FLASH-MD*
╚════════════════════>  `);


})

king({ nomCom: "quotes",
        reaction: "🗿",
        categorie: "User" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions; 


const response = await fetch('https://favqs.com/api/qotd');
const data = await response.json();
const flashhh= `
◆━━━━━━✦QUOTE✦━━━━━━◆ 
◇ _${data.quote.body}_\n

◇ *AUTHOR:* ${data.quote.author}




◇ _Powered by:_ *France King*


╔═════◇
║◇ *KEEP USING FLASH-MD*
╚════════════════════> `;
repondre(flashhh);

})
king({ nomCom: "define",
        reaction: "😁",
        categorie: "Search" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions;  
        
if (!arg || arg.length === 0) return repondre("provide a term");

         const ques = arg.join(' ');

        try{
            let { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${ques}`)
            var textt = `
 Word: ${ques}
 Definition: ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}
 Example: ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`
            return repondre(textt)
                    } catch {
                        return repondre(`No result for ${ques}`)
                    }

})

        
king({ nomCom: "lyrics",
        reaction: "✨",
        categorie: "Search" }, async (dest, zk, commandeOptions) => {
    
    const { repondre, arg, ms } = commandeOptions;  
        
   try {

    if (!arg || arg.length === 0) return repondre("please provide me the song name");

         const question = arg.join(' ');

 
  
 const searches = await Client.songs.search(question); 
 const firstSong = searches[0];

console.log(firstSong);
const lyrics = await firstSong.lyrics();
 const artist = await firstSong.artist.name;
const title = await firstSong.title;

const msg = `*FLASH-MD LYRICS FINDER*\n\n*TITLE* - ${title}\n\n*ARTIST* - ${artist}\n\n${lyrics}`;

await zk.sendMessage(dest, { image: { url: './media/lyrics.jpg' }, caption: msg }, { quoted: ms });
 } catch (error) { 
             repondre(`Error occured` + error); 
             console.log(error); 
         } 



        })

      
