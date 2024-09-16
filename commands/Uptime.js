const { king } = require("../france/king");
const moment = require("moment-timezone");
const { getBuffer } = require("../france/dl/Function");
const { default: axios } = require('axios');
const speed = require("performance-now");

/*
const runtime = function (seconds) { 
 seconds = Number(seconds); 
 var d = Math.floor(seconds / (3600 * 24)); 
 var h = Math.floor((seconds % (3600 * 24)) / 3600); 
 var m = Math.floor((seconds % 3600) / 60); 
 var s = Math.floor(seconds % 60); 
 var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
 var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
 var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
 var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
 return dDisplay + hDisplay + mDisplay + sDisplay; 
 } */


let timestamp = speed();

king({
    nomCom: 'ping',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '⚙️',
    fromMe: 'true',
},
async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

    // Update timestamp and flashspeed each time the command is executed
    const currentTimestamp = speed();
    const flashspeed = (currentTimestamp - timestamp).toFixed(0);

    // The message to be typed out
    let message = `*FLASH-MD SPEED!!*\n*_${flashspeed} ms_* `;
    let typingMessage = '';

    // Simulate the typing effect in one final message
    for (let i = 0; i < message.length; i++) {
        typingMessage += message[i];
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay between each character (100ms)
    }

    // After the typing effect, send the full message at once
    await repondre(typingMessage);

    // Update the timestamp to the current time after calculating speed
    timestamp = currentTimestamp;
});

/*// SENDING MANY 

let timestamp = speed();

king({
    nomCom: 'ping',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '⚙️',
    fromMe: 'true',
},
async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

    // Update timestamp and flashspeed each time the command is executed
    const currentTimestamp = speed();
    const flashspeed = (currentTimestamp - timestamp).toFixed(0);

    // The message to be typed out
    let message = `*FLASH-MD SPEED!!*\n*_${flashspeed} ms_* `;
    let typingMessage = '';

    // Send each character as if it's being typed
    for (let i = 0; i < message.length; i++) {
        typingMessage += message[i];
        await repondre(typingMessage); // Send the message incrementally
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay between each character (100ms)
    }

    // Update the timestamp to the current time after calculating speed
    timestamp = currentTimestamp;

    // Optionally, you could send a final confirmation message after the typing effect
    await repondre(`${typingMessage}`);
});*/

//SEEEEEEM
 /*let timestamp = speed();

king({
    nomCom: 'ping',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '⚙️',
    fromMe: 'true',
},
async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

    // Update timestamp and flashspeed each time the command is executed
    const currentTimestamp = speed();
    const flashspeed = (currentTimestamp - timestamp).toFixed(0);

    // The message to be typed out
    let message = `*FLASH-MD SPEED!!*\n*_${flashspeed} ms_* `;
    let typingMessage = '';

    // Send the initial placeholder message
    const initialResponse = await repondre(''); // Placeholder or initial message

    // Simulate typing by progressively updating the message
    for (let i = 0; i < message.length; i++) {
        typingMessage += message[i];
        // Since message editing isn't available, send an updated message as a new message
        await repondre(typingMessage); // You might need to delete the previous message if possible
        await new Promise(resolve => setTimeout(resolve, 100)); // Delay between each character
    }
    
    // Update the timestamp to the current time after calculating speed
    timestamp = currentTimestamp;

    // Optionally, send a final confirmation message
    await repondre(`${typingMessage}\n*Success:* The ping originated from the server.`);
});
 
*/
king({
  nomCom: 'ss',
  desc: 'screenshots website',
  Categorie: 'General',
  reaction: '🎥',
  fromMe: 'true',
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre("Provide a link...");
  }

  const linkk = arg.join(' ');

  const linkkk = `https://www.noobs-api.000.pe/dipto/ss?url=${encodeURIComponent(linkk)}&dimension=720x720`;

  try {
    // Assuming getBuffer is a function that fetches and returns the image buffer
    let res = await getBuffer(linkkk);
    let caption = '*FLASH-MD WEB SCREENSHOT*';

    await zk.sendMessage(dest, { image: res, caption: caption, quoted: ms });
  } catch (error) {
    console.error('An error occurred:', error);
    await repondre('An error occurred while fetching the screenshot.');
  }
});
 /*
const { king } = require("../france/king");
const moment = require("moment-timezone");
const { getBuffer } = require("../france/dl/Function");
const { default: axios } = require('axios');
const speed = require("performance-now");
*/
// Track bot's start time
let botStartTime = Date.now(); 

