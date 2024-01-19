const yts =  require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');


/* fonction pour avoir les données d'une recherche*/

async function getytlink(key) {
  try {
    const resultat = await yts(key);
    const videos = resultat.videos;
    const choix = videos[0];
    return {
        lien : choix.url ,
       affiche : choix.thumbnail,
      titre : choix.title,
      duree : choix.timestamp,
      id : choix.videoId,
    }  ;
  } catch (erreur) {
    console.error('Erreur lors de la recherche YouTube :', erreur);
    return null;
  }
}

module.exports = getytlink;

/* fonction pour télécharger les videos avec ytdl-core*/





async function ytdwn(url) {
  const info = await ytdl.getInfo(url);
  const format = ytdl.chooseFormat(info.formats, { quality: '18' });
  const video = ytdl.downloadFromInfo(info, format)

    return  video ;
  
}

module.exports = ytdwn;


