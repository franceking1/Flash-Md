const { king } = require("../france/king");
const acrcloud = require("acrcloud");
const yts = require('yt-search');
//const fetch = require('node-fetch');
//const ytdl = require('france-king');
const fs = require('fs');
const Yt =require("../france/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
/*
king({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ")
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
       let infoMess = {
          image: {url : videos[0]. thumbnail},
         caption : `*FLASH-MD SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${videos[0].title}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct Link:* ${videos[0].url}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`
       }

      

      

      
       zk.sendMessage(origineMessage,infoMess,{quoted:ms}) ;
      // Obtenir le flux audio de la vidéo
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Nom du fichier local pour sauvegarder le fichier audio
      const filename = 'audio.mp3';

      // Écrire le flux audio dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier audio en utilisant l'URL du fichier local
      

     zk.sendMessage(origineMessage, { audio: { url:"audio.mp3"},mimetype:'audio/mp4' }, { quoted: ms,ptt: false });
        console.log("Sending audio file completed !");

     
      });

      fileStream.on('error', (error) => {
        console.error('Error Occurred while writing audio file :', error);
        repondre('An error occurred while writing the audio file.');
      });
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error while searching or downloading video :', error);
    
    repondre('An error occurred while searching or downloading the video.');
  }
});

  

king({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("insert video name");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `*FLASH-MD VIDEO DOWNLOADER*\n
╭───────────────◆
│⿻ *Title:* ${Element.title}
│⿻ *Duration:* ${Element.timestamp}
│⿻ *Viewers:* ${Element.views}
│⿻ *Uploaded:* ${Element.ago}
│⿻ *Author:* ${Element.author.name}
╰────────────────◆
⦿ *Direct Link:* ${Element.url}

╭───────────────◆
│ *_Powered by ©France King._*
╰────────────────◆ `
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Obtenir les informations de la vidéo à partir du lien YouTube
      const videoInfo = await ytdl.getInfo(Element.url);
      // Format vidéo avec la meilleure qualité disponible
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      // Télécharger la vidéo
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      // Nom du fichier local pour sauvegarder la vidéo
      const filename = 'video.mp4';

      // Écrire le flux vidéo dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier vidéo en utilisant l'URL du fichier local
        zk.sendMessage(origineMessage, { video: { url :"./video.mp4"} , caption:
          "╭───────────────◆\n│ *FLASH-MD DOWNLOADER*\n╰────────────────◆", gifPlayback: false }, { quoted: ms });
      });


      fileStream.on('error', (error) => {
        console.error('Error while writing video file :', error);
        repondre('An error occurred while writing the video file.');
      });
    } else {
      repondre('No video found');
    }
  } catch (error) {
    console.error('Error searching or downloading video :', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});
*/

king({
  nomCom: "mygroups",
  categorie: "User",
  reaction: "💿"
}, async (senn, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
let getGroupzs = await zk.groupFetchAllParticipating();
            let groupzs = Object.entries(getGroupzs)
                .slice(0)
                .map((entry) => entry[1]);
            let anaa = groupzs.map((v) => v.id);
            let jackhuh = `*GROUPS AM IN*\n\n`
            repondre(`You are Currently in ${anaa.length} groups, Flash MD will send that list in a moment. . .`)
            for (let i of anaa) {
                let metadat = await zk.groupMetadata(i);
               
                jackhuh += `*GROUP NAME:*- ${metadat.subject}\n`
                jackhuh += `*MEMBERS:*- ${metadat.participants.length}\n`
                jackhuh += `*GROUP ID:*- ${i}\n\n`

            }
          await repondre(jackhuh)

}
);

/*


king({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Insert a song name!");
    return;
  }

  try {
    let topo = arg.join(" ")
  
    const {
                videos
            } = await yts1(topo);
            if (!videos || videos.length <= 0) {
                repondre(`No Matching videos found for : *${args[0]}*!!`)
                return;
            }


let urlYt = videos[0].url
            let infoYt = await ytdl.getInfo(urlYt);


            const getRandonm = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };

let titleYt = infoYt.videoDetails.title;
            let randomName = getRandonm(".mp3");
            const stream = ytdl(urlYt, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            console.log("Audio downloading ->", urlYt);

            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
           
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            console.log("Audio downloaded ! \n Size: " + fileSizeInMegabytes);


await zk.sendMessage(
                    origineMessage, {
                        document: fs.readFileSync(`./${randomName}`),
                        mimetype: "audio/mpeg",
                        fileName: titleYt + ".mp3",
                    }, {
                        quoted: ms
                    }
                );

            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            repondre(e.toString())
        }

       
});



king({
  nomCom: "shazam",
  categorie: "Search",
  reaction: "👨🏿‍💻"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!msgRepondu) {
    return repondre('Make sure to mention the media.');
  }

  // Define mime type (you may need to adjust this based on your setup)
  let mime = msgRepondu.mimetype || '';

  if (!/video|audio/.test(mime)) {
    return repondre("Tag a short video or audio for the bot to analyse.");
  }

  try {
    let acr = new acrcloud({
      host: 'identify-ap-southeast-1.acrcloud.com',
      access_key: '26afd4eec96b0f5e5ab16a7e6e05ab37',
      access_secret: 'wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8'
    });

    let buffer = await msgRepondu.download();

    let { status, metadata } = await acr.identify(buffer);
    if (status.code !== 0) {
      return repondre(status.msg);
    }

    let { title, artists, album, genres, release_date } = metadata.music[0];
    let txt = `Title: ${title}${artists ? `\nArtists: ${artists.map(v => v.name).join(', ')}` : ''}`;
    txt += `${album ? `\nAlbum: ${album.name}` : ''}${genres ? `\nGenres: ${genres.map(v => v.name).join(', ')}` : ''}\n`;
    txt += `Release Date: ${release_date}`;
    repondre(txt.trim());

    const { videos } = await yts(txt.trim());
    if (!videos || videos.length <= 0) {
      return repondre("Song not found");
    }

    let urlYt = videos[0].url;
    let infoYt = await ytdl.getInfo(urlYt);
    let getRandomName = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

    let titleYt = infoYt.videoDetails.title;
    let randomName = getRandomName(".mp3");
    const stream = ytdl(urlYt, {
      filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
    }).pipe(fs.createWriteStream(`./${randomName}`));

    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });

    await zk.sendMessage(
      origineMessage, {
        document: fs.readFileSync(`./${randomName}`),
        mimetype: "audio/mpeg",
        fileName: `${titleYt}.mp3`,
      }, {
        quoted: ms
      }
    );
  } catch (error) {
    console.error('Error processing the media:', error.message);
    repondre('An error occurred while processing the media.');
  }
});


king({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    return repondre("Insert a song name!");
  }

  try {
    const topo = arg.join(" ");

    const { videos } = await yts1(topo);
    if (!videos || videos.length <= 0) {
      return repondre(`No matching videos found for: *${topo}*!!`);
    }

    const urlYt = videos[0].url;
    const infoYt = await ytdl.getInfo(urlYt);

    const getRandomName = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

    const titleYt = infoYt.videoDetails.title;
    const views = infoYt.videoDetails.viewCount || 'Unknown Views';
    const duration = infoYt.videoDetails.lengthSeconds || 0; // Duration in seconds
    const artistYt = infoYt.videoDetails.author.name || 'Unknown Artist';
    const uploadYear = infoYt.videoDetails.uploadDate.split('-')[0] || 'Unknown Year';
    const directLink = urlYt;

    // Format duration as MM:SS
    const formattedDuration = `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;

    // Send song details first
    const songDetails = `*FLASH-MD SONG PLAYER*
╭───────────────◆
│⿻ *Title:* ${titleYt}
│⿻ *Artist:* ${artistYt}
│⿻ *Views:* ${views}
│⿻ *Duration:* ${formattedDuration}
│⿻ *Year:* ${uploadYear}
╰────────────────◆
⦿ *Direct Link:* ${directLink}

╭───────────────◆
│ *_Powered by ©France King._*
╰────────────────◆`;

    await zk.sendMessage(origineMessage, { text: songDetails }, { quoted: ms });

    const randomName = getRandomName(".mp3");
    const stream = ytdl(urlYt, {
      filter: (info) => info.audioBitrate === 160 || info.audioBitrate === 128,
    }).pipe(fs.createWriteStream(`./${randomName}`));

    console.log("Audio downloading ->", urlYt);

    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });

    const stats = fs.statSync(`./${randomName}`);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    console.log("Audio downloaded! \n Size: " + fileSizeInMegabytes.toFixed(2) + " MB");

    // Send the audio file
    await zk.sendMessage(
      origineMessage, {
        document: fs.readFileSync(`./${randomName}`),
        mimetype: "audio/mpeg",
        fileName: titleYt + ".mp3",
      }, {
        quoted: ms
      }
    );

    fs.unlinkSync(`./${randomName}`);
  } catch (e) {
    return repondre(`Error: ${e.toString()}`);
  }
});*/



king({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a video name after the command.");
    return;
  }

  const topo = arg.join(" ");
  try {
    repondre(`A moment, *Flash-Md* is Processing from API Servers...`);
    let videoUrl = topo;
    let videos = [];
    let fileInfo = {};

    // Check if the provided text is a valid YouTube URL
    const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const isUrl = urlPattern.test(topo);

    if (!isUrl) {
      // Perform YouTube search to get the video URL
      const search = await yts(topo);
      videos = search.videos;

      if (videos && videos.length > 0) {
        videoUrl = videos[0].url;
      } else {
        repondre('No videos found.');
        return;
      }
    }

    // **Key Change 1:** Use the correct API endpoint for video downloads (e.g., ytmp4)
    const apiResponse = await fetch(`https://gifted-apis-third-30b2fdbb9819.herokuapp.com/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=giftedtechk`);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
      const videoDownloadUrl = apiResult.result.download_url;

      // **Key Change 2:** Use arrayBuffer() and convert to Buffer
      const videoResponse = await fetch(videoDownloadUrl);
      const videoArrayBuffer = await videoResponse.arrayBuffer();
      const videoBuffer = Buffer.from(videoArrayBuffer);

      fileInfo = {
        title: apiResult.result.title,
        quality: apiResult.result.type
      };

      // **Key Change 3:** Handle cases where videos[0] might not exist
      let duration = "Unknown";
      let viewers = "Unknown";
      let uploaded = "Unknown";
      let artist = "Unknown";

      if (!isUrl && videos[0]) {
        duration = videos[0].timestamp || "Unknown";
        viewers = videos[0].views || "Unknown";
        uploaded = videos[0].ago || "Unknown";
        artist = videos[0].author?.name || "Unknown";
      } else {
        // If available, extract additional info from apiResult.result
        duration = apiResult.result.duration || duration;
        viewers = apiResult.result.views || viewers;
        uploaded = apiResult.result.uploaded || uploaded;
        artist = apiResult.result.author || artist;
      }

      let infoMess = {
        image: { url: isUrl ? 'https://telegra.ph/file/c11e8cf9456d1c6e17e53.jpg' : (videos[0]?.thumbnail || 'https://telegra.ph/file/c11e8cf9456d1c6e17e53.jpg')) },
        caption: `*𝐅𝐋𝐀𝐒𝐇-𝐌𝐃 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑*\n
╭───────────────◆
│⿻ *Title:* ${fileInfo.title}
│⿻ *Quality:* ${fileInfo.quality}
│⿻ *Duration:* ${duration}
│⿻ *Viewers:* ${viewers}
│⿻ *Uploaded:* ${uploaded}
│⿻ *Artist:* ${artist}
╰────────────────◆
⦿ *Direct Link:* ${videoUrl}

╭────────────────◆
│ *POWERED BY FLASH-MD*
╰─────────────────◆`
      };

      // **Key Change 4:** Await the sendMessage calls and ensure proper payload structure
      await zk.sendMessage(origineMessage, infoMess, { quoted: ms });

      // Send the normal video file with additional caption and metadata
      await zk.sendMessage(origineMessage, {
        video: videoBuffer,
        mimetype: 'video/mp4',
        caption: `NORMAL VIDEO FORMAT\n\n> *FLASH-MD*`,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: false,
            title: fileInfo.title,
            body: 'Powered by France King',
            thumbnailUrl: 'https://telegra.ph/file/c11e8cf9456d1c6e17e53.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P',
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }, { quoted: ms });

      // Send the document video file with additional caption and metadata
      await zk.sendMessage(origineMessage, {
        document: videoBuffer,
        mimetype: 'video/mp4',
        fileName: `${fileInfo.title}.mp4`,
        caption: `DOCUMENT VIDEO FORMAT\n\n> *FLASH-MD*`,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: false,
            title: fileInfo.title,
            body: 'Powered by France King',
            thumbnailUrl: 'https://telegra.ph/file/c11e8cf9456d1c6e17e53.jpg',
            sourceUrl: 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P',
            mediaType: 1,
            renderLargerThumbnail: false
          }
        }
      }, { quoted: ms });

      console.log("Sending video file completed!");

      repondre('Download Success...');
    } else {
      repondre('Failed to download video. Please try again later.');
    }
  } catch (error) {
    console.error('Error from Flash-MD API:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});


    

king({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre("Please insert a song name!");
  }

  try {
    const query = arg.join(" ");
    const searchResults = await yts(query);
    const video = searchResults.videos[0];

    if (!video) {
      return repondre(`No matching videos found for: *${query}*`);
    }

    const videoUrl = video.url;
    const apiUrl = `https://gifted-apis-third-30b2fdbb9819.herokuapp.com/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=giftedtechk`;
    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
      const audioUrl = apiResult.result.download_url;
      const audioResponse = await fetch(audioUrl);
      const audioBuffer = await audioResponse.buffer();

      const fileInfo = {
        title: apiResult.result.title || video.title,
        quality: apiResult.result.type || 'Unknown'
      };

      const songDetails = `*FLASH-MD SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${fileInfo.title}
│⿻ *Quality:* ${fileInfo.quality}
│⿻ *Duration:* ${video.timestamp}
│⿻ *Views:* ${video.views}
│⿻ *Uploaded:* ${video.ago}
│⿻ *Artist:* ${video.author.name}
╰────────────────◆
⦿ *Direct Link:* ${audioUrl}

╭───────────────◆
│ *_Powered by ©France King._*
╰────────────────◆`;

      // Send the song details text
      await zk.sendMessage(origineMessage, { text: songDetails }, { quoted: ms });

      // Send the audio file
      await zk.sendMessage(
        origineMessage, 
        { 
          document: audioBuffer, 
          mimetype: 'audio/mpeg', 
          fileName: `${fileInfo.title}.mp3` 
        }, 
        { quoted: ms }
      );

      console.log("Sending audio file completed!");
      repondre('Download Success...');
    } else {
      repondre('Failed to download audio. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
    repondre('An error occurred while searching or downloading the song.');
  }
});

