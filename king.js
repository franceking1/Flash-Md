import fs from 'fs';
import logger from './logger.js';
import path from 'path';
import { makeWASocket, useMultiFileAuthState, Browsers, DisconnectReason, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys';
import pino from 'pino';
import conf from './config.js';
import moment from 'moment-timezone';
import { downloadMediaMessage } from '@whiskeysockets/baileys';

async function getBuffer(msg, mediaType) {
    return await downloadMediaMessage(
        { message: { [`${mediaType}Message`]: msg } },
        'buffer',
        {},
        {
            reuploadRequest: king.updateMediaMessage
        }
    );
}

const messageStore = new Map();
export const DEVS = ["254742063632@s.whatsapp.net", "254757835036@s.whatsapp.net"];
const getCurrentDir = () => new URL('.', import.meta.url).pathname;
export let king;
const commands = new Map();

function mapPresenceType(type) {
    switch (type?.toLowerCase()) {
        case 'typing': return 'composing';
        case 'recording': return 'recording';
        case 'online': return 'available';
        default: return 'unavailable';
    }
}

async function startFlashV2() {
    const authDir = path.join(getCurrentDir(), "auth");
    const credsPath = path.join(authDir, "creds.json");
    const sessionString = conf.Session;

    try {
        if (sessionString) {
            const base64 = sessionString.startsWith("FLASH-MD-WA-BOT;;;=>")
                ? sessionString.replace("FLASH-MD-WA-BOT;;;=>", "").trim()
                : sessionString.trim();

            fs.mkdirSync(authDir, { recursive: true });
            fs.writeFileSync(credsPath, Buffer.from(base64, 'base64').toString('utf8'), "utf8");
        }
    } catch (e) {
        logger.error("❌ Invalid session format or error:", e);
        return;
    }

    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    king = makeWASocket({
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(
                state.keys,
                pino({ level: "fatal" }).child({ level: "fatal" })
            ),
        },
        markOnlineOnConnect: true,
        printQRInTerminal: true,
        logger: pino({ level: "fatal" }).child({ level: "fatal" }),
        browser: Browsers.macOS("Safari"),
    });

    logger.info("🚀 Flash-MD-V2 has started...");

    king.ev.on("creds.update", async () => {
        await saveCreds();
    });

    const processedMessages = new Set();
  king.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg || !msg.message || processedMessages.has(msg.key.id)) return;

        const jid = msg.key.remoteJid;
        const participant = msg.key?.participant || msg.key.remoteJid;
        const isGroup = jid.endsWith('@g.us');

        const presenceSetting = isGroup ? conf.PRESENCE_GROUP : conf.PRESENCE_DM;
        const presenceType = mapPresenceType(presenceSetting);

        await king.sendPresenceUpdate(presenceType, jid).catch(() => {});

        const channels = jid?.endsWith("@newsletter");
        const app = jid?.endsWith("@s.whatsapp.net");

        const isFromMe = msg.key.fromMe;
        const senderJid = isFromMe ? king.user.id : msg.key.participant || msg.key.remoteJid;
        const number = senderJid.replace(/@.*$/, '');
        const senderName = isFromMe ? king?.user?.name || 'You' : msg.pushName || 'Unknown Sender';
        let sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : jid;

        let messageType = '';
        let label = '';
        let context = '';

        if (jid.endsWith('@g.us')) {
            const groupMetadata = await king.groupMetadata(jid).catch(() => null);
            const groupName = groupMetadata?.subject || 'Unknown Group';
            label = '👥 Group Message';
            context = `Group: ${groupName}`;
        } else if (jid.endsWith('@s.whatsapp.net')) {
            label = '👤 Personal Message';
            context = 'Direct Chat';
        } else if (jid.endsWith('@channel') || jid.endsWith('@newsletter')) {
            label = '📢 Channel Post';
            context = 'Channel Broadcast';
        } else {
            label = '📣 Broadcast Message';
            context = 'Broadcast';
        }

        const m = msg.message;
        const txt = m?.conversation || m?.extendedTextMessage?.text || '';

        if (txt) messageType = `💬 Text: "${txt}"`;
        else if (m?.imageMessage) messageType = '🖼️ Image';
        else if (m?.videoMessage) messageType = '🎥 Video';
        else if (m?.audioMessage) messageType = '🎧 Audio';
        else if (m?.stickerMessage) messageType = '🔖 Sticker';
        else if (m?.documentMessage) messageType = '📄 Document';
        else if (m?.locationMessage) messageType = '📍 Location';
        else if (m?.liveLocationMessage) messageType = '📡 Live Location';
        else if (m?.contactMessage) messageType = '👤 Contact';
        else if (m?.contactsArrayMessage) messageType = '👥 Contact List';
        else if (m?.buttonsMessage) messageType = '🧩 Buttons';
        else if (m?.imageMessage?.viewOnce) messageType = '⚠️ View Once Image';
        else if (m?.videoMessage?.viewOnce) messageType = '⚠️ View Once Video';
        else if (m?.viewOnceMessage) messageType = '⚠️ View Once (Other)';
        else if (m?.templateMessage) messageType = '🧱 Template';
        else if (m?.listMessage) messageType = '📋 List';
        else if (m?.pollCreationMessage) messageType = '📊 Poll';
        else if (m?.pollUpdateMessage) messageType = '📊 Poll Update';
        else if (m?.reactionMessage) messageType = '❤️ Reaction';
        else if (m?.protocolMessage) messageType = '⛔ Deleted Message (protocolMessage)';
        else messageType = '❔ Unknown Type';

        if (txt) {
            logger.info(`\n━━━━━━━━━━━━━━━━━━━━━━━`);
            logger.info(`${label}`);
            logger.info(`📍 ${context}`);
            logger.info(`📩 From: ${senderName} (${number})`);
            logger.info(`${messageType}`);
            logger.info(`━━━━━━━━━━━━━━━━━━━━━━━\n`);
        }
    if (conf.AUTO_READ_DM === "on" && jid.endsWith('@s.whatsapp.net')) {
            await king.readMessages([msg.key]);
        }

        if (txt) {
            let commandName = '';
            let args = [];
            let matched = false;
            const normalizedParticipant = participant.includes(':') ? participant.split(':')[0] + '@s.whatsapp.net' : participant;
            const isDev = DEVS.includes(normalizedParticipant) || msg.key.fromMe;
            const prefixes = isDev ? ['$', ...conf.PREFIXES] : conf.PREFIXES;

            for (let prefix of prefixes) {
                if (prefix && txt.startsWith(prefix)) {
                    commandName = txt.slice(prefix.length).trim().split(/\s+/)[0]?.toLowerCase();
                    args = txt.slice(prefix.length).trim().split(/\s+/).slice(1);
                    matched = true;
                    break;
                } else if (prefix === '') {
                    const firstWord = txt.trim().split(/\s+/)[0]?.toLowerCase();
                    if (commands.has(firstWord)) {
                        commandName = firstWord;
                        args = txt.trim().split(/\s+/).slice(1);
                        matched = true;
                        break;
                    }
                }
            }

            if (!matched && conf.PREFIXES.includes('')) {
                const firstWord = txt.trim().split(/\s+/)[0].toLowerCase();
                if (commands.has(firstWord)) {
                    commandName = firstWord;
                    args = txt.trim().split(/\s+/).slice(1);
                    matched = true;
                }
            }

            if (matched) {
                const actualSender = msg.key.participant || msg.key.remoteJid;
                const isBot = jid === king?.user?.id;
                if (conf.MODE === 'private' && !isDev && !isBot) return;

                try {
                    await king.sendMessage(jid, { react: { text: '🤍', key: msg.key } });

                    if (!commands.has(commandName)) {
                        const filePath = path.join(getCurrentDir(), 'commands', `${commandName}.js`);
                        if (fs.existsSync(filePath)) {
                            const cmdModule = await import(filePath);
                            for (const key in cmdModule) {
                                const cmd = cmdModule[key];
                                if (cmd?.name) {
                                    commands.set(cmd.name, cmd);
                                    if (Array.isArray(cmd.aliases)) {
                                        for (let alias of cmd.aliases) {
                                            commands.set(alias, cmd);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    const command = commands.get(commandName);
                    if (command) {
                        await command.execute(king, msg, args, jid);
                        const anti = commands.get('antilink');
                        if (anti?.onMessage) await anti.onMessage(king, msg);
                    }
                } catch (e) {
                    logger.error(`❌ Command error:`, e);
                }
            }
        }
    });
  king.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const code = lastDisconnect?.error?.output?.statusCode;
            logger.info("Disconnected. Code:", code);
            if (code !== DisconnectReason.loggedOut) {
                try {
                    await king.logout();
                } catch {}
                startFlashV2();
            } else {
                logger.info("Logged out. No reconnection.");
            }
        } else if (connection === "open") {
            let botId = king.user.id;
            if (botId.includes(":")) {
                botId = botId.split(":")[0] + "@s.whatsapp.net";
            }

            try {
                const joinedGroups = await king.groupFetchAllParticipating();
                const alreadyJoined = Object.values(joinedGroups).map(g => g.id);

                const groupCodes = {
                    "IH4xWuVTGpf7ibfzC3h6LM": "FLASH MD SUPPORT",
                    "DzWIxv7s86FFy0BpDaNTNF": "FLASH-MD CHAT ROOM"
                };

                for (const [inviteCode, groupName] of Object.entries(groupCodes)) {
                    try {
                        const jid = await king.groupAcceptInvite(inviteCode);
                        if (!alreadyJoined.includes(jid)) {
                            logger.info(`✅ Joined group: ${groupName} (${jid})`);
                        } else {
                            logger.info(`ℹ️ Already in group: ${groupName}`);
                        }
                    } catch (err) {
                        logger.error(`❌ Failed to join ${groupName}:`, err.message);
                    }
                }
            } catch (err) {
                logger.error("❌ Error checking group participation:", err);
            }

            if (!DEVS.includes(botId)) {
                DEVS.push(botId);
            }

            const date = new Date();
            const formattedDate = date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const allCommands = Array.from(commands.keys()).filter((v, i, self) => self.indexOf(v) === i);
            const uniqueMainCommands = new Set();
            for (let cmd of allCommands) {
                const command = commands.get(cmd);
                if (command?.name === cmd) uniqueMainCommands.add(cmd);
            }

            const message = `*✅ Flash-MD-V2 Activated!*\n\n` +
                `📅 Date: *${formattedDate}*\n` +
                `⚙️ Mode: *${conf.MODE.toUpperCase()}*\n` +
                `🔢 Commands Loaded: *${uniqueMainCommands.size}*\n` +
                `💬 Prefix: *[ ${conf.PREFIXES.join(', ')} ]*\n` +
                `☎️ Number: *${conf.NUMBER}*\n`;

            await king.sendMessage(king.user.id, { text: message });
        }
    });
king.awaitForMessage = async (options = {}) => {
        return new Promise((resolve, reject) => {
            if (typeof options !== 'object') return reject(new Error('Options must be an object'));
            if (typeof options.sender !== 'string') return reject(new Error('Sender must be a string'));
            if (typeof options.chatJid !== 'string') return reject(new Error('ChatJid must be a string'));
            if (options.timeout && typeof options.timeout !== 'number') return reject(new Error('Timeout must be a number'));
            if (options.filter && typeof options.filter !== 'function') return reject(new Error('Filter must be a function'));

            const timeout = options.timeout || 60000;
            const filter = options.filter || (() => true);
            let timer;

            const listener = ({ type, messages }) => {
                if (type !== 'notify') return;

                for (const message of messages) {
                    const chatId = message.key.remoteJid;
                    const fromMe = message.key.fromMe;
                    const isApp = chatId.endsWith('@s.whatsapp.net');
                    const isGroup = chatId.endsWith('@g.us');
                    const isStatus = chatId === 'status@broadcast';

                    const sender = fromMe
                        ? king.user.id.replace(/:.*@/, '@')
                        : (isGroup || isApp || isStatus)
                            ? message.key.participant.replace(/:.*@/, '@')
                            : chatId;

                    if (
                        sender === options.sender &&
                        chatId === options.chatJid &&
                        filter(message)
                    ) {
                        king.ev.off('messages.upsert', listener);
                        clearTimeout(timer);
                        resolve(message);
                    }
                }
            };

            king.ev.on('messages.upsert', listener);

            timer = setTimeout(() => {
                king.ev.off('messages.upsert', listener);
                reject(new Error('Timeout waiting for message'));
            }, timeout);
        });
    };

    if (!king.authState.creds?.registered) {
        setTimeout(async () => {
            try {
                const code = await king.requestPairingCode(conf.NUMBER);
                logger.info(`📱 [Pairing Code Sent] Sent to ${conf.NUMBER}: ${JSON.stringify(code)}`);
            } catch (err) {
                logger.error("❌ [Pairing Error] Failed to request pairing code:", err);
            }
        }, 1500);
    }
}

function loadCommands() {
    const cmdDir = path.join(getCurrentDir(), 'commands');
    const commandFiles = fs.readdirSync(cmdDir).filter(f => f.endsWith('.js'));

    if (commandFiles.length) console.log("LOADING COMMANDS");

    for (let file of commandFiles) {
        import(path.join(cmdDir, file)).then((cmdModule) => {
            for (const key in cmdModule) {
                const cmd = cmdModule[key];
                if (cmd?.name) {
                    commands.set(cmd.name, cmd);
                    if (Array.isArray(cmd.aliases)) {
                        for (let alias of cmd.aliases) {
                            commands.set(alias, cmd);
                        }
                    }
                    logger.info(`⚡ ${cmd.name} installed ✅`);
                }
            }
        }).catch(err => logger.error(`❌ Failed to load ${file}:`, err));
    }
}

startFlashV2();
loadCommands();

process.on('uncaughtException', (err) => {
    logger.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
