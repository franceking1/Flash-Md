const { exec } = require('child_process');

const { king } = require("../france/king")
//const { getGroupe } = require("../data/groupe")
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const {ajouterOuMettreAJourJid,mettreAJourAction,verifierEtatJid} = require("../data/antilien")
const {atbajouterOuMettreAJourJid,atbverifierEtatJid} = require("../data/antibot")
//const fs = require("fs");
const { search, download } = require("aptoide-scraper");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');
//const { uploadImageToImgur } = require('../france/imgur');
const {getBinaryNodeChild, getBinaryNodeChildren} = require('@whiskeysockets/baileys').default;


king({
  nomCom: "app", 
  aliases: ["apk", "application"], 
  reaction: "✨",
  categorie: "Download"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    const appName = arg.join(' ');
    if (!appName) {
      return repondre("*Enter the name of the application to search for*");
    }

    // Search for the app using Jun API
    const searchResponse = await axios.get(`https://api.junn4.my.id/search/playstore?query=${encodeURIComponent(appName)}`);
    const searchResult = searchResponse.data;

    if (searchResult.status !== 200 || !searchResult.result || searchResult.result.length === 0) {
      return repondre("*Can't find application, please enter another name*");
    }

    // Select the first app from the search results
    const appData = searchResult.result[0];

    // Prepare message with app details
    const captionText = `*🌠FLASH-MD APPLICATION🌠*\n\n` +
                        `*Name:* ${appData.nama}\n` +
                        `*Developer:* ${appData.developer}\n` +
                        `*Rating:* ${appData.rate}\n` +
                        `*Download Link:* ${appData.link}\n` +
                        `*Developer's Apps:* ${appData.link_dev}`;

    // Prepare and send the app details message with the image
    const infoMess = {
      image: { url: appData.img },  // Display the app image
      caption: captionText  // Caption with app details
    };

    // Send app details
    await zk.sendMessage(dest, infoMess, { quoted: ms });

    repondre('Application details and link to the Play Store have been sent.');
  } catch (error) {
    console.error('Error during apk command processing:', error.response ? error.response.data : error.message);
    repondre(`*Error during apk command processing: ${error.message}*`);
  }
});

