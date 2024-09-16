const { mediafireDl } = require("../france/dl/Function");
const { king } = require('../france/king');
const fs = require('fs');
const getFBInfo = require('@xaviabot/fb-downloader');
const { default: axios } = require("axios");
const { ndown } = require("nayan-media-downloader");


/*

king({
  nomCom: "beautify", 
  categorie: "user",
  aliases: ["beauty"]
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    if (!arg || !arg.length) {
        repondre('Please provide a photo URL to beautify.');
        return;
    }

    let photoUrl = arg.join(' ').trim();  // Trim the URL to avoid leading/trailing spaces

    // Ensure the URL is valid
    if (!photoUrl.startsWith("http://") && !photoUrl.startsWith("https://")) {
        repondre('Please provide a valid photo URL.');
        return;
    }

    try {
        // Send request to the beautification API
        const response = await axios.get(`https://samirxpikachuio.onrender.com/remacne?url=${encodeURIComponent(photoUrl)}`);
        const result = response.data;

        // Log the full response for debugging
        console.log("API response:", result);

        if (result && result.status === 'success' && result.image) {
            const beautifiedImageUrl = result.image;

            // Send the beautified image to the user
            await zk.sendMessage(dest, { image: { url: beautifiedImageUrl }, caption: "_╰►PHOTO BEAUTIFIED BY_ *FLASH-MD*" }, ms);
        } else {
            console.error("Failure reason:", result);
            repondre('Could not beautify the image. Please ensure the URL points to a valid image.');
        }
    } catch (error) {
        console.error("An error occurred while beautifying the photo:", error.response?.data || error.message);
        repondre(`An error occurred while beautifying the photo: ${error.message}. Please ensure the URL is correct.`);
    }
});

*/

king({
  nomCom: "story", 
  categorie: "Download",
  aliases: ["igstory", "instastory", "storydl"]
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    if (!arg || !arg.length) {
        repondre('Please provide an Instagram story link.');
        return;
    }

    let link = arg.join(' ');

    //
    if (!link.startsWith("https://www.instagram.com/stories/")) {
        repondre('Insert a link for Instagram storie!');
        return;
    }

    try {
        
        const response = await axios.get(`https://api-aswin-sparky.koyeb.app/api/downloader/story?url=${encodeURIComponent(link)}`);
        const result = response.data;

        if (result.status && result.data.length > 0) {
            const media = result.data[0]; 
            const mediaUrl = media.url;

            if (media.type === 'image') {
                
                await zk.sendMessage(dest, { image: { url: mediaUrl }, caption: "_╰►IG-STORY IMAGE DOWNLOADED BY_ *FLASH-MD*" }, ms);
            } else if (media.type === 'video') {
                
                await zk.sendMessage(dest, { video: { url: mediaUrl }, caption: "_╰►IG-STORY VIDEO DOWNLOADED BY_ *FLASH-MD*" }, ms);
            } else {
                repondre('Unsupported media type.');
            }
        } else {
            repondre('No media found at the provided Instagram story link. Please make sure the link is correct.');
        }
    } catch (error) {
        console.error("An error occurred while downloading the story:", error);
        repondre(`An error occurred while downloading the story: ${error.message}. Please ensure the link is correct and points to public media.`);
    }
});






king({
  nomCom: "insta", 
  categorie: "Download",
  aliases: ["ig", "igdl", "instagram"]
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    if (!arg || !arg.length) {
        repondre('Please insert an Instagram link.');
        return;
    }

    let link = arg.join(' ');

    // Check if the link starts with "https://www.instagram.com/reel" or "https://www.instagram.com/p"
    const isInstagramReel = link.startsWith("https://www.instagram.com/reel");
    const isInstagramPost = link.startsWith("https://www.instagram.com/p");

    try {
        const result = await ndown(link);
        console.log("Full ndown response:", JSON.stringify(result, null, 2)); 

        if (isInstagramReel) {
            // Handle Instagram Reel links
            if (result.data && result.data.length > 0) {
                const media = result.data[0];
                const mediaUrl = media.url;
                const caption = "_╰►VIDEO DOWNLOADED BY_ *FLASH-MD*";

                await zk.sendMessage(dest, { video: { url: mediaUrl }, caption }, ms);
            } else {
                repondre('No video found at the provided Instagram Reel link. Please make sure the link is correct.');
            }
        } else if (isInstagramPost) {
            // Handle other Instagram post links (assumed to be images)
            if (result.data && result.data.length > 0) {
                const media = result.data[0];
                const mediaUrl = media.url;
                const caption = "_╰►IMAGE DOWNLOADED BY_ *FLASH-MD*";

                await zk.sendMessage(dest, { image: { url: mediaUrl }, caption }, ms);
            } else {
                repondre('No image found at the provided Instagram post link. Please make sure the link is correct.');
            }
        } else {
            repondre('The provided link does not match the expected format for Instagram Reel or post.');
        }
    } catch (error) {
        console.error("An error occurred while downloading:", error);
        repondre(`An error occurred while downloading the media: ${error.message}. Please ensure the link is correct and points to public media.`);
    }
});






