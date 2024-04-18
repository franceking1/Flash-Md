

/** 

🇫‌🇱‌🇦‌🇸‌🇭‌-🇲‌🇩‌ 

  𝗖𝗼𝗽𝘆𝗿𝗶𝗴𝗵𝘁 (𝗖) 2024.
 𝗟𝗶𝗰𝗲𝗻𝘀𝗲𝗱 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲  𝗠𝗜𝗧 𝗟𝗶𝗰𝗲𝗻𝘀𝗲;
 𝗬𝗼𝘂 𝗺𝗮𝘆 𝗻𝗼𝘁 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗳𝗶𝗹𝗲 𝗲𝘅𝗰𝗲𝗽𝘁 𝗶𝗻 𝗰𝗼𝗺𝗽𝗹𝗶𝗮𝗻𝗰𝗲 𝘄𝗶𝘁𝗵 𝘁𝗵𝗲 𝗟𝗶𝗰𝗲𝗻𝘀𝗲.
 𝗜𝘁 𝗶𝘀 𝘀𝘂𝗽𝗽𝗹𝗶𝗲𝗱 𝗶𝗻 𝘁𝗵𝗲 𝗵𝗼𝗽𝗲 𝘁𝗵𝗮𝘁 𝗶𝘁 𝗺𝗮𝘆 𝗯𝗲 𝘂𝘀𝗲𝗳𝘂𝗹.
 * @𝗽𝗿𝗼𝗷𝗲𝗰𝘁_𝗻𝗮𝗺𝗲 : 𝗙𝗹𝗮𝘀𝗵 𝗠𝗗, 𝗮 𝘀𝗶𝗺𝗽𝗹𝗲 𝗮𝗻𝗱 𝗲𝗮𝘀𝘆 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝘂𝘀𝗲𝗿 𝗯𝗼𝘁 
 * @𝗼𝘄𝗻𝗲𝗿: 𝗙𝗿𝗮𝗻𝗰𝗲 𝗞𝗶𝗻𝗴 
 
 **/






const {france} = require('../framework/france');
const fs = require("fs");
const { exec } = require("child_process");


const filename = `${Math.random().toString(36)}`;

france (
    {
        nomCom : 'deep',
        categorie : 'Audio-Edit',

    }, async (dest , zk, commandeOptions) => {
        const {ms , repondre,msgRepondu} = commandeOptions;

        if (msgRepondu) {
            if(msgRepondu.audioMessage) {

                const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage)

                let set = "-af atempo=4/4,asetrate=44500*2/3";
                let ran = `${filename}.mp3`;
            
                try {
                  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) return repondre("error during the procedure " + err );
                   
                    let buff1 = fs.readFileSync(ran);
                   
                    zk.sendMessage(
                      dest,
                      { audio: buff1, mimetype: "audio/mpeg" },
                      { quoted: ms }
                    );
                    fs.unlinkSync(ran);
                  });
                } catch (e) {
                 
                  repondre("error");
                }

            } else {
                repondre('the command only works with audio messages')
            }

        } else {
            repondre('Please mention an audio')
        }
    }
);