const runtime = function (seconds) { 
 seconds = Number(seconds); 
 var d = Math.floor(seconds / (3600 * 24)); 
 var h = Math.floor((seconds % (3600 * 24)) / 3600); 
 var m = Math.floor((seconds % 3600) / 60); 
 var s = Math.floor(seconds % 60); 
 var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
 var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
 var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
 var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
 return dDisplay + hDisplay + mDisplay + sDisplay; 
}

king({
  nomCom: 'uptime',
  aliases: ["runtime"], 
  desc: 'To check runtime',
  Categorie: 'General',
  reaction: '⚙️',
  fromMe: 'true',
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage } = commandeOptions;

  // Calculate the custom uptime
  let currentTime = Date.now();
  let uptimeMilliseconds = currentTime - botStartTime;
  let uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
  const formattedUptime = runtime(uptimeSeconds);

  // Create the message to be sent
  const message = `*_Uptime of FLASH-MD: ${formattedUptime}_*`;

  // Send the message with contextInfo
  await zk.sendMessage(dest, {
    text: message,
    contextInfo: {
      mentionedJid: [auteurMessage],
      externalAdReply: {
        sourceUrl: 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P',
        mediaType: 1,
      }
    }
  });
});

/*// Restart command
king({
  nomCom: "restart",
  categorie: "HEROKU"
}, async (dest, zk, commandeOptions) => {
    const { repondre, superUser } = commandeOptions;

    if (!superUser) {
        repondre('Only the bot creator or bot owner can use this command!');
        return;
    }

    try {
        const Heroku = require("heroku-client");
        const heroku = new Heroku({
            token: s.HEROKU_API_KEY,
        });

        let baseURI = "/apps/" + s.HEROKU_APP_NAME;

        // Restart all dynos to trigger a full restart
        await heroku.delete(baseURI + "/dynos");

        // Reset the bot uptime when restarting
        botStartTime = Date.now();

        repondre('The bot is restarting. Please wait a moment...');

    } catch (e) {
        repondre('Error while restarting the bot: ' + e.message);
    }
});*/



/*

king({
  nomCom: "uptime",
 aliases: ["runtime"], 
  desc: 'To check runtime',
  Categorie: 'General',
  reaction: '⚙️',
  fromMe: 'true',
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre, auteurMessage } = commandeOptions;

  // Calculate uptime and format it
  const uptime = runtime(process.uptime()); // Ensure `runtime` function is defined

  // Create the message to be sent
  const message = `*_Uptime of FLASH-MD: ${uptime}_*`;

  // Send the message with contextInfo
  await zk.sendMessage(dest, {
    text: message,
    contextInfo: {
      mentionedJid: [auteurMessage],
      externalAdReply: {
        sourceUrl: 'https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P',
        mediaType: 1,
      }
    }
  });
});*/


// WORKING 
/*
let timestamp = speed();

king({
    nomCom: 'ping',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '⚙️',
    fromMe: 'true',
},
async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

    // Update timestamp and flashspeed each time the command is executed
    const currentTimestamp = speed();
    const flashspeed = (currentTimestamp - timestamp).toFixed(0);

    await repondre(`*FLASH-MD SPEED!!*\n*_${flashspeed} ms_* `);
    
    // Update the timestamp to the current time after calculating speed
    timestamp = currentTimestamp;

    // Sending the edited message after the initial response
   // await repondre(`*Success:* The ping originated from sever.`);
});*/