king({ nomCom: "gitclone", categorie: "Download" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;


const gitlink = arg.join(' ');

if (!gitlink) return repondre(`Please provide a valid github link.`)
if (!gitlink.includes('github.com')) return repondre(`Is that a GitHub repo link ?!`)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    let [, user3, repo] = gitlink.match(regex1) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user3}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    zk.sendMessage(dest, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: ms }).catch((err) => repondre("error"))

});


    king({ nomCom: "math", categorie: "Finance" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    // Join arguments and remove spaces around operators
    const input = arg.join(' ').replace(/\s+/g, '');

    // Validate the input for only numbers, operators, and valid characters
    if (!/^[0-9+\-*/().]+$/.test(input)) {
        return repondre(`Invalid input. Please use a valid format like '1+1' or '2*3+5/2'.`);
    }

    try {
        // Evaluate the entire mathematical expression
        const result = eval(input);

        // Check if the result is a finite number
        if (!isFinite(result)) {
            return repondre("Error: Division by zero or other invalid operation.");
        }

        // Send the result as a message
        zk.sendMessage(dest, { text: `The result is: ${result}` }, { quoted: ms })
            .catch((err) => repondre("Error sending the result"));

    } catch (err) {
        return repondre("Invalid expression. Please ensure you are using valid mathematical operators.");
    }
});    




king({
    nomCom: "tiktok",
    categorie: "Download",
    aliases: ["tik", "tok", "tikdl"] // Adding aliases
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    const input = arg.join(' ');

    if (!input) {
        return repondre('Please insert a TikTok video link!');
    }

    try {
        const response = await fetch(`https://api.prabath-md.tech/api/tiktokdl?url=${encodeURIComponent(input)}`);
        const data = await response.json();

        if (!data.data || !data.data.no_wm) {
            return repondre('Failed to retrieve video. Please check the link and try again.');
        }

        await repondre('A moment, *FLASH-MD* is downloading that...');

        const tikvid = data.data.no_wm;

        await zk.sendMessage(dest, {
            video: { url: tikvid },
            caption: "╰►𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐓𝐢𝐤𝐓𝐨𝐤 𝐕𝐢𝐝𝐞𝐨!\n𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐝 𝐛𝐲 *𝐅𝐋𝐀𝐒𝐇-𝐌𝐃*",
            gifPlayback: false
        }, { quoted: ms });

    } catch (error) {
        console.error(error);
        await repondre('An error occurred while processing the request. Please try again later.');
    }
}); 

/*
king({ nomCom: "image-dl", categorie: "Download" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let input = arg.join(' ');

if (!arg[0]) {
        repondre('Give me any social media image link!');
        return;
    }

try {


const load = await fetch(`https://samirxpikachuio.onrender.com/alldl?url=${input}`);
       const data = await load.json();

//let final = data.result;
  const final = data.result; 

zk.sendMessage(dest, { image: { url: final}, caption: "_╰►IMAGE DOWNLOADED BY_ *FLASH-MD*", gifPlayback: false }, { quoted: ms });
    
   } catch (e) { repondre("A fatal error has occured... \n " + e)}
       
            
        
    
});*/


/*king({nomCom : "testdl" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('provide any valid link ?');return}; 




  alldown(link).then(data => {
  console.log(data)
    });

})*/

/*
king({nomCom : "insta" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('provide an instragam link ');return}; 

  try {
    
     const apiUrl = `https://www.guruapi.tech/api/igdlv1?url= ${encodeURIComponent(link)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result.success && result.data && result.data.length > 0) {
        const mediaUrl = result.data[0].url_download; // Use the first media URL from the array
        const cap = "> *POWERED BY FLASH-MD*";

        zk.sendMessage(dest, { video: { url: mediaUrl}, caption: "France King", {quoted : ms});

    }
  
  } catch (e) {repondre("An error Occurred while downloading your media.\n*KEEP USING FLASH-MD*" + e)}
  
});*/


