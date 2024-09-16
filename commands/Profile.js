const JavaScriptObfuscator = require('javascript-obfuscator');
const pkg = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent, proto } = pkg;
const { king } = require("../france/king");
const conf = require("../set");
const { jidDecode } = require("@whiskeysockets/baileys");

// Command to obfuscate JavaScript code
king({
    nomCom: "enc",
    categorie: "General",
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, prefixe, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

    try {
        let code = arg.join(' ');

        if (!code) {
            await repondre('After the command, provide a valid JavaScript code for encryption');
            return;
        }

        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        });

        const obfuscatedCode = obfuscationResult.getObfuscatedCode();

        // Create interactive message with buttons
        const buttons = [
            {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "📋 ᴄᴏᴘʏ ʏᴏᴜʀ ᴄᴏᴅᴇ",
                    id: "copy_code",
                    copy_code: obfuscatedCode
                })
            },
            {
                name: "cta_url",
                buttonParamsJson: JSON.stringify({
                    display_text: "𝐉𝐎𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋",
                    url: `https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P`
                })
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "𝐅𝐋𝐀𝐒𝐇 𝐌𝐄𝐍𝐔",
                    id: `${conf.PREFIX}menu`
                })
            }
        ];

        const msg = generateWAMessageFromContent(dest, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: obfuscatedCode
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: "> *POWERED BY FLASH-MD*"
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

        await zk.relayMessage(dest, msg.message, { messageId: msg.key.id });
        await repondre('Code Successfully Encrypted✅');

    } catch (error) {
        console.error('Error:', error);
        await repondre("Something is wrong, check if your code is logical and has the correct syntax");
    }
});

// Command to get user profile and status
king({
    nomCom: "whois",
    categorie: "User",
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

    let jid = null;
    let nom = null;
    let ppUrl;

    try {
        if (!msgRepondu) {
            jid = auteurMessage;
            nom = nomAuteurMessage;
        } else {
            jid = auteurMsgRepondu;
            nom = "@" + auteurMsgRepondu.split("@")[0];
        }

        try {
            ppUrl = await zk.profilePictureUrl(jid, 'image');
        } catch {
            ppUrl = "https://static.animecorner.me/2023/08/op2.jpg";
        }

        const status = await zk.fetchStatus(jid);

        const mess = {
            image: { url: ppUrl },
            caption: '*Name:* ' + nom + '\n*Status:*\n' + status.status,
            mentions: msgRepondu ? [auteurMsgRepondu] : []
        };

        await zk.sendMessage(dest, mess, { quoted: ms });

    } catch (error) {
        console.error('Error:', error);
        await repondre("An error occurred while fetching user information.");
    }
});

// Command to get user profile picture
king({
    nomCom: "getpp",
    categorie: "User",
}, async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, auteurMessage, nomAuteurMessage, msgRepondu, auteurMsgRepondu } = commandeOptions;

    let jid = null;
    let ppUrl;

    try {
        if (!msgRepondu) {
            jid = auteurMessage;
        } else {
            jid = auteurMsgRepondu;
        }

        try {
            ppUrl = await zk.profilePictureUrl(jid, 'image');
        } catch {
            ppUrl = "https://static.animecorner.me/2023/08/op2.jpg";
        }

        const mess = {
            image: { url: ppUrl },
            caption: 'Here is the Profile picture',
            mentions: msgRepondu ? [auteurMsgRepondu] : []
        };

        await zk.sendMessage(dest, mess, { quoted: ms });

    } catch (error) {
        console.error('Error:', error);
        await repondre("An error occurred while fetching the profile picture.");
    }
});