king(
  { nomCom: "add", categorie: 'Group', reaction: "👨🏿‍💼" },
  async (dest, zk, commandeOptions) => {
    let { repondre, verifAdmin, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot, arg } = commandeOptions;

    // Verify if the command is for a group
    if (!verifGroupe) {
      return repondre("*This command works in groups only!*");
    }

    if (!superUser) {
      repondre("You are too weak to do that");
      return;
    };
    
    if (!verifAdmin) {
      repondre("You are not an admin here!");
      return;
    };

    // Fetch group metadata
    let metadata;
    try {
      metadata = await zk.groupMetadata(dest);
    } catch (error) {
      return repondre("Failed to fetch group metadata.");
    }

    let participants = metadata.participants;

    // Check if argument is provided
    if (!arg[0]) {
      return repondre("Provide number to be added. Example:\nadd 254722222222");
    }

    let num = arg.join(' ');
    const _participants = participants.map((user) => user.id);

    // Validate and format the phone numbers
    let usersToAdd = [];
    let usersAlreadyInGroup = [];
    try {
      const users = await Promise.all(
        num.split(',')
          .map((v) => v.replace(/[^0-9]/g, ''))
          .filter((v) => v.length > 4 && v.length < 20)
          .map(async (v) => [
            v,
            await zk.onWhatsApp(v + '@s.whatsapp.net'),
          ])
      );

      users.forEach(([v, wa]) => {
        const jid = v + '@s.whatsapp.net';
        if (_participants.includes(jid)) {
          usersAlreadyInGroup.push(jid);
        } else if (wa[0]?.exists) {
          usersToAdd.push(v + '@c.us');
        }
      });
    } catch (error) {
      return repondre("Error validating phone numbers.");
    }

    // Notify if users are already in the group
    for (const user of usersAlreadyInGroup) {
      repondre(`That user is already in this group!`);
    }

    // Add users to the group
    let response;
    try {
      if (usersToAdd.length > 0) {
        response = await zk.query({
          tag: 'iq',
          attrs: {
            type: 'set',
            xmlns: 'w:g2',
            to: dest,
          },
          content: usersToAdd.map((jid) => ({
            tag: 'add',
            attrs: {},
            content: [{ tag: 'participant', attrs: { jid } }],
          })),
        });

        // Notify that users have been added
        for (const user of usersToAdd) {
          repondre(`Successfully added @${user.split('@')[0]}`);
        }
      }
    } catch (error) {
      return repondre("Failed to add user to the group!");
    }

    // Fetch group profile picture
    let pp;
    try {
      pp = await zk.profilePictureUrl(dest, 'image').catch(() => "https://telegra.ph/file/39436fea9098ae0aeded3.jpg");
    } catch (error) {
      pp = "https://telegra.ph/file/39436fea9098ae0aeded3.jpg";
    }

    let jpegThumbnail = Buffer.alloc(0);

    if (pp) {
      try {
        const respons = await fetch(pp);
        if (respons.ok) {
          jpegThumbnail = await respons.buffer();
        } else {
          console.error('Failed to fetch profile picture:', respons.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    }

    const add = response?.content.find(item => item.tag === 'add');
    const participantsWithErrors = add?.content.filter(item => item.attrs.error == 403);

    let respon;
    try {
      respon = await zk.groupInviteCode(dest);
    } catch (error) {
      return repondre("Failed to generate group invite code.");
    }

    for (const user of participantsWithErrors || []) {
      const jid = user.attrs.jid;
      const content = user.content.find(child => child.tag === 'add_request');
      const invite_code = content.attrs.code;
      const invite_code_exp = content.attrs.expiration;

      const teza = `I cannot add @${jid.split('@')[0]} due to privacy settings, Let me send an invite link instead.`;
      await repondre(teza);

      let links = `You have been invited to join the group ${metadata.subject}:\n\nhttps://chat.whatsapp.com/${respon}\n\n*POWERED BY FLASH-MD 🤖*`;

      await zk.sendMessage(jid, { image: { url: pp }, caption: links }, { quoted: msgRepondu });
    }
  }
);



king({
  nomCom: "broadcast",
  aliases: ["bc", "cast"], // Adding aliases
  reaction: "📢",
  categorie: "General"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

  let msgbc = arg.join(' ');

  if (!arg[0]) {
    repondre('After the command *broadcast*, type your message to be sent to all groups you are in.');
    return;
  }

  if (!superUser) {
    repondre("You are too weak to do that");
    return;
  }

  let getGroups = await zk.groupFetchAllParticipating();
  let groups = Object.entries(getGroups)
    .slice(0)
    .map(entry => entry[1]);
  let res = groups.map(v => v.id);

  await repondre("*FLASH-MD is sending this message to all groups you are in*...");

  for (let i of res) {
    let txtbc = `*𝐅𝐋𝐀𝐒𝐇-𝐌𝐃 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓*\n\n🀄 Message: ${msgbc}\n\n🗣️ Author: ${nomAuteurMessage}`;

    await zk.sendMessage(i, {
      image: {
        url: "https://telegra.ph/file/ee2916cd24336231d8194.jpg"
      },
      caption: `${txtbc}`
    });
  }
});
 

/*king({ nomCom: "broadcast", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("This command works in groups only ❌"); return; }
	
	if (!arg) { repondre("Still testing  ❌"); return; }
	if (!verifAdmin) { repondre("You are not an admin here!"); return; };
	
 let getGroups = await zk.groupFetchAllParticipating() 
         let groups = Object.entries(getGroups) 
             .slice(0) 
             .map(entry => entry[1]) 
         let res = groups.map(v => v.id) 
         repondre(` Broadcasting in ${res.length} Group Chat, in ${res.length * 1.5} seconds`) 
         for (let i of res) { 
             let txt = `*FLASH-MD BROADCAST` 
             await zk.sendMessage(i, { 
                 image: { 
                     url: "https://telegra.ph/file/ee2916cd24336231d8194.jpg" 
                 }, 
                 caption: `${txt}` 
             }) 
         } 
         repondre(`Broadcasted to ${res.length} Groups.`) 
     } 
});*/

king({ nomCom: "disap-off", categorie: 'Group', reaction: "👻" }, async (dest, zk, commandeOptions) => {
const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

if (!verifGroupe) { repondre("This command works in groups only"); return; };

if (!verifAdmin) { repondre("You are not an admin here!"); return; };
await zk.groupToggleEphemeral(dest, 0*24*3600); 
 repondre('Dissapearing messages successfully turned off!'); 
 }
);

king({ nomCom: "disap", categorie: 'Group', reaction: "👻" }, async (dest, zk, commandeOptions) => {
const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

if (!verifGroupe) { repondre("This command works in groups only"); return; };

if (!verifAdmin) { repondre("You are not an admin here!"); return; };
 repondre('*Do you want to turn on disappearing messages?*\n\nIf yes type _*disap1* for messages to disappear after 1 day._\n_or *disap7* for messages to disappear after 7 days._\n_or *disap90* for messages to disappear after 90 days._\n\n To turn in off, type *disap-off*'); 
 }
);


king({ nomCom: "req", categorie: 'Group', reaction: "☑️ " }, async (dest, zk, commandeOptions) => {
const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

if (!verifGroupe) { repondre("This command works in groups only"); return; };

if (!verifAdmin) { repondre("You are not an admin here, what will you do if there are pending requests?!"); return; };

	const response = await zk.groupRequestParticipantsList(dest);

if (response.length === 0) return repondre("there are no pending join requests.");

let jids = ''; 

response.forEach((participant, index) => {
    jids +='+' + participant.jid.split('@')[0];
    if (index < response.length - 1) {
        jids += '\n'; 
    }
});

 zk.sendMessage(dest, { text:`Pending Participants:- 🕓\n${jids}\n\nUse the command approve or reject to approve or reject these join requests.`}); 

 repondre(jids); 

}
    );
  



king({ nomCom: "disap90", categorie: 'Group', reaction: "👻" }, async (dest, zk, commandeOptions) => {
const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

if (!verifGroupe) { repondre("This command works in groups only"); return; };

if (!verifAdmin) { repondre("You are not an admin here!"); return; };

await zk.groupToggleEphemeral(dest, 90*24*3600); 
 dest('Dissapearing messages successfully turned on for 90 days!'); 
}
);

king({
  nomCom: "reject",
  aliases: ["rejectall", "rej", "reject-all"], // Adding aliases
  categorie: 'Group',
  reaction: "👻"
}, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  const responseList = await zk.groupRequestParticipantsList(dest);

  if (responseList.length === 0) {
    return repondre("There are no pending join requests for this group.");
  }

  for (const participan of responseList) {
    const response = await zk.groupRequestParticipantsUpdate(
      dest,
      [participan.jid], // Reject each participant individually
      "reject"
    );
    console.log(response);
  }

  repondre("All pending join requests have been rejected.");
});
 

king({ nomCom: "disap7", categorie: 'Group', reaction: "👻" }, async (dest, zk, commandeOptions) => {
const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

if (!verifGroupe) { repondre("This command works in groups only"); return; };

if (!verifAdmin) { repondre("You are not an admin here!"); return; };

await zk.groupToggleEphemeral(dest, 7*24*3600); 
 dest('Dissapearing messages successfully turned on for 7 days!'); 
}
);

king({ nomCom: "disap1", categorie: 'Group', reaction: "👻" }, async (dest, zk, commandeOptions) => {
const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions

if (!verifGroupe) { repondre("This command works in groups only"); return; };

if (!verifAdmin) { repondre("You are not an admin here!"); return; };

await zk.groupToggleEphemeral(dest, 1*24*3600); 
 dest('Dissapearing messages successfully turned on for 24 hours'); 
}
);

king({
  nomCom: "approve",
  aliases: ["approve-all", "accept"], // Adding aliases
  categorie: 'Group',
  reaction: "☑️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin } = commandeOptions;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  const responseList = await zk.groupRequestParticipantsList(dest);

  if (responseList.length === 0) {
    return repondre("There are no pending join requests.");
  }

  for (const participan of responseList) {
    const response = await zk.groupRequestParticipantsUpdate(
      dest,
      [participan.jid], // Approve each participant individually
      "approve"
    );
    console.log(response);
  }

  repondre("All pending participants have been approved to join.");
});

/*
king({
  nomCom: "vcf",
  aliases: ["savecontact", "savecontacts"], // Adding aliases
  categorie: 'Group',
  reaction: "🎉"
}, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, ms } = commandeOptions;
  const fs = require('fs');

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  try {
    let metadat = await zk.groupMetadata(dest);
    const partic = await metadat.participants;

    let vcard = 'FMD';
    let noPort = 0;

    for (let a of partic) {
      vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:[${noPort++}] +${a.id.split("@")[0]}\nTEL;type=CELL;type=VOICE;waid=${a.id.split("@")[0]}:+${a.id.split("@")[0]}\nEND:VCARD\n`;
    }

    let cont = './contacts.vcf';

    await repondre(`A moment, *FLASH-MD* is compiling ${partic.length} contacts into a vcf...`);

    await fs.writeFileSync(cont, vcard.trim());

    await zk.sendMessage(dest, {
      document: fs.readFileSync(cont),
      mimetype: 'text/vcard',
      fileName: `${metadat.subject}.Vcf`,
      caption: `VCF for ${metadat.subject}\nTotal Contacts: ${partic.length}\n*KEEP USING FLASH-MD*`
    }, { ephemeralExpiration: 86400, quoted: ms });

    fs.unlinkSync(cont);
  } catch (error) {
    console.error("Error while creating or sending VCF:", error.message || error);
    repondre("An error occurred while creating or sending the VCF. Please try again.");
  }
});
 */
// Try update vcf 
king({
  nomCom: "vcf",
  aliases: ["savecontact", "savecontacts"], // Adding aliases
  categorie: 'Group',
  reaction: "🎉"
}, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, ms } = commandeOptions;
  const fs = require('fs');

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  try {
    let metadat = await zk.groupMetadata(dest);
    const partic = await metadat.participants;

    let vcard = '';
    let noPort = 0;

    for (let a of partic) {
      // Get the participant's phone number
      let phoneNumber = a.id.split("@")[0];

      // Use the participant's name or default to "[FMD] Phone Number" if no name is found
      let contactName = a.name || a.notify || `[FMD] +${phoneNumber}`;

      vcard += `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL;type=CELL;type=VOICE;waid=${phoneNumber}:+${phoneNumber}\nEND:VCARD\n`;
    }

    let cont = './contacts.vcf';

    await repondre(`A moment, *FLASH-MD* is compiling ${partic.length} contacts into a vcf...`);

    await fs.writeFileSync(cont, vcard.trim());

    await zk.sendMessage(dest, {
      document: fs.readFileSync(cont),
      mimetype: 'text/vcard',
      fileName: `${metadat.subject}.Vcf`,
      caption: `VCF for ${metadat.subject}\nTotal Contacts: ${partic.length}\n*KEEP USING FLASH-MD*`
    }, { ephemeralExpiration: 86400, quoted: ms });

    fs.unlinkSync(cont);
  } catch (error) {
    console.error("Error while creating or sending VCF:", error.message || error);
    repondre("An error occurred while creating or sending the VCF. Please try again.");
  }
});


       
king({ nomCom: "tagall", categorie: 'Group', reaction: "📣" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser } = commandeOptions


 

  if (!verifGroupe) { repondre("✋🏿 ✋🏿this command works in groups only ❌"); return; }
  if (!arg || arg === ' ') {
  mess = 'Aucun Message'
  } else {
    mess = arg.join(' ')
  } ;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  var tag = ""; 
  tag += `========================\n  
        🌟 *FLASH-MD* 🌟
========================\n
👥 Group : ${nomGroupe} 🚀 
👤 Author : *${nomAuteurMessage}* 👋 
📜 Message : *${mess}* 📝
========================\n
\n

` ;




  let emoji = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$','😟','🥵','🐅']
  let random = Math.floor(Math.random() * (emoji.length - 1))


  for (const membre of membresGroupe) {
    tag += `${emoji[random]}      @${membre.id.split("@")[0]}\n`
  }

 
 if (verifAdmin || superUser) {

  zk.sendMessage(dest, { text: tag, mentions: membresGroupe.map((i) => i.id) }, { quoted: ms })

   } else { repondre('command reserved for admins')}

});