/*king({nomCom : "insta" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions;

let link = arg.join(' ')

  if (!arg[0]) { repondre('Please insert an Instagram video link');return};

try {
    const red = await axios.get(`https://www.guruapi.tech/api/igdlv1?url=?=${link}`);
    const data = await red.json();

    if (data && data.result && data.result.data && data.result.data.length > 0) {
        const media = data.result.data[0];
        if (media.type === 'video') {
            zk.sendMessage(dest, { video: { url: media.url }, caption: "Here is your Instagram Video.\n _Downloaded by_ *FLASH-MD*", gifPlayback: false }, { quoted: ms });
        } else {
            zk.sendMessage(dest, { image: { url: media.url }, caption: "Here is your Instagram Image!\n _Downloaded by_ *FLASH-MD*" });
        }
    } else {
        throw new Error("No media found in the response data");
    }
} catch (e) {
    console.error("An error occurred while downloading:", e);
}

});
*/


king({ nomCom: "video-dl", categorie: "Download" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let input = arg.join(' ');

if (!arg[0]) {
        repondre('Give me any social media video link!');
        return;
    }

try {


const load = await fetch(`https://www.noobs-api.000.pe/dipto/alldl?url=${input}`);
       const data = await load.json();

//let final = data.result;
  const final = data.result; 

zk.sendMessage(dest, { video: { url: final}, caption: "╰►𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐕𝐢𝐝𝐞𝐨!\n𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐝 𝐛𝐲 *𝐅𝐋𝐀𝐒𝐇-𝐌𝐃*", gifPlayback: false }, { quoted: ms });
    
   } catch (e) { repondre("A fatal error has occured... \n " + e)}
       
            
        
    
});
/*

king({ nomCom: "video-dl", categorie: "Download" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let input = arg.join(' ');

    if (!arg[0]) {
        return repondre('Give me any social media video link!');
    }

    try {
        // Fetching the video download data from the API
        const response = await fetch(`https://prabath-md-api.up.railway.app/api/avd?url=${input}&apikey=prabath-api_5f6557`);
        const data = await response.json();

        // Checking if the API call was successful
        if (data.status !== "success ✅") {
            return repondre("Error fetching the video. Please try again with a valid link.");
        }

        // Extracting the download URL from the response data
        const videoUrl = data.data.medias[0].url;  // Accessing the first video URL
        const title = data.data.title || "Video";  // Using a default title if not provided

        // Sending the video as a message
        zk.sendMessage(dest, { 
            video: { url: videoUrl }, 
            caption: `╰►𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐕𝐢𝐝𝐞𝐨: ${title}\n𝐃𝐨𝐰𝐧𝐥𝐨𝐚𝐝𝐞𝐝 𝐛𝐲 *𝐅𝐋𝐀𝐒𝐇-𝐌𝐃*`, 
            gifPlayback: false 
        }, { quoted: ms })
        .catch((err) => repondre("Error sending the video."));

    } catch (e) {
        return repondre("A fatal error has occurred...\n" + e);
    }
});*/


/*king({ nomCom: "media", categorie: "Download" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let input = arg.join(' ');

    if (!arg[0]) {
        repondre('Give me any social media video link!');
        return;
    }

    try {
        const load = await axios.get(`https://noobs-apis.onrender.com/dipto/alldl?url=${input}`);
        const data = load.data;
        let final = data.result;

        let fileExtension = final.includes('.jpg') ? 'jpg' : 'mp4';
        const mediaResponse = await axios.get(final, { responseType: 'arraybuffer' });
        const mediaPath = `./downloaded_media.${fileExtension}`;
        await writeFile(mediaPath, mediaResponse.data);

        const messageOptions = {
            caption: "Media downloaded by flash md",
            gifPlayback: false
        };

        if (fileExtension === 'mp4') {
            messageOptions.video = { url: mediaPath };
        } else if (fileExtension === 'jpg') {
            messageOptions.image = { url: mediaPath };
        }

        await zk.sendMessage(dest, messageOptions, { quoted: ms });

    } catch (e) {
        repondre("A fatal error has occurred...\n" + e);
    }
});

*/

/*


king({ nomCom: "twitter", categorie: "Download" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let linkz = arg.join(' ');

    if (!arg[0]) {
        repondre('Please insert a *TWITTER or X Video Link* for *FLASH-MD* to download ');
        return;
    }


try {
    
        const blue = await fetch(`https://gifted-apis-third-30b2fdbb9819.herokuapp.com/api/download/twitter?url=${linkz}&apikey=giftedtechk`);
        const data = await blue.json();

        if (data && data.url) {
            const medi = data.url;
           
                zk.sendMessage(dest, { video: { url: medi }, caption: "Here is your Twitter Video.\n_╰►IMAGE DOWNLOADED BY_ *FLASH-MD*", gifPlayback: false }, { quoted: ms });

}
           
        } catch (e) { repondre("I am unable to download your media. \n " + e)}
       
            
        
    
});

*/

