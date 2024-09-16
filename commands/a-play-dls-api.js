const { king } = require("../france/king");
const yts = require('yt-search');
const BaseUrl = 'https://gifted-apis-third-30b2fdbb9819.herokuapp.com';
const giftedapikey = 'gifteddevskk';
/*const { ytdown } = require("nayan-media-downloader");

//Nkkkttt
king({
  nomCom: "sing",
  categorie: "Search",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    const songName = arg.join(" ");
    const search = await yts(songName);
    const video = search.videos[0];

    if (video) {
      const videoUrl = video.url;
      const response = await ytdown(videoUrl);

      if (response && response.status && response.data) {
        const { title, author, published, picture, video: videoDownloadUrl } = response.data;
        const infoMess = {
          image: { url: picture },
          caption: `*FLASH-MD SONG PLAYER*\n\n╭───────────────◆\n│⿻ *Title:* ${title}\n│⿻ *Author:* ${author}\n│⿻ *Published:* ${published}\n╰────────────────◆\n⦿ *Direct YtLink:* ${videoUrl}\n\n╭────────────────◆\n│ *_Powered by ©France King._*\n╰─────────────────◆`,
          contextInfo: {
            externalAdReply: {
              title: "FLASH-MD SONG PLAYER",
              body: "Powered by France King",
              thumbnailUrl: picture,
              sourceUrl: 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P',
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        };

        await zk.sendMessage(dest, infoMess, { quoted: ms });
        await zk.sendMessage(dest, {
          document: { url: videoDownloadUrl },
          mimetype: 'audio/mpeg',
          fileName: `${title}.mp3`
        }, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No video found for the given song name.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the audio.');
  }
});

*/

king({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch audio download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioDlUrl = apiResult.result.download_url;
        
        // Prepare the message with song details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*FLASH-MD SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a Buffer instead of URL
        await zk.sendMessage(dest, {
          audio: { url: audioDlUrl },
          mimetype: 'audio/mp4'
        }, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No audio found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the audio.');
  }
});/*

king({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch audio download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioDlUrl = apiResult.result.download_url;
        
        // Prepare the message with song details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*FLASH-MD SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a Buffer instead of URL
        await zk.sendMessage(dest, {
          document: { url: audioDlUrl },
          mimetype: 'audio/mpeg'
        }, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No audio found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the audio.');
  }
});
*/



//Working 
/*king({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch the video download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const videoDlUrl = apiResult.result.download_url;

        // Prepare the message with video details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*FLASH-MD VIDEO PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`
        };

        // Send video details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the video as a URL (direct download link)
        await zk.sendMessage(dest, {
          video: { url: videoDlUrl },
          mimetype: 'video/mp4'
        }, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download the video. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});
*/
king({
  nomCom: "videodoc",
  categorie: "Search",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch the video download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const videoDlUrl = apiResult.result.download_url;

        // Prepare the message with video details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*FLASH-MD VIDEO PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`
        };

        // Send video details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the video as a URL (direct download link)
        await zk.sendMessage(dest, {
          document: { url: videoDlUrl },
          mimetype: 'video/mp4'
        }, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download the video. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});
//working 
/*
king({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch audio download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioDlUrl = apiResult.result.download_url;
        const songTitle = apiResult.result.title;

        // Prepare the message with song details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*FLASH-MD SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${songTitle}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`,
          contextInfo: {
            externalAdReply: {
              title: "FLASH-MD SONG PLAYER",
              body: "Powered by France King",
              thumbnailUrl: videos[0].thumbnail,
              sourceUrl: 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P',
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a Buffer with the file name set to the song title
        await zk.sendMessage(dest, {
          document: { url: audioDlUrl },
          mimetype: 'audio/mpeg',
          fileName: `${songTitle}.mp3`
        }, { quoted: ms });

        // Optionally, send a playable audio link or a preview if needed
        // Ensure the link is valid and directly playable
        const audioPreviewMessage = {
          text: `Here is a preview of the song: ${songTitle}\nListen to it [here](${audioDlUrl}).`,
          contextInfo: {
            externalAdReply: {
              title: "Song Preview",
              body: "Enjoy the preview!",
              thumbnailUrl: videos[0].thumbnail,
              sourceUrl: audioDlUrl,
              mediaType: 2,
              renderLargerThumbnail: true
            }
          }
        };

        await zk.sendMessage(dest, audioPreviewMessage, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No audio found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the audio.');
  }
});
*/