king({
  nomCom: "invite",
  aliases: ["link"], // Adding alias
  categorie: 'Group',
  reaction: "🙋"
}, async (dest, zk, commandeOptions) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = commandeOptions;

  if (!verifGroupe) {
    repondre("*This command works in groups only!*");
    return;
  }

  try {
    const link = await zk.groupInviteCode(dest);
    const inviteLink = `https://chat.whatsapp.com/${link}`;

    const mess = `Hello ${nomAuteurMessage}, here is the group link of ${nomGroupe}:\n\nClick Here To Join: ${inviteLink}`;
    repondre(mess);
  } catch (error) {
    console.error("Error fetching group invite link:", error.message || error);
    repondre("An error occurred while fetching the group invite link. Please try again.");
  }
});


/*

king({ nomCom: "addd", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot, arg } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("For groups"); }


  let metadata = await zk.groupMetadata(dest) ;

      let participants = metadata.participants ;

if (!arg[0]) {
      repondre("Provide number to be added. Example:\nadd 25472222222222");
      return;
    }
  
    let num = arg.join(' ');

const _participants = participants.map((user) => user.id);

const users = (await Promise.all(
      num.split(',')
          .map((v) => v.replace(/[^0-9]/g, ''))
          .filter((v) => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
          .map(async (v) => [
            v,
            await zk.onWhatsApp(v + '@s.whatsapp.net'),
          ]),
  )).filter((v) => v[1][0]?.exists).map((v) => v[0] + '@c.us');


const response = await zk.query({
    tag: 'iq',
    attrs: {
      type: 'set',
      xmlns: 'w:g2',
      to: dest,
    },
    content: users.map((jid) => ({
      tag: 'add',
      attrs: {},
      content: [{tag: 'participant', attrs: {jid}}],
    })),
  });


const pp = await zk.profilePictureUrl(dest, 'image').catch((_) => "https://telegra.ph/file/39436fea9098ae0aeded3.jpg");
let jpegThumbnail = Buffer.alloc(0);

if (pp) {
  try {
    const respons = await fetch(pp);
    if (respons.ok) {
      jpegThumbnail = await respons.buffer();
    } else {
      console.error('Failed to fetch profile picture:', respons.statusText);
    }
  } catch (error) {
    console.error('Error fetching profile picture:', error);
  }
}



const add = getBinaryNodeChild(response, 'add');
  const participant = getBinaryNodeChildren(add, 'participant');

                 let respon = await zk.groupInviteCode(dest); 


for (const user of participant.filter((item) => item.attrs.error == 403)) {

const jid = user.attrs.jid;
    const content = getBinaryNodeChild(user, 'add_request');
    const invite_code = content.attrs.code;
    const invite_code_exp = content.attrs.expiration;

const teza = `I cannot add @${arg} due to privacy settings, sending an invite link instead.`;

await repondre(teza);


let links = `You have been invited to join the group ${zk.groupMetadata.subject}:\n\nhttps://chat.whatsapp.com/${respon}\n\nFLASH MD 🤖`

await zk.sendMessage(dest, { image: { url: pp}, caption: links}, { quoted: ms});

});*/