/*king({nomCom : "tiktok" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions;

let linkx = arg.join(' ')

  if (!arg[0]) { repondre('Please insert a Tik Tok video link');return};


const green = await fetch(`https://api.vihangayt.com/downloader/tiktok2?url=${linkx}`);
    const data = await green.json();

try {

if (data && data.result && data.result.url && data.result.url.nowm) {

const nowm = data.result.url.nowm;

zk.sendMessage(dest, { video: { url: nowm }, caption: "Here is your Tiktok Video.\n _Downloaded by_ *FLASH-MD*", gifPlayback: false }, { quoted: ms });
}


} catch (e) {repondre("I am unable to download the file. \n " + e)}



}); 

*/

king({nomCom : "mediafire" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('Provide mediafire link\n\nmediafire <valid mediafire link>');return}; 

  try {
     
    
        const fileInfo = await mediafireDl(link);

if (fileInfo[0].size.split('MB')[0] >= 100) {
            repondre('File tooooo big');
        }

await zk.sendMessage(
            dest,
            {
                document: {
                    url: fileInfo[0].link,
                },
                fileName: fileInfo[0].nama,
                mimetype: fileInfo[0].mime,
                caption: `*Downloaded by FLASH-MD:* ${fileInfo[0].nama}`,  
            },
            { quoted: ms }
        );

    
  
  } catch (e) {repondre("I am unable to download the file. \n " + e)}
  
});

king({
  nomCom: "fb",
  categorie: "Download",
  reaction: "📽️",
  aliases: ["fbdl", "facebook", "fb1"] // Adding aliases
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
    getFBInfo(queryURL)
      .then((result) => {
        let caption = `
        *Title:* ${result.title}

        *Direct Link:* ${result.url}
      `;
        zk.sendMessage(dest, { image: { url: result.thumbnail }, caption: caption }, { quoted: ms });
        zk.sendMessage(dest, { video: { url: result.hd }, caption: '_╰►FB VIDEO DOWNLOADED BY_ *FLASH-MD*' }, { quoted: ms });
      })
      .catch((error) => {
        console.log("Error:", error);
        repondre('try fb2 on this link');
      });
  } catch (error) {
    console.error('An error occurred while *FLASH-MD* was downloading your media:', error);
    repondre('An error occurred while downloading your media.', error);
  }
}); 



/*
king({ nomCom: "tik", categorie: "Download", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`how to use this command:\n ${prefixe}tiktok tiktok_video_link`);
    return;
  }

  const videoUrl = arg.join(" ");

 let data = await axios.get('https://api.vihangayt.com/downloader/tiktok2?url='+ videoUrl) ;

  let tik = data.data.data

      // Envoi du message avec le thumbnail de la vidéo
      const caption = `
Author: ${tik.author}
Description: ${tik.desc}
      `;

         
      zk.sendMessage(dest, { video: { url: tik.links[0].a} , caption : caption },{quoted : ms});    

  
});*/

king({
  nomCom: "fb2",
  categorie: "Download",
  reaction: "📽️",
  aliases: ["fbdl2", "fb2", "facebook2"] // Adding aliases
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
    getFBInfo(queryURL)
      .then((result) => {
        let caption = `
        *Title:* ${result.title}

        *Direct Link:* ${result.url}
      `;
        zk.sendMessage(dest, { image: { url: result.thumbnail }, caption: caption }, { quoted: ms });
        zk.sendMessage(dest, { video: { url: result.sd }, caption: '_╰►FACEBOOK VIDEO DOWNLOADED BY_ *FLASH-MD*' }, { quoted: ms });
      })
      .catch((error) => {
        console.log("Error:", error);
        repondre(error);
      });
  } catch (error) {
    console.error('An error occurred while Flash-Md was downloading your media:', error);
    repondre('An error occurred while Flash-Md was downloading your media.', error);
  }
});

/*

king({
  nomCom: "facebook",
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }
    const queryURL = arg.join(" ");

  try {
     AllDL(queryURL)
    .then((result) => {
       let caption = `
        *Title:* ${result.title}

        
        *Direct Link:* ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.hd  }, caption: 'facebook video downloader\n powered by *FLASH-MD*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre('try fbdl2 on this link')});


   
  } catch (error) {
    console.error('An error occurred while *FLASH-MD* was downloading your media:', error);
    repondre('An error occurred while downloading your media.' , error);
  }
});*/


