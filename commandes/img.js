const {zokou} = require('../framework/zokou');
const gis = require('async-g-i-s');

zokou({
  nomCom: "img",
  categorie: "Search",
  reaction: "📷"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Wich picture do you want !');
    return;
  }

  const searchTerm = arg.join(" ");

  try {
    const results = await gis(searchTerm);

    // Envoyer les 5 premières images trouvées
    for (let i = 0; i < 5; i++) {
      zk.sendMessage(dest, { image: { url: results[i].url } }, { quoted: ms });
    }
  } catch (error) {
    console.error('Erreur lors de la recherche d\'images :', error);
    repondre('Erreur lors de la recherche d\'images.',error);
  }
});
