const { king } = require("../france/king");
const fancy = require("../commands/Style");

king({ nomCom: "fancy", categorie: "Fun", reaction: "☑️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, prefixe } = commandeOptions;
    const id = arg[0]?.match(/\d+/)?.[0]; // Extracts the first number from the argument
    const text = arg.slice(1).join(" "); // Joins the remaining arguments as text

    try {
        if (!id || !text) {
            // If either id or text is missing, send the example usage message
            return await repondre(`\nExample: ${prefixe}fancy 1 Flash-MD\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('FLASH-MD', fancy));
        }

        const selectedStyle = fancy[parseInt(id) - 1]; // Get the style based on the id
        if (selectedStyle) {
            // If the style exists, apply it to the text and send the response
            return await repondre(fancy.apply(selectedStyle, text));
        } else {
            // If the style does not exist, send an error message
            return await repondre('_Style Not Available :(_');
        }
    } catch (error) {
        console.error(error);
        // Send a general error message if something goes wrong
        return await repondre('_An error occurred :(_');
    }
});