/*
king({
  nomCom: "xvid", 
  categorie: "Download",
  aliases: ["xxx", "porn", "xxxnx"] // Adding aliases
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let linkz = arg.join(' ');

    if (!arg[0]) {
        repondre('Please insert an *X Video Link* for *FLASH-MD* to download');
        return;
    }

    try {
        const blue = await fetch(`https://api.prabath-md.tech/api/xvdl?url=${linkz}`);
        const data = await blue.json();

        if (data && data.data && data.data.download) {
            const medi = data.data.download;
            zk.sendMessage(dest, { 
                video: { url: medi }, 
                caption: "Here is your 18+ Video.\n_╰►DOWNLOADED BY_ *FLASH-MD*", 
                gifPlayback: false 
            }, { quoted: ms });
        }
    } catch (e) {
        repondre("I am unable to download your media.\n" + e);
    }
}); 

*/
    

king({
  nomCom: "xvid", 
  categorie: "Download",
  aliases: ["xxx", "porn", "xxxnx"] // Adding aliases
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let linkz = arg.join(' ');

    // URL mapping dictionary
    const urlMap = {
        "xvid": "https://example.com/xvid",
        "porn": "https://example.com/porn",
        "xxxnx": "https://example.com/xxxnx"
    };

    // Check if the input matches any of the keys in the dictionary
    if (urlMap[linkz]) {
        linkz = urlMap[linkz]; // Map word to URL
    }

    if (!arg[0]) {
        repondre('Please insert an *X Video Link* for *FLASH-MD* to download');
        return;
    }

    try {
        const response = await fetch(`https://api.prabath-md.tech/api/xvdl?url=${encodeURIComponent(linkz)}`);
        const data = await response.json();

        if (data && data.data && data.data.download) {
            const medi = data.data.download;
            zk.sendMessage(dest, { 
                video: { url: medi }, 
                caption: "Here is your 18+ Video.\n_╰►DOWNLOADED BY_ *FLASH-MD*", 
                gifPlayback: false 
            }, { quoted: ms });
        } else {
            repondre("No downloadable link found for the provided URL.");
        }
    } catch (e) {
        repondre("I am unable to download your media.\n" + e.message);
    }
});