/** *nommer un membre comme admin */
king({ nomCom: "promote", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("For groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              var txt = `🎊🍾  @${auteurMsgRepondu.split("@")[0]} Has been promoted as a group Admin.`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            } else { return repondre("This member is already an administrator of the group.") }

          } else { return repondre("This user is not part of the group."); }
        }
        else { return repondre("Sorry, I cannot perform this action because I am not an administrator of the group.") }

      } else { repondre("please tag the member to be nominated"); }
    } else { return repondre("Sorry I cannot perform this action because you are not an administrator of the group.") }
  } catch (e) { repondre("oups " + e) }

})

//fin nommer
/** ***demettre */

king({ nomCom: "demote", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("For groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {

              repondre("This member is not a group administrator.")

            } else {
              var txt = `@${auteurMsgRepondu.split("@")[0]} was removed from his position as a group administrator\n`
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "demote");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })
            }

          } else { return repondre("This user is not part of the group."); }
        }
        else { return repondre("Sorry I cannot perform this action because I am not an administrator of the group.") }

      } else { repondre("please tag the member to be removed"); }
    } else { return repondre("Sorry I cannot perform this action because you are not an administrator of the group.") }
  } catch (e) { repondre("oups " + e) }

})



/** ***fin démettre****  **/
/** **retirer** */
king({ nomCom: "remove", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("for groups only"); }


  const verifMember = (user) => {

    for (const m of membresGroupe) {
      if (m.id !== user) {
        continue;
      }
      else { return true }
      //membre=//(m.id==auteurMsgRepondu? return true) :false;
    }
  }

  const memberAdmin = (membresGroupe) => {
    let admin = [];
    for (m of membresGroupe) {
      if (m.admin == null) continue;
      admin.push(m.id);

    }
    // else{admin= false;}
    return admin;
  }

  const a = verifGroupe ? memberAdmin(membresGroupe) : '';


  let admin = verifGroupe ? a.includes(auteurMsgRepondu) : false;
  let membre = verifMember(auteurMsgRepondu)
  let autAdmin = verifGroupe ? a.includes(auteurMessage) : false;
  zkad = verifGroupe ? a.includes(idBot) : false;
  try {
    // repondre(verifZokouAdmin)

    if (autAdmin || superUser) {
      if (msgRepondu) {
        if (zkad) {
          if (membre) {
            if (admin == false) {
              const gifLink = "https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif"
              var sticker = new Sticker(gifLink, {
                pack: 'FLASH-MD', // The pack name
                author: nomAuteurMessage, // The author name
                type: StickerTypes.FULL, // The sticker type
                categories: ['🤩', '🎉'], // The sticker category
                id: '12345', // The sticker id
                quality: 50, // The quality of the output file
                background: '#000000'
              });

              await sticker.toFile("st.webp")
              var txt = `@${auteurMsgRepondu.split("@")[0]} was removed from the group.\n`
            /*  zk.sendMessage(dest, { sticker: fs.readFileSync("st.webp") }, { quoted: ms.message.extendedTextMessage.contextInfo.stanzaId})*/
              await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
              zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] })

            } else { repondre("This member cannot be removed because he is an administrator of the group.") }

          } else { return repondre("This user is not part of the group."); }
        }
        else { return repondre("Sorry, I cannot perform this action because I am not an administrator of the group.") }

      } else { repondre("please tag the member to be removed"); }
    } else { return repondre("Sorry I cannot perform this action because you are not an administrator of the group .") }
  } catch (e) { repondre("oups " + e) }

})



/** ***fin démettre****  **
/** *****fin retirer */

/*king({ nomCom: "add", categorie: 'Group', reaction: "👨🏿‍💼" }, async (dest, zk, commandeOptions) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, nomAuteurMessage, auteurMessage, superUser, idBot } = commandeOptions;
  let membresGroupe = verifGroupe ? await infosGroupe.participants : ""
  if (!verifGroupe) { return repondre("for groups only");} 

  const participants = await message.groupMetadata(message.jid)
		const isImAdmin = await isAdmin(participants, message.client.user.jid)
		if (!isImAdmin) return await message.send(`_I'm not admin._`)
		match = match || message.reply_message.jid
		if (!match) return await message.send('Example : add 254757835036')
		// if (!match.startsWith('@@')) {
		// 	match = jidToNum(match)
		// 	const button = await genButtonMessage(
		// 		[
		// 			{ id: `@@`, text: 'NO' },
		// 			{ id: `add @@${match}`, text: 'YES' },
		// 		],
		// 		`Your Number maybe banned, Do you want add @${match}`,
		// 		''
		// 	)
		// 	return await message.send(
		// 		button,
		// 		{ contextInfo: { mentionedJid: [numToJid(match)] } },
		// 		'button'
		// 	)
		// }
		match = jidToNum(match)
		const res = await message.Add(match)
		if (res == '403') return await message.send('_Failed, Invite sent_')
		else if (res && res != '200')
			return await message.send(res, { quoted: message.data })

})
*/

