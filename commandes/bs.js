const ( france ) = require('../framework')
france({
        nomCom: "speed",
        desc: "To check ping",
        categorie: "NEW",
        Reaction: "🐐",
    },
    async(dest, zk, commandOptions) => {
        var inital = new Date().getTime();
        const { key } = await zk.sendMessage(zk.chat, {text: '```Ping!!!```'});
        var final = new Date().getTime();
       // await Secktor.sleep(1000)
       return await dest.sendMessage(zk.chat, {text: '*Pong*\n *' + (final - inital) + ' ms* ', edit: key});
    }
);