//FUCK HII CODE KUBABAKE.. 💀 💔
/*
king({
  nomCom: "sing",
  categorie: "Search",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoTitle = videos[0].title;
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video title to fetch audio download URL
      const apiResponse = await fetch(`https://itzpire.com/download/play-youtube?title=${encodeURIComponent(videoTitle)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.code === 200 && apiResult.status === "success") {
        const audioDlUrl = apiResult.data.audio.url;
        const songTitle = apiResult.data.audio.title;
        const videoThumbnail = apiResult.data.audio.thumb;
        const videoChannel = apiResult.data.audio.channel;
        const videoPublished = apiResult.data.audio.published;
        const videoViews = apiResult.data.audio.views;

        // Prepare the message with song details
        const infoMess = {
          image: { url: videoThumbnail },
          caption: `*FLASH-MD SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${songTitle}
│⿻ *Quality:* High
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videoViews}
│⿻ *Uploaded:* ${videoPublished}
│⿻ *Artist:* ${videoChannel}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`,
          contextInfo: {
            externalAdReply: {
              title: "FLASH-MD SONG PLAYER",
              body: "Powered by France King",
              thumbnailUrl: videoThumbnail,
              sourceUrl: 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P',
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a Buffer with the file name set to the song title
        await zk.sendMessage(dest, {
          document: { url: audioDlUrl },
          mimetype: 'audio/mp4',
          fileName: `${songTitle}.mp3`
        }, { quoted: ms });

        // Optionally, send a playable audio link or a preview if needed
        // Ensure the link is valid and directly playable
        const audioPreviewMessage = {
          text: `Here is a preview of the song: ${songTitle}\nListen to it [here](${audioDlUrl}).`,
          contextInfo: {
            externalAdReply: {
              title: "Song Preview",
              body: "Enjoy the preview!",
              thumbnailUrl: videoThumbnail,
              sourceUrl: audioDlUrl,
              mediaType: 2,
              renderLargerThumbnail: true
            }
          }
        };

        await zk.sendMessage(dest, audioPreviewMessage, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No audio found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the audio.');
  }
});*/

king({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch the video download URL
      const apiResponse = await fetch(`https://api.junn4.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.result) {
        const videoData = apiResult.result;
        const videoDlUrl = videoData.media;

        // Prepare the message with video details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*FLASH-MD VIDEO PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${videoData.title}
│⿻ *Duration:* ${videoData.duration}
│⿻ *Viewers:* ${videoData.views}
│⿻ *Uploaded:* ${videoData.upload}
│⿻ *Artist:* ${videoData.channel}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`
        };

        // Send video details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the video as a URL (direct download link)
        await zk.sendMessage(dest, {
          video: { url: videoDlUrl },
          mimetype: 'video/mp4'
        }, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download the video. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});


king({
  nomCom: "song",
  categorie: "Search",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch the video download URL
      const apiResponse = await fetch(`https://api.junn4.my.id/download/ytmp3?url=${encodeURIComponent(videoUrl)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.result) {
        const videoData = apiResult.result;
        const videoDlUrl = videoData.media;
      //  const channelUrl = videoData.channel_url || videoData.channel; // Assuming channel_url exists in the API response

        // Prepare the message with video details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*FLASH-MD SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${videoData.title}
│⿻ *Duration:* ${videoData.duration}
│⿻ *Viewers:* ${videoData.views}
│⿻ *Uploaded:* ${videoData.upload}
│⿻ *Artist:* ${videoData.channel}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}

╭────────────────◆
│ *_Powered by ©France King._*
╰─────────────────◆`
        };

        // Send video details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the video as a URL (direct download link)
        await zk.sendMessage(dest, {
          document: { url: videoDlUrl },
          mimetype: 'audio/mpeg'
        }, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download the video. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});