france (
    {
        nomCom : 'bass',
        categorie : 'Audio-Edit',

    }, async (dest , zk, commandeOptions) => {
        const {ms , repondre,msgRepondu} = commandeOptions;

        if (msgRepondu) {
            if(msgRepondu.audioMessage) {

                const media2 = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage)

                let set2 = "-af equalizer=f=18:width_type=o:width=2:g=14";
                let ran2 = `${filename}.mp3`;
            
                try {
                  exec(`ffmpeg -i ${media2} ${set2} ${ran2}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media2);
                    if (err) return repondre("error during the procedure " + err );
                   
                    let buff2 = fs.readFileSync(ran2);
                   
                    zk.sendMessage(
                      dest,
                      { audio: buff2, mimetype: "audio/mpeg" },
                      { quoted: ms }
                    );
                    fs.unlinkSync(ran2);
                  });
                } catch (e) {
                 
                  repondre("error");
                }

            } else {
                repondre('the command only works with audio messages')
            }

        } else {
            repondre('Please mention an audio')
        }
    }
);

france(
    {
      nomCom: 'reverse',
      categorie: 'Audio-Edit',
    },
    async (dest, zk, commandeOptions) => {
      const { ms, repondre, msgRepondu } = commandeOptions;
  
      if (msgRepondu) {
        if (msgRepondu.audioMessage) {
          const media3 = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
          let set3 = '-filter_complex "areverse"';
          let ran3 = `${filename}.mp3`;
  
          try {
            exec(`ffmpeg -i ${media3} ${set3} ${ran3}`, (err, stderr, stdout) => {
              fs.unlinkSync(media3);
              if (err) return repondre("error during the procedure" + err);
  
              let buff3 = fs.readFileSync(ran3);
  
              zk.sendMessage(dest, { audio: buff3, mimetype: "audio/mpeg" }, { quoted: ms });
              fs.unlinkSync(ran3);
            });
          } catch (e) {
            repondre("Error : " + e);
          }
        } else {
          repondre("The command only works with audio messages");
        }
      } else {
        repondre("Please mention an audio");
      }
    }
  );
  
  france(
    {
      nomCom: 'slow',
      categorie: 'Audio-Edit',
    },
    async (dest, zk, commandeOptions) => {
      const { ms, repondre, msgRepondu } = commandeOptions;
  
      if (msgRepondu) {
        if (msgRepondu.audioMessage) {
          const media5 = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
          let set5 = '-filter:a "atempo=0.8,asetrate=44100"';
          let ran5 = `${filename}.mp3`;
  
          try {
            exec(`ffmpeg -i ${media5} ${set5} ${ran5}`, (err, stderr, stdout) => {
              fs.unlinkSync(media5);
              if (err) return repondre("error during the procedure" + err);
  
              let buff5 = fs.readFileSync(ran5);
  
              zk.sendMessage(dest, { audio: buff5, mimetype: "audio/mpeg" }, { quoted: ms });
              fs.unlinkSync(ran5);
            });
          } catch (e) {
            repondre("Error : " + e);
          }
        } else {
          repondre("The command only works with audio messages");
        }
      } else {
        repondre("Please mention an audio");
      }
    }
  );

// Cas pour l'effet "smooth"
france(
    {
      nomCom: 'smooth',
      categorie: 'Audio-Edit',
    },
    async (dest, zk, commandeOptions) => {
      const { ms, repondre, msgRepondu } = commandeOptions;
  
      if (msgRepondu) {
        if (msgRepondu.audioMessage) {
          const mediaSmooth = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
          let setSmooth = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
          let ranSmooth = `${filename}.mp3`;
  
          try {
            exec(`ffmpeg -i ${mediaSmooth} ${setSmooth} ${ranSmooth}`, (err, stderr, stdout) => {
              fs.unlinkSync(mediaSmooth);
              if (err) return repondre("error during the procedure" + err);
  
              let buff6 = fs.readFileSync(ranSmooth);
  
              zk.sendMessage(dest, { audio: buff6, mimetype: "audio/mpeg" }, { quoted: ms });
              fs.unlinkSync(ranSmooth);
            });
          } catch (e) {
            repondre("Error : " + e);
          }
        } else {
          repondre("The command only works with audio messages");
        }
      } else {
        repondre("Please mention an audio");
      }
    }
  );
  
  // Cas pour l'effet "tempo"
  france(
    {
      nomCom: 'tempo',
      categorie: 'Audio-Edit',
    },
    async (dest, zk, commandeOptions) => {
      const { ms, repondre, msgRepondu } = commandeOptions;
  
      if (msgRepondu) {
        if (msgRepondu.audioMessage) {
          const mediaTempo = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
          let setTempo = '-filter:a "atempo=0.9,asetrate=65100"';
          let ranTempo = `${filename}.mp3`;
  
          try {
            exec(`ffmpeg -i ${mediaTempo} ${setTempo} ${ranTempo}`, (err, stderr, stdout) => {
              fs.unlinkSync(mediaTempo);
              if (err) return repondre("error during the procedure " + err);
  
              let buff7 = fs.readFileSync(ranTempo);
  
              zk.sendMessage(dest, { audio: buff7, mimetype: "audio/mpeg" }, { quoted: ms });
              fs.unlinkSync(ranTempo);
            });
          } catch (e) {
            repondre("Error : " + e);
          }
        } else {
          repondre("The command only works with audio messages");
        }
      } else {
        repondre("Please mention an audio");
      }
    }
  );
  
  // Cas pour l'effet "nightcore"
  france(
    {
      nomCom: 'nightcore',
      categorie: 'Audio-Edit',
    },
    async (dest, zk, commandeOptions) => {
      const { ms, repondre, msgRepondu } = commandeOptions;
  
      if (msgRepondu) {
        if (msgRepondu.audioMessage) {
          const mediaNightcore = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
          let setNightcore = '-filter:a "atempo=1.07,asetrate=44100*1.20"';
          let ranNightcore = `${filename}.mp3`;
  
          try {
            exec(`ffmpeg -i ${mediaNightcore} ${setNightcore} ${ranNightcore}`, (err, stderr, stdout) => {
              fs.unlinkSync(mediaNightcore);
              if (err) return repondre("error during the procedure " + err);
  
              let buff8 = fs.readFileSync(ranNightcore);
  
              zk.sendMessage(dest, { audio: buff8, mimetype: "audio/mpeg" }, { quoted: ms });
              fs.unlinkSync(ranNightcore);
            });
          } catch (e) {
            repondre("Erreur : " + e);
          }
        } else {
          repondre("The command only works with audio messages");
        }
      } else {
        repondre("Please mention an audio");
      }
    }
  );
  