king({
  nomCom: "gdrive",
  categorie: "Download"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const input = arg.join(' ');

  if (!input) {
    return repondre('Please insert a Google Drive link!');
  }

  if (!input.includes('drive.google.com')) {
    return repondre('That is not a Google Drive link!');
  }

  try {
    const response = await fetch(`https://api-smd.onrender.com/api/gdrive?url=${input}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    
    const data = await response.json();
    
    await repondre('*FLASH-MD* is downloading media from Google Drive. Please wait...');

    if (data && data.downloadUrl) {
      const downloadUrl = data.downloadUrl;
      const mimeType = data.mimetype.split('/')[0];

      if (mimeType === 'audio' || mimeType === 'video' || mimeType === 'image') {
        // Handle audio, video, and image media types
        await zk.sendMessage(origineMessage, { [mimeType]: { url: downloadUrl }, caption: `*${data.fileName}*\n\n> *POWERED BY FLASH-MD*` }, { quoted: ms });
      } else {
        // Handle other media types
        const fileType = data.fileName.split('.').pop();
        await zk.sendMessage(origineMessage, { document: { url: downloadUrl, filename: data.fileName }, caption: `${fileType.toUpperCase()}: *${data.fileName}*\n\n> *POWERED BY FLASH-MD*` }, { quoted: ms });
      }
    } else {
      await repondre("Failed to retrieve the media. Please try again later.");
    }
  } catch (error) {
    console.error('Error fetching media:', error);
    await repondre("Failed to retrieve the media. Please try again later.");
  }
});


//This one hiyaaaaaaa
/*
king({
  nomCom: "insta", 
  categorie: "Download",
  aliases: ["ig", "igdl", "instagram"] // Adding aliases
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    // Join all arguments to form the link
    let link = arg.join(' ');

    // Check if a link was provided
    if (!arg[0]) {
        repondre('Please insert an Instagram video link');
        return;
    }

    try {
        // Fetch data from the API
        const response = await axios.get(`https://api.maher-zubair.tech/download/alldownload?url=${encodeURIComponent(link)}`);
        const result = response.data.result;

        if (result && result.medias && result.medias.length > 0) {
            for (const media of result.medias) {
                const { url, extension } = media;
                const caption = "> *POWERED BY FLASH-MD*";

                if (extension === 'mp4') {
                    await zk.sendMessage(dest, { video: { url }, caption }, ms);
                } else if (['jpg', 'jpeg', 'png'].includes(extension)) {
                    await zk.sendMessage(dest, { image: { url }, caption }, ms);
                } else {
                    console.error('Unsupported media type:', extension);
                    repondre('Unsupported media type.');
                }
            }
        } else {
            throw new Error("No media found in the response data");
        }
    } catch (error) {
        console.error("An error occurred while downloading:", error);
        repondre('An error occurred while downloading the media. Please try again later.');
    }
}); */

/* king({ nomCom: "pair", categorie: "Pairing" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let number = arg.join(' ');

    if (!arg[0]) return repondre('Please insert a number to pair!');

    try {
        const apiUrl = `https://flash-md-z6lm.onrender.com/pair?number=${encodeURIComponent(number)}`;
        const response = await axios.get(apiUrl);
        const result = response.data;

        if (result && result.code) {
            const getsess = result.code;
            const answer = `Dear*,\nYour Gifted-Md PairingCode is: *${getsess}*\nUse it to Link Your WhatsApp Within 1 Minute Before it Expires\nThereafter, Obtain Your Creds.json Deployment File.\nHappy Bot Deployment!!!`;

            const codeMatch = answer.match(/```([\s\S]*?)```/);

            let buttons = [];
            if (codeMatch) {
                const code = codeMatch[1];
                buttons.push({
                    name: "cta_copy",
                    buttonParamsJson: JSON.stringify({
                        display_text: "📋 ᴄᴏᴘʏ ʏᴏᴜʀ ᴄᴏᴅᴇ",
                        id: "copy_code",
                        copy_code: getsess
                    })
                });
            }

            buttons.push({
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "ᴍᴀɪɴ ᴍᴇɴᴜ",
                    id: ".menu"
                })
            },
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "📋 ᴄᴏᴘʏ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ",
                    id: "copy_code",
                    copy_code: getsess
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "sʜᴏᴡ 💜 ғᴏʀ ɢɪғᴛᴇᴅ",
                    url: `https://whatsapp.com/channel/0029VaYauR9ISTkHTj4xvi1l`
                })
            });

            let msg = generateWAMessageFromContent(dest, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: answer
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "> *©𝟐𝟎𝟐𝟒 𝐆𝐈𝐅𝐓𝐄𝐃 𝐌𝐃 𝐕𝟓*"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: "",
                                subtitle: "",
                                hasMediaAttachment: false
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: buttons
                            })
                        })
                    }
                }
            }, {});

            await zk.sendMessage(dest, msg.message, {
                messageId: msg.key.id
            });

            await repondre('✅');
        } else {
            throw new Error('Invalid response from Gifted API.');
        }
    } catch (error) {
        console.error('Error getting Gifted API response:', error.message, error.response ? error.response.data : null);
        await repondre('Error getting response from Gifted API.');
        await zk.sendMessage(dest, { text: '❌' }, { quoted: ms });
    }
}); */

/*king({
  nomCom: "fetch",
  categorie: "Search",
  aliases: ["check", "try"] // Adding aliases
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let url = arg.join(' ');

    if (!/^https?:\/\//.test(url)) return repondre('Start the *URL* with http:// or https://');

    try {
        const _url = new URL(url);
        const formattedUrl = `${_url.origin}${_url.pathname}?${_url.searchParams.toString()}`;
        const res = await fetch(formattedUrl);

        const contentLength = res.headers.get('content-length');
        if (contentLength && contentLength > 100 * 1024 * 1024) { // 100 MB limit
            return repondre(`Content-Length exceeds the limit: ${contentLength}`);
        }

        const contentType = res.headers.get('content-type');
        if (!/text|json/.test(contentType)) {
            await zk.sendMessage(dest, { text: '> > *POWERED BY FLASH-MD*', file: { url: formattedUrl } }, { quoted: ms });
            return;
        }

        let content = Buffer.from(await res.arrayBuffer());

        try {
            console.log('Parsed JSON:', JSON.parse(content));
            content = JSON.stringify(JSON.parse(content));
        } catch (e) {
            console.error('Error parsing JSON:', e);
            content = content.toString();
        } finally {
            repondre(content.slice(0, 65536));
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        repondre('Error fetching data.');
    }
}); */


king({
  nomCom: "element",
  categorie: "User",
  aliases: ["chem", "study"] // Adding aliases
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let element = arg.join(' ');

    if (!element) return repondre('Please specify an element name or symbol.');

    try {
        const apiUrl = `https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(element)}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (result && !result.error) {
            const elementInfo = `
                Element Name: ${result.name}\n
                Element Symbol: ${result.symbol}\n
                Atomic Number: ${result.atomic_number}\n
                Atomic Mass: ${result.atomic_mass}\n
                Period: ${result.period}\n
                Phase: ${result.phase}\n
                Discovered By: ${result.discovered_by}
            `.trim();

            // Send the element information
            await repondre("A moment, FLASH-MD is sending your results");

            // Send the image with element information as caption if available
            if (result.image) {
                await zk.sendMessage(dest, { image: { url: result.image }, caption: elementInfo }, { quoted: ms });
            }
        } else {
            repondre('Element not found or error fetching data.');
        }
    } catch (error) {
        console.error('Error fetching element data:', error.message);
        repondre('Error fetching element data.');
    }
});

king({
    nomCom: "npm",
categorie: "Search",
aliases: ["npmstalk", "npstalk", "pmstalk"] // Adding aliases
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    const query = arg.join(' ');

    if (!query) {
        return repondre('Please provide a package name to search for.');
    }

    try {
        const apiUrl = `https://api.prabath-md.tech/api/npmsearch?q=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);
        const result = response.data;

        if (result && result.data && result.data.data) {
            const {
                name,
                description,
                version,
                packageLink: plink,
                downloadLink: dlink,
                publishedDate: pub,
                owner,
                homepage,
                license,
                readme,
            } = result.data.data;

            // Construct the response message
            const messageText = `*FLASH-MD NPM STALKER*:\n\n`
                              + `*Name:* ${name}\n*Owner:* ${owner}\n*Version:* ${version}\n`
                              + `*Published:* ${pub}\n*Description:* ${description}\n`
                              + `*Package Link:* ${plink}\n*Download Link:* ${dlink}\n`
                              + `*Homepage:* ${homepage}\n*License:* ${license}\n`
                              + `*Readme:* ${readme || 'N/A'}\n\n> POWERED BY © FRANCE KING`;

            await zk.sendMessage(dest, { text: messageText }, { quoted: ms });
        } else {
            throw new Error('Invalid response from the API.');
        }
    } catch (error) {
        console.error('Error getting API response:', error.message);
        await repondre('Error getting response from the API.');
    }
});
king({ nomCom: "image-dl", categorie: "Download" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let input = arg.join(' ');

    if (!input) {
        repondre('Give me any social media image link!');
        return;
    }

    try {
        const load = await fetch(`https://www.noobs-api.000.pe/dipto/alldl?url=${input}`);
        
        if (!load.ok) {
            repondre(`Failed to fetch image: ${load.statusText}`);
            return;
        }

        const contentType = load.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            repondre("Received non-JSON response from the server.");
            return;
        }

        const data = await load.json();
        const final = data.result;

        if (!final) {
            repondre("Failed to retrieve the image link. Please check the provided URL.");
            return;
        }

        zk.sendMessage(dest, { image: { url: final }, caption: "_╰►IMAGE DOWNLOADED BY_ *FLASH-MD*", gifPlayback: false }, { quoted: ms });
    } catch (e) {
        repondre("A fatal error has occurred... \n" + e.message);
    }
});