king({ nomCom: "del", categorie: 'User', reaction: "🧹" }, async (dest, zk, commandeOptions) => {

  const { ms, repondre, verifGroupe, auteurMsgRepondu, idBot, msgRepondu, verifAdmin, superUser } = commandeOptions;
  
  if (!msgRepondu) {
    repondre("Please mention the message to delete.");
    return;
  }

  // Handle message deletion by bot
  if (superUser && auteurMsgRepondu === idBot) {
    if (auteurMsgRepondu === idBot) {
      const key = {
        remoteJid: dest,
        fromMe: true,
        id: ms.message.extendedTextMessage.contextInfo.stanzaId,
      };
      await zk.sendMessage(dest, { delete: key });
      return;
    }
  }

  // Handle message deletion in groups
  if (verifGroupe) {
    if (verifAdmin || superUser) {
      try {
        const key = {
          remoteJid: dest,
          id: ms.message.extendedTextMessage.contextInfo.stanzaId,
          fromMe: false,
          participant: ms.message.extendedTextMessage.contextInfo.participant,
        };
        await zk.sendMessage(dest, { delete: key });
        return;
      } catch (e) {
        repondre("I need admin rights.");
      }
    } else {
      repondre("Sorry, you are not an administrator of the group.");
    }
  }
});

/******fin retirer */



king({ nomCom: "info", categorie: 'Group' }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe } = commandeOptions;
  if (!verifGroupe) { repondre("order reserved for the group only"); return };

 try { ppgroup = await zk.profilePictureUrl(dest ,'image') ; } catch { ppgroup = conf.IMAGE_MENU}

    const info = await zk.groupMetadata(dest)

    /*console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc)*/


    let mess = {
      image: { url: ppgroup },
      caption:  `*━━━━『GROUP INFO』━━━━*\n\n*🎐Name:* ${info.subject}\n\n*🔩Group's ID:* ${dest}\n\n*🔍Desc:* \n\n${info.desc}`
    }


    zk.sendMessage(dest, mess, { quoted: ms })
  });



 //------------------------------------antilien-------------------------------

 king({ nomCom: "antilink", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*This Command works in Groups Only*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.") ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("the antilink is already activated for this group")
                    } else {
                  await ajouterOuMettreAJourJid(dest,"oui");
                
              repondre("the antilink is activated successfully") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await ajouterOuMettreAJourJid(dest , "non");

                repondre("The antilink has been successfully deactivated");
                
              } else {
                repondre("antilink is not activated for this group");
              }
            } else if (arg.join('').split("/")[0] === 'action') {
                            

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'remove' || action == 'warn' || action == 'delete' ) {

                await mettreAJourAction(dest,action);

                repondre(`The anti-link action has been updated to ${arg.join('').split("/")[1]}`);

              } else {
                  repondre("The only actions available are warn, remove, and delete") ;
              }
            

            } else repondre("antilink on to activate the anti-link feature\nantilink off to deactivate the anti-link feature\nantilink action/remove to directly remove the link without notice\nantilink action/warn to give warnings\nantilink action/delete to remove the link without any sanctions\n\nPlease note that by default, the anti-link feature is set to delete.")

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('You are not entitled to this order') ;
  }

});




 //------------------------------------antibot-------------------------------

 king({ nomCom: "antibot", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*for groups only*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await atbverifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre('antibot on to activate the anti-bot feature\nantibot off to deactivate the antibot feature\nantibot action/remove to directly remove the bot without notice\nantibot action/warn to give warnings\nantilink action/delete to remove the bot message without any sanctions\n\nPlease note that by default, the anti-bot feature is set to delete.') ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("the antibot is already activated for this group")
                    } else {
                  await atbajouterOuMettreAJourJid(dest,"oui");
                
              repondre("the antibot is successfully activated") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await atbajouterOuMettreAJourJid(dest , "non");

                repondre("The antibot has been successfully deactivated");
                
              } else {
                repondre("antibot is not activated for this group");
              }
            } else if (arg.join('').split("/")[0] === 'action') {

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'remove' || action == 'warn' || action == 'delete' ) {

                await mettreAJourAction(dest,action);

                repondre(`The anti-bot action has been updated to ${arg.join('').split("/")[1]}`);

              } else {
                  repondre("The only actions available are warn, remove, and delete") ;
              }
            

            } else {  
              repondre('antibot on to activate the anti-bot feature\nantibot off to deactivate the antibot feature\nantibot action/remove to directly remove the bot without notice\nantibot action/warn to give warnings\nantilink action/delete to remove the bot message without any sanctions\n\nPlease note that by default, the anti-bot feature is set to delete.') ;

                            }
    } catch (error) {
       repondre(error)
    }

  } else { repondre('You are not entitled to this order') ;

  }

});

//----------------------------------------------------------------------------

king({ nomCom: "group", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { repondre, verifGroupe, verifAdmin, superUser, arg } = commandeOptions;

  if (!verifGroupe) { repondre("order reserved for group only"); return };
  if (superUser || verifAdmin) {

    if (!arg[0]) { repondre('Instructions:\n\nType group open or close'); return; }
    const option = arg.join(' ')
    switch (option) {
      case "open":
        await zk.groupSettingUpdate(dest, 'not_announcement')
        repondre('Group opened successfully.\nNow Participants can send messages.')
        break;
      case "close":
        await zk.groupSettingUpdate(dest, 'announcement');
        repondre('Group closed successfully');
        break;
      default: repondre("Please don't invent an option")
    }

    
  } else {
    repondre("This command is for admins only!");
    return;
  }
 

});

/*king({ nomCom: "left", categorie: "Group" }, async (dest, zk, commandeOptions) => {

  const { repondre, verifGroupe, superUser } = commandeOptions;
  if (!verifGroupe) { repondre("order reserved for group only"); return };
  if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }
  await repondre('sayonnara') ;
   
  zk.groupLeave(dest)
});*/

king({ nomCom: "gname", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("order reserved for administrators of the group");
    return;
  };
  if (!arg[0]) {
    repondre("Please enter the group name");
    return;
  };
   const nom = arg.join(' ')
  await zk.groupUpdateSubject(dest, nom);
    repondre(`group name refresh: *${nom}*`)

 
}) ;

