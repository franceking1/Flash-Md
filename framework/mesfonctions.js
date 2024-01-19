"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reaction = exports.recept_message = exports.getBuffer = exports.zJson = exports.apiWaifu = exports.format = exports.fruit = exports.tabCmd = exports.police = exports.styletext = exports.xlab = exports.ajouterCommande = void 0;
const axios = require('axios');
const path = require("path");
const cheerio = require("cheerio");
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const baileys_1 = require("@whiskeysockets/baileys");
const fs = require('fs-extra');
const util = require('util');
let { listall } = require('./stylish-font');
/*_________by Djalega++

fonction zJson:
récupère un objet json
:paramètres
-url:lien sur laquelle la requête est effectuée
-option: éventuelle option de requête
:valeur de retour
données contenues dans la reponse de la requête



*/
/** ********* */
module.exports.genererNomFichier = async (extension) => {
    var randomNbre = Math.floor(Math.random() * 2000);
    var nomFichier = `Zok${randomNbre}.${extension}`;
    return nomFichier;
};
/** ****** */
/** ************ */
module.exports.stick = async (buffer, author) => {
    var sticker = new Sticker(buffer, {
        pack: 'Zokou-MD',
        author: author,
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: '12345',
        quality: 50,
        background: '#000000'
    });
    return sticker;
};
/** ********** */
async function zJson(url, option) {
    try {
        option ? option : {};
        const resultat = await axios({
            method: 'GET', url: url,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36' }, ...option
        });
        return resultat.data;
    }
    catch (erreur) {
        return erreur;
    }
}
exports.zJson = zJson;
/*______ fonction getBuffer------
récupère les données sous forme de : arraybuffer
:paramètres
-url:lien de la requête
-option:eventuelles options pour la requête
:valeur de retour
tableau contenant les données de la réponse renvoyée par la requête
-------*/
async function getBuffer(url, option) {
    try {
        option ? option : {};
        const resultat = await axios({
            method: 'GET', url: url, headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            }, ...option, responseType: "arrayBuffer"
        });
        return resultat.data;
    }
    catch (erreur) {
        console.log(erreur);
    }
}
exports.getBuffer = getBuffer;
/*-------- fonction recept_message

fonction pour récupérer les meté-données des messages recus
- paramètres
:zok objet waSocket
:objet IwaMessage (message reçu )
:store enregistrements de conversation
- valeur de retour
retourne un tableau contenant les meta-données du message reçu
*/
async function recept_message(zok, mess, store) {
    if (!mess)
        return;
    if (mess.key) {
        mess.cleMessage = mess.key;
        mess.idMessage = mess.key.id;
        mess.origineMessage = mess.key.remoteJid;
        mess.moi = mess.key.fromMe;
        mess.groupe = mess.origineMessage.endsWith('@g.us');
        mess.origineBot = mess.idMessage.startsWith('BAE5') && mess.idMessage.length == 16;
    }
    ///////////////////////////////
    if (mess.message) {
        mess.typeMessage = (0, baileys_1.getContentType)(mess.message);
        mess.ms = (mess.typeMessage == 'viewOnceMessage' ? mess.message[mess.typeMessage].message[(0, baileys_1.getContentType)(mess.message[mess.typeMessage].message)] : mess.message[mess.typeMessage]);
        try {
            switch (mess.typeMessage) {
                case 'conversation':
                    mess.corpsMessage = mess.message.conversation;
                    break;
                case 'imageMessage':
                    mess.corpsMessage = mess.message.imageMessage.caption;
                    break;
                case 'videoMessage':
                    mess.corpsMessage = mess.message.videoMessage.caption;
                    break;
                case 'entendedTextMessage':
                    mess.corpsMessage = mess.message.extendedTextMessage.Textarea;
                    break;
                case 'buttonsResponseMessage':
                    mess.corpsMessage = mess.message.buttonsResponseMessage.SelectedButtonId;
                    break;
                case 'listResponseMessage':
                    mess.corpsMessage = mess.message.listResponseMessage.singleSelectReply.selectedRowId;
                    break;
                case 'templateButtonReplyMessage':
                    mess.corpsMessage = mess.message.templateButtonReplyMessage.selectedId;
                    break;
                case 'messageContextInfo':
                    mess.corpsMessage = mess.message.buttonsResponseMessage.SelectedButtonId || mess.message.listResponseMessage.singleSelectReply.selectedRowId || mess.text || '';
                    break;
                default:
                    mess.corpsMessage = false;
            }
        }
        catch {
            mess.corpsMessage = false;
        }
    }
    ///////////////////////////
    let quoted = mess.quoted = mess.ms.contextInfo ? mess.ms.contextInfo.quotedMessage : null;
    mess.mentionedJid = mess.ms.contextInfo ? mess.ms.contextInfo.mentionedJid : [];
    if (mess.quoted) {
    }
    ///////////////////////////:/:
    return mess;
}
exports.recept_message = recept_message;
function styletext(teks) {
    return new Promise((resolve, reject) => {
        axios.get('http://qaz.wtf/u/convert.cgi?text=' + teks)
            .then(({ data }) => {
            let $ = cheerio.load(data);
            let hasil = [];
            $('table > tbody > tr').each(function (a, b) {
                hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() });
            });
            resolve(hasil);
        });
    });
}
exports.styletext = styletext;
/*fonction pour prendre le lienle site api.waifu

by @luffy


*/
async function apiWaifu(theme) {
    var url = 'https://api.waifu.pics/nsfw/';
    if (theme == 'waifu') {
        url += theme;
    }
    else if (theme == 'trap') {
        url += theme;
    }
    else if (theme == 'neko') {
        url += theme;
    }
    else if (theme == 'blowjob') {
        url += 'blowjob';
    }
    else {
        url = 'https://api.waifu.pics/nsfw/waifu';
    }
    try {
        const response = await axios.get(url);
        return response.data.url;
    }
    catch (e) {
        console.log(e);
    }
}
exports.apiWaifu = apiWaifu;
var tabCmd = {};
exports.tabCmd = tabCmd;
var reaction = {};
exports.reaction = reaction;
var fruit = {};
exports.fruit = fruit;
async function ajouterCommande() {
    fs.readdirSync(__dirname + "/../commandes").forEach((fichier) => {
        if (path.extname(fichier).toLowerCase() == ".js") {
            require(__dirname + "/../commandes/" + fichier.split(".js")[0]);
            console.log('fichier : ' + fichier);
            //console.log("le module    "+__dirname+"/../commandes/"+fichier.split(".js")[0])
        }
        // console.log('fichier : '+fichier )
    });
    /*const readDir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);
    //console.log("ch " + __dirname + '../')
    var chemin = './commandes/'
    var nomFichier = await readDir(chemin)
  //console.log("installation des plugins ... ")
    nomFichier.forEach((fichier) => {
      if (fichier.endsWith(".js")) {
        //console.log(fichier+" installé ✅")
        var { commande } = require('../'+chemin.replace(/./, '') + fichier.split('.js')[0])
        var infoCom = commande()
        for (var a of infoCom.nomCom) {
          tabCmd[a] = infoCom.execute
          reaction[a]=infoCom.reaction
        }
      }
  //console.log("installation de plugins terminé 👍🏿")
    })
  
  */
}
exports.ajouterCommande = ajouterCommande;
async function xlab() {
    const readDir = util.promisify(fs.readdir);
    const readFile = util.promisify(fs.readFile);
    //console.log("ch " + __dirname + '../')
    var chemin = './commandes/';
    var nomFichier = await readDir(chemin);
    nomFichier.forEach((fichier) => {
        if (fichier.endsWith(".js")) {
            var { commande } = require(__dirname + '/../commandes/' + fichier.split(".js")[0]);
            var infos;
            if (commande) {
                infos = commande();
            }
            else {
                infos = null;
            }
            if (infos != null) {
                for (const cd of infos.nomCom) {
                    fruit[cd] = infos.execute;
                }
            }
        }
    });
    //console.log("installation des plugins ... ")
    //console.log(fichier+" installé 
    //////////
}
exports.xlab = xlab;
const human_readable_1 = require("human-readable");
const format = (0, human_readable_1.sizeFormatter)({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
});
exports.format = format;
function police(text, index) {
    index = index - 1;
    return listall(text)[index];
}
exports.police = police;