king({
  nomCom: "fetch",
  categorie: "Search",
  aliases: ["check", "try"] // Adding aliases
}, 
async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    let url = arg.join(' ');

    if (!/^https?:\/\//.test(url)) return repondre('Start the *URL* with http:// or https://');

    try {
        const _url = new URL(url);
        const formattedUrl = `${_url.origin}${_url.pathname}?${_url.searchParams.toString()}`;
        const res = await fetch(formattedUrl);

        if (!res.ok) {
            return repondre(`Failed to fetch the URL. Status: ${res.status} ${res.statusText}`);
        }

        const contentLength = res.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > 100 * 1024 * 1024) { // 100 MB limit
            return repondre(`Content-Length exceeds the limit: ${contentLength}`);
        }

        const contentType = res.headers.get('content-type');
        console.log('Content-Type:', contentType); // For debugging

        if (/image\/.*/.test(contentType)) {
            // If content is an image, send it as a file
            await zk.sendMessage(dest, { image: { url: formattedUrl }, caption: '> > *POWERED BY FLASH-MD*' }, { quoted: ms });
            return;
        } else if (/video\/.*/.test(contentType)) {
            // If content is a video, send it as a file
            await zk.sendMessage(dest, { video: { url: formattedUrl }, caption: '> > *POWERED BY FLASH-MD*' }, { quoted: ms });
            return;
        } else if (/text|json/.test(contentType)) {
            // Handle text or JSON content
            let content = Buffer.from(await res.arrayBuffer());

            try {
                const parsedJson = JSON.parse(content);
                console.log('Parsed JSON:', parsedJson);
                content = JSON.stringify(parsedJson, null, 2); // Pretty print JSON
            } catch (e) {
                console.error('Error parsing JSON:', e);
                content = content.toString(); // If not JSON, convert buffer to string
            } finally {
                repondre(content.slice(0, 65536)); // Limit response to first 65536 characters
            }
        } else {
            // Handle other types as generic files
            await zk.sendMessage(dest, { document: { url: formattedUrl }, caption: '> > *POWERED BY FLASH-MD*' }, { quoted: ms });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        repondre(`Error fetching data: ${error.message}`);
    }
});
king({ nomCom: "blackpink", aliases: ["bpink"], categorie: "Download" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;
    
    // Check if there are any arguments, though for this command it might not be necessary
    if (arg[0]) {
        repondre("This command doesn't require any arguments. Just type the command to get 5 random Blackpink images!");
        return;
    }

    try {
        // Fetch the Blackpink image URLs from the text file
        const response = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/blekping.txt');
        const textData = await response.text();

        // Split the text data into an array of URLs
        const imageUrls = textData.split('\n');
        
        // Filter out any empty URLs (e.g., due to extra newline characters)
        const filteredUrls = imageUrls.filter(url => url.trim() !== '');

        if (filteredUrls.length < 5) {
            repondre("There aren't enough images available at the moment. Please try again later.");
            return;
        }

        // Randomly select 5 unique image URLs
        const selectedImages = [];
        while (selectedImages.length < 5) {
            const randomImage = filteredUrls[Math.floor(Math.random() * filteredUrls.length)];
            if (!selectedImages.includes(randomImage)) {
                selectedImages.push(randomImage);
            }
        }

        // Notify the user that images are being sent
        await zk.sendMessage(dest, { text: "FLASH-MD is sending you 5 BLACKPINK IMAGES" }, { quoted: ms });

        // Send the 5 images
        for (const imageUrl of selectedImages) {
            await zk.sendMessage(dest, {
                image: { url: imageUrl }, 
                caption: "_╰►DOWNLOADED BY_ *FLASH-MD*"
            }, { quoted: ms });
        }

        // Notify the user that the images have been successfully sent
        await zk.sendMessage(dest, { text: "SUCCESSFULLY SENT THE 5 IMAGES ✅" }, { quoted: ms });

    } catch (e) {
        // Handle any errors that occur
        repondre("A fatal error has occurred... \n " + e.message);
    }
});