king({ nomCom: "gdesc", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { arg, repondre, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("order reserved for administrators of the group");
    return;
  };
  if (!arg[0]) {
    repondre("Please enter the group description");
    return;
  };
   const nom = arg.join(' ')
  await zk.groupUpdateDescription(dest, nom);
    repondre(`group description update: *${nom}*`)

 
}) ;

king({ nomCom: "revoke", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { arg, repondre, verifGroupe, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("for admins.");
    return;
  };

if(!verifGroupe)  { repondre('This command is only allowed in groups.')} ;
  
  await zk.groupRevokeInvite(dest)
  
    repondre(`group link revoked.`)

 
});


king({ nomCom: "gpp", categorie: 'Group' }, async (dest, zk, commandeOptions) => {

  const { repondre, msgRepondu, verifAdmin } = commandeOptions;

  if (!verifAdmin) {
    repondre("order reserved for administrators of the group");
    return;
  }; 
  if (msgRepondu.imageMessage) {
    const pp = await  zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;

    await zk.updateProfilePicture(dest, { url: pp })
                .then( () => {
                    zk.sendMessage(dest,{text:"Group pfp changed"})
                    fs.unlinkSync(pp)
                }).catch(() =>   zk.sendMessage(dest,{text:err})
)
        
  } else {
    repondre('Please mention an image')
  }

});

/////////////
king({nomCom:"hidetag",categorie:'Group',reaction:"🎤"},async(dest,zk,commandeOptions)=>{

  const {repondre,msgRepondu,verifGroupe,arg ,verifAdmin , superUser}=commandeOptions;

  if(!verifGroupe)  { repondre('This command is only allowed in groups.')} ;
  if (verifAdmin || superUser) { 

  let metadata = await zk.groupMetadata(dest) ;

  //console.log(metadata.participants)
 let tag = [] ;
  for (const participant of metadata.participants ) {

      tag.push(participant.id) ;
  }
  //console.log(tag)

    if(msgRepondu) {
      console.log(msgRepondu)
      let msg ;

      if (msgRepondu.imageMessage) {

        

     let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage) ;
     // console.log(msgRepondu) ;
     msg = {

       image : { url : media } ,
       caption : msgRepondu.imageMessage.caption,
       mentions :  tag
       
     }
    

      } else if (msgRepondu.videoMessage) {

        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage) ;

        msg = {

          video : { url : media } ,
          caption : msgRepondu.videoMessage.caption,
          mentions :  tag
          
        }

      } else if (msgRepondu.audioMessage) {
    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage) ;
       
        msg = {
   
          audio : { url : media } ,
          mimetype:'audio/mp4',
          mentions :  tag
           }     
        
      } else if (msgRepondu.stickerMessage) {

    
        let media  = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage)

        let stickerMess = new Sticker(media, {
          pack: 'FLASH-MD-tag',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
       
        msg = { sticker: stickerBuffer2 , mentions : tag}


      }  else {
          msg = {
             text : msgRepondu.conversation,
             mentions : tag
          }
      }

    zk.sendMessage(dest,msg)

    } else {

        if(!arg || !arg[0]) { repondre('Enter the text to announce or mention the message to announce');
        ; return} ;

      zk.sendMessage(
         dest,
         {
          text : arg.join(' ') ,
          mentions : tag
         }     
      )
    }

} else {
  repondre('Command reserved for administrators.')
}

});
/*


king({ nomCom: "apk", reaction: "✨", categorie: "Download" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    const appName = arg.join(' ');
    if (!appName) {
      return repondre("*Enter the name of the application to search for*");
    }

    const searchResults = await search(appName);

    if (searchResults.length === 0) {
      return repondre("*can't find application, please enter another name*");
    }

    const appData = await download(searchResults[0].id);
    const fileSize = parseInt(appData.size);

    if (fileSize > 300) {
      return repondre("The file exceeds 300 MB, unable to download.");
    }

    const downloadLink = appData.dllink;
    const captionText =
      "*🌠FLASH-MD APPLICATION🌠*\n\n*Name :* " + appData.name +
      "\n*Id :* " + appData["package"] +
      "\n*Last Update :* " + appData.lastup +
      "\n*Size :* " + appData.size +
      "\n";

    const apkFileName = (appData?.["name"] || "Downloader") + ".apk";
    const filePath = apkFileName;

    const response = await axios.get(downloadLink, { 'responseType': "stream" });
    const fileWriter = fs.createWriteStream(filePath);
    response.data.pipe(fileWriter);

    await new Promise((resolve, reject) => {
      fileWriter.on('finish', resolve);
      fileWriter.on("error", reject);
    });

    const documentMessage = {
      'document': fs.readFileSync(filePath),
      'mimetype': 'application/vnd.android.package-archive',
      'fileName': apkFileName
    };

    // Utilisation d'une seule méthode sendMessage pour envoyer l'image et le document
    zk.sendMessage(dest, { image: { url: appData.icon }, caption: captionText }, { quoted: ms });
    zk.sendMessage(dest, documentMessage, { quoted: ms });

    // Supprimer le fichier après envoi
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Erreur lors du traitement de la commande apk:', error);
    repondre("*Error during apk command processing*");
  }
});*/

