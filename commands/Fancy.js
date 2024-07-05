const { king } = require("../france/king");
const fancy = require("../commands/Style");

king({ nomCom: "fancy", categorie: "Fun", reaction: "☑️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, prefixe } = commandeOptions;
    const id = arg[0]?.match(/\d+/)?.join('');
    const text = arg.slice(1).join(" ");

    try {
        if (id === undefined || text === undefined) {
            return await repondre(`\nExample : ${prefixe}fancy 10 Flash-Md\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('FLASH-MD', fancy));
        }

        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            return await repondre(fancy.apply(selectedStyle, text));
        } else {
            return await repondre('_Style Not Found :(_');
        }
    } catch (error) {
        console.error(error);
        return await repondre('_France King :(_');
    }
});