king({
  nomCom: "twitter",
    aliases: ["xdl"],  
  categorie: "SocialMedia",
  reaction: "🐦"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;
  const apiUrl = 'https://api.guruapi.tech/xdown?url=';

  // Ensure arg is a string by joining it if it's an array
  const url = extractUrlFromMessage(arg);

  if (!url) {
    return repondre('Please provide a valid Twitter URL.');
  }

  try {
    // Fetch the Twitter data from the API
    const response = await fetch(apiUrl + encodeURIComponent(url));
    const data = await response.json();

    // Validate the API response
    if (!data || !data.media || data.media.length === 0) {
      return repondre('No media found or invalid response from API.');
    }

    // Iterate through the media array and send each file
    for (const mediaData of data.media) {
      const mediaType = mediaData.type;
      const mediaURL = mediaData.url;

      // Set the appropriate caption based on the media type
      const cap = mediaType === 'video'
        ? '_╰►VIDEO  DOWNLOADED BY_ *FLASH-MD*'
        : '_╰►IMAGE DOWNLOADED BY_ *FLASH-MD*';

      if (mediaType === 'video') {
        await zk.sendMessage(origineMessage, { video: { url: mediaURL }, caption: cap }, { quoted: ms });
      } else if (mediaType === 'image') {
        await zk.sendMessage(origineMessage, { image: { url: mediaURL }, caption: cap }, { quoted: ms });
      }
    }

  } catch (error) {
    console.error('Error occurred while retrieving data:', error);
    repondre(`Error occurred while retrieving data: ${error.message}`);
  }
});

// Utility function to extract URL from the command arguments
function extractUrlFromMessage(arg) {
  // Ensure arg is a string (it might be an array, so join it if needed)
  const argString = Array.isArray(arg) ? arg.join(' ') : arg;

  // Match the URL starting with http or https and containing x.com (formerly twitter.com)
  const urlMatch = argString.match(/https:\/\/(x|twitter)\.com\/[^\s]+/);
  return urlMatch ? urlMatch[0] : null;
}