/*king({ nomCom: "apk", reaction: "✨", categorie: "Download" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    const appName = arg.join(' ');
    if (!appName) {
      return repondre("*Enter the name of the application to search for*");
    }

    const searchResults = await search(appName);
    if (searchResults.length === 0) {
      return repondre("*Can't find application, please enter another name*");
    }

    const appData = await download(searchResults[0].id);
    const fileSize = parseInt(appData.size, 10);  // Added base 10 for parsing
    if (fileSize > 300) {
      return repondre("The file exceeds 300 MB, unable to download.");
    }

    const downloadLink = appData.dllink;
    const captionText = "*🌠FLASH-MD APPLICATION🌠*\n\n" +
                        `*Name :* ${appData.name}\n` +
                        `*Id :* ${appData["package"]}\n` +
                        `*Last Update :* ${appData.lastup}\n` +
                        `*Size :* ${appData.size}\n`;

    const apkFileName = `${appData.name || "Downloader"}.apk`;
    const filePath = apkFileName;

    try {
      const response = await axios.get(downloadLink, { responseType: "stream" });
      const fileWriter = fs.createWriteStream(filePath);

      response.data.pipe(fileWriter);

      await new Promise((resolve, reject) => {
        fileWriter.on('finish', resolve);
        fileWriter.on('error', (err) => {
          console.error('Error writing the file:', err);
          reject(err);
        });
      });
    } catch (downloadError) {
      console.error('Error during download:', downloadError);
      return repondre("*Failed to download the application file.*");
    }

    try {
      await zk.sendMessage(dest, { image: { url: appData.icon }, caption: captionText }, { quoted: ms });
      const documentMessage = { document: { url: filePath }, mimetype: 'application/vnd.android.package-archive', fileName: apkFileName };
      await zk.sendMessage(dest, documentMessage, { quoted: ms });
    } catch (messageError) {
      console.error('Error sending message:', messageError);
      return repondre("*Failed to send the application file.*");
    }

    fs.unlinkSync(filePath); // Remove the file after sending
  } catch (error) {
    console.error('Error during apk command processing:', error);
    repondre("*Error during apk command processing*");
  }
});*/
/*******************************  automute && autoummute ***************************/

const cron = require(`../data/cron`) ;

/*
king({
      nomCom : 'automute',
      categorie : 'Group'
  } , async (dest,zk,commandeOptions) => {

      const {arg , repondre , verifAdmin } = commandeOptions ;

      if (!verifAdmin) { repondre('You are not an administrator of the group') ; return}

      group_cron = await cron.getCronById(dest) ;
      
     

      if (!arg || arg.length == 0) {

        let state ;
        if (group_cron == null || group_cron.mute_at == null) {
  
            state =  "No time set for automatic mute"
        } else {
  
          state =  `The group will be muted at ${(group_cron.mute_at).split(':')[0]} ${(group_cron.mute_at).split(':')[1]}`
        }
  
        let msg = `* *State:* ${state}
         *Instructions:* To activate automatic mute, add the minute and hour after the command separated by ':'
        Example automute 9:30
        *To delete the automatic mute, use the command *automute del*`
        

          repondre(msg) ;
          return ;
      } else {

        let text = arg.join(' ')

        if (text.toLowerCase() === `del` ) { 

          if (group_cron == null) {

              repondre('No cronometrage is active') ;
          } else {

              await cron.delCron(dest) ;

              repondre("The automatic mute has been removed; restart to apply changes") 
              .then(() => {

                exec("pm2 restart all");
              }) ;
          }
        } else if (text.includes(':')) {

          //let { hr , min } = texte.split(':') ;

          await cron.addCron(dest,"mute_at",text) ;

          repondre(`Setting up automatic mute for ${text} ; restart to apply changes`) 
          .then(() => {

            exec("pm2 restart all");
          }) ;

        } else {
            repondre('Please enter a valid time with hour and minute separated by :') ;
        }


      }
  });

*/
king({
    nomCom: 'automute',
    categorie: 'Group'
}, async (dest, zk, commandeOptions) => {

    const { arg, repondre, verifAdmin } = commandeOptions;

    if (!verifAdmin) {
        repondre('You are not an administrator of the group');
        return;
    }

    let group_cron = await cron.getCronById(dest);

    if (!arg || arg.length === 0) {
        let state;
        if (!group_cron || !group_cron.mute_at) {
            state = "No time set for automatic mute";
        } else {
            const [hour, minute] = group_cron.mute_at.split(':');
            state = `The group will be muted at ${hour}:${minute}`;
        }

        const msg = `*State:* ${state}\n\n` +
                    `*Instructions:* To activate automatic mute, add the minute and hour after the command separated by ':'.\n` +
                    `Example: automute 9:30\n` +
                    `To delete the automatic mute, use the command *automute del*`;

        repondre(msg);
        return;
    } else {
        const texte = arg.join(' ');

        if (texte.toLowerCase() === 'del') {
            if (!group_cron) {
                repondre('No cronometrage is active');
            } else {
                await cron.delCron(dest);
                repondre('The automatic mute has been removed; restart to apply changes');
                exec('pm2 restart all'); // Restart the service after removing the cron
            }
        } else if (texte.includes(':')) {
            const [hour, minute] = texte.split(':');

            // Validate hour and minute
            if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
                repondre('Please enter a valid time with hour (0-23) and minute (0-59) separated by :');
                return;
            }

            await cron.addCron(dest, 'mute_at', texte);
            repondre(`Setting up automatic mute for ${texte}; restart to apply changes`);
            exec('pm2 restart all'); // Restart the service after setting the cron
        } else {
            repondre('Please enter a valid time with hour and minute separated by :');
        }
    }
});

	
  king({
    nomCom : 'autounmute',
    categorie : 'Group'
} , async (dest,zk,commandeOptions) => {

    const {arg , repondre , verifAdmin } = commandeOptions ;

    if (!verifAdmin) { repondre('You are not an administrator of the group') ; return}

    group_cron = await cron.getCronById(dest) ;
    
   

    if (!arg || arg.length == 0) {

      let state ;
      if (group_cron == null || group_cron.unmute_at == null) {

          state = "No time set for autounmute" ;

      } else {

        state = `The group will be un-muted at ${(group_cron.unmute_at).split(':')[0]}H ${(group_cron.unmute_at).split(':')[1]}`
      }

      let msg = `* *State:* ${state}
      * *Instructions:* To activate autounmute, add the minute and hour after the command separated by ':'
      Example autounmute 7:30
      * To delete autounmute, use the command *autounmute del*`

        repondre(msg) ;
        return ;

    } else {

      let texte = arg.join(' ')

      if (texte.toLowerCase() === `del` ) { 

        if (group_cron == null) {

            repondre('No cronometrage has been activated') ;
        } else {

            await cron.delCron(dest) ;

            repondre("The autounmute has been removed; restart to apply the changes")
            .then(() => {

              exec("pm2 restart all");
            }) ;

            

        }
      } else if (texte.includes(':')) {

       

        await cron.addCron(dest,"unmute_at",texte) ;

        repondre(`Setting up autounmute for ${texte}; restart to apply the changes`)
        .then(() => {

          exec("pm2 restart all");
        }) ;

      } else {
          repondre('Please enter a valid time with hour and minute separated by :') ;
      }


    }
});



king({
  nomCom : 'fkick',
  categorie : 'Group'
} , async (dest,zk,commandeOptions) => {

  const {arg , repondre , verifAdmin , superUser , verifZokouAdmin } = commandeOptions ;

  if (verifAdmin || superUser) {

    if(!verifZokouAdmin){ repondre('You need administrative rights to perform this command') ; return ;}

    if (!arg || arg.length == 0) { repondre('Please enter the country code whose members will be removed') ; return ;}

      let metadata = await zk.groupMetadata(dest) ;

      let participants = metadata.participants ;

      for (let i = 0 ; i < participants.length ; i++) {

          if (participants[i].id.startsWith(arg[0]) && participants[i].admin === null ) {

             await zk.groupParticipantsUpdate(dest, [participants[i].id], "remove") ;
          }
      }

  } else {
    repondre('Sorry, you are not an administrator of the group')
  }


}) ;


king({
      nomCom : 'nsfw',
      categorie : 'Group'
}, async (dest,zk,commandeOptions) => {
  
    const {arg , repondre , verifAdmin } = commandeOptions ;

  if(!verifAdmin) { repondre('Sorry, you cannot enable NSFW content without being an administrator of the group') ; return}

      let hbd = require('../data/hentai') ;

    let isHentaiGroupe = await hbd.checkFromHentaiList(dest) ;

  if (arg[0] == 'on') {
    
       if(isHentaiGroupe) {repondre('NSFW content is already active for this group') ; return} ;

      await hbd.addToHentaiList(dest) ;

      repondre('NSFW content is now active for this group') ;
       
  } else if (arg[0] == 'off') {

     if(!isHentaiGroupe) {repondre('NSFW content is already disabled for this group') ; return} ;

      await hbd.removeFromHentaiList(dest) ;

      repondre('NSFW content is now disabled for this group') ;
  } else {

      repondre('You must enter "on" or "off"') ;
    }
} ) ;



 //------------------------------------antiword-------------------------------

 king({ nomCom: "antiword", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {


  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;
  

  
  if (!verifGroupe) {
    return repondre("*This command is for groups only*");
  }
  
  if( superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest)
    try {
      if (!arg || !arg[0] || arg === ' ') { repondre("antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete.") ; return};
     
      if(arg[0] === 'on') {

      
       if(enetatoui ) { repondre("the antiword is already activated for this group")
                    } else {
                  await ajouterOuMettreAJourJid(dest,"oui");
                
              repondre("the antiword is activated successfully") }
     
            } else if (arg[0] === "off") {

              if (enetatoui) { 
                await ajouterOuMettreAJourJid(dest , "non");

                repondre("The antiword has been successfully deactivated");
                
              } else {
                repondre("antiword is not activated for this group");
              }
            } else if (arg.join('').split("/")[0] === 'action') {
                            

              let action = (arg.join('').split("/")[1]).toLowerCase() ;

              if ( action == 'remove' || action == 'warn' || action == 'delete' ) {

                await mettreAJourAction(dest,action);

                repondre(`The anti-word action has been updated to ${arg.join('').split("/")[1]}`);

              } else {
                  repondre("The only actions available are warn, remove, and delete") ;
              }
            

            } else repondre("antiword on to activate the anti-word feature\nantiword off to deactivate the anti-word feature\nantiword action/remove to directly remove the word sender without notice\nantiword action/warn to give warnings\nantiword action/delete to remove the word without any sanctions\n\nPlease note that by default, the anti-word feature is set to delete.")

      
    } catch (error) {
       repondre(error)
    }

  } else { repondre('You are not entitled to this order') ;
  }

}); 


 //------------------------------------antilink-all-------------------------------

 king({ nomCom: "antilink-all", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;

  if (!verifGroupe) {
    return repondre("*This Command works in Groups Only*");
  }

  if (superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest);
    try {
      if (!arg || !arg[0].trim()) {
        repondre("Type `antilink-all on` to activate the antilink-all feature\n" +
                 "or `antilink-all off` to deactivate the antilink-all feature\n" +
                 "Then `antilink-all action/remove` to directly remove the link without notice\n" +
                 "or `antilink-all action/warn` to give warnings\n" +
                 "or `antilink-all action/delete` to remove the link without any sanctions\n\n" +
                 "Please note that by default, the antilink-all feature is set to delete.");
        return;
      }

      const [command, action] = arg.join(' ').split("/");

      if (command === 'on') {
        if (enetatoui) {
          repondre("Antilink-all is already activated for this group.");
        } else {
          await ajouterOuMettreAJourJid(dest, "oui");
          repondre("The antilink-all feature has been activated successfully.");
        }
      } else if (command === 'off') {
        if (enetatoui) {
          await ajouterOuMettreAJourJid(dest, "non");
          repondre("The antilink-all feature has been successfully deactivated.");
        } else {
          repondre("Antilink-all is not activated for this group.");
        }
      } else if (command === 'action') {
        const actionType = action.toLowerCase();

        if (['remove', 'warn', 'delete'].includes(actionType)) {
          await mettreAJourAction(dest, actionType);
          repondre(`The anti-link action has been updated to ${actionType}.`);
        } else {
          repondre("The only actions available are `warn`, `remove`, and `delete`.");
        }
      } else {
        repondre("Type `antilink-all on` to activate the antilink-all feature\n" +
                 "or `antilink-all off` to deactivate the antilink-all feature\n" +
                 "or `antilink-all action/remove` to directly remove the link without notice\n" +
                 "or `antilink-all action/warn` to give warnings\n" +
                 "or `antilink-all action/delete` to remove the link without any sanctions\n\n" +
                 "Please note that by default, the antilink-all feature is set to delete.\n\n" +
                 "*KEEP USING FLASH-MD 🤍*");
      }
    } catch (error) {
      repondre(`Error: ${error.message}`);
    }
  } else {
    repondre('You are not allowed to use this command.');
  }
});
