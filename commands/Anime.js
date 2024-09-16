const axios = require("axios");
const {king} = require("../france/king");
const traduire = require("../france/traduction");
const {Sticker ,StickerTypes}= require('wa-sticker-formatter');


king({
  nomCom: "emomix",
  categorie: "Converter"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, nomAuteurMessage } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Incorrect use. Example: .emojimix 😀;🥰");
    return;
  }

  // Divide the string into two emojis using the semicolon as a separator
  const emojis = arg.join(' ').split(';');

  if (emojis.length !== 2) {
    repondre("Please specify two emojis using a ';' as a separator.");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
      // If the request was successful, send the resulting image
      let stickerMess = new Sticker(response.data.result, {
        pack: "FLASH-MD", // Ensure this is a valid value for the pack
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });

      const stickerBuffer2 = await stickerMess.toBuffer();
      zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });
    } else {
      repondre("Unable to create emoji mix.");
    }
  } catch (error) {
    repondre("An error occurred while creating the emoji mix: " + error.message);
  }
});






king({
  nomCom: "ranime",
  categorie: "Fun",
  reaction: "📺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const jsonURL = "https://api.jikan.moe/v4/random/anime"; // Remplacez par votre URL JSON

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url; // Utilisez l'URL de l'image JPG
    const episodes = data.episodes;
    const status = data.status;

    //const texttraduit = await traduire(synopsis,{ to: 'fr' })

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}`;
    
    // Envoyer l'image et les informations
    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Error retrieving data from JSON :', error);
    repondre('Error retrieving data from JSON.');
  }
});

king({
  nomCom: "google",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;
  
  if (!arg[0] || arg === "") {
    repondre("Give me a query.\n*Example: .google What is a bot.*");
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `Google search for : ${arg}\n\n`;

    for (let result of results) {
      msg += `➣ Title : ${result.title}\n`;
      msg += `➣ Description : ${result.snippet}\n`;
      msg += `➣ Link : ${result.link}\n\n────────────────────────\n\n`;
    }
    
   // const trdmsg = await traduire(msg,{to : 'fr'})
    repondre(msg);
  } catch (error) {
    repondre("An error occurred during Google search.");
  }
});




king({
  nomCom: "imdb",
  aliases: ["movie","film"], 
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0] || arg === "") {
    repondre("give the name of a series or film.");
    return;
  }

  try {
    
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbInfo += " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n";
    imdbInfo += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbInfo += "🎬Title    : " + imdbData.Title + "\n";
    imdbInfo += "📅year      : " + imdbData.Year + "\n";
    imdbInfo += "⭐Assessment : " + imdbData.Rated + "\n";
    imdbInfo += "📆Release    : " + imdbData.Released + "\n";
    imdbInfo += "⏳Runtime     : " + imdbData.Runtime + "\n";
    imdbInfo += "🌀Genre      : " + imdbData.Genre + "\n";
    imdbInfo += "👨🏻‍💻Director : " + imdbData.Director + "\n";
    imdbInfo += "✍writers : " + imdbData.Writer + "\n";
    imdbInfo += "👨actors  : " + imdbData.Actors + "\n";
    imdbInfo += "📃Synopsis  : " + imdbData.Plot + "\n";
    imdbInfo += "🌐Language  : " + imdbData.Language + "\n";
    imdbInfo += "🌍Contry      : " + imdbData.Country + "\n";
    imdbInfo += "🎖️Awards : " + imdbData.Awards + "\n";
    imdbInfo += "📦BoxOffice : " + imdbData.BoxOffice + "\n";
    imdbInfo += "🏙️Production : " + imdbData.Production + "\n";
    imdbInfo += "🌟score : " + imdbData.imdbRating + "\n";
    imdbInfo += "❎imdbVotes : " + imdbData.imdbVotes + "\n";
    imdbInfo += "🎥Watch Online: https://www.google.com/search?q=watch+" + encodeURIComponent(imdbData.Title) + "+online\n";

    zk.sendMessage(dest, {
      image: {
        url: imdbData.Poster,
      },
      caption: imdbInfo,
    }, {
      quoted: ms,
    });
  } catch (error) {
    repondre("An error occurred while searching IMDb.");
  }
});
/*

king({
  nomCom: "emomix",
  categorie: "Converter"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre,ms , nomAuteurMessage } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Incorrect use. Example: .emojimix 😀;🥰");
    return;
  }

  // Divisez la chaîne en deux emojis en utilisant le point-virgule comme séparateur
  const emojis = arg.join(' ').split(';');

  if (emojis.length !== 2) {
    repondre("Please specify two emojis using a ';' as a separator.");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const axios = require('axios');
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
      // Si la requête a réussi, envoyez l'image résultante
      
      let stickerMess = new Sticker(response.data.result, {
        pack: FLASH-MD,
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer2 = await stickerMess.toBuffer();
      zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });

    } else {
      repondre("Unable to create emoji mix.");
    }
  } catch (error) {
    repondre("An error occurred while creating the emoji mix." + error );
  }
});
*/
king({
  nomCom: "currency",
  categorie: "Finance"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0] || arg.length < 3) {
    repondre("Please provide the amount, from currency, and to currency.");
    return;
  }

  const [amount, fromCurrency, toCurrency] = arg;

  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.toUpperCase()}`);
    const data = response.data;
    const rates = data.rates;
    const convertedAmount = (amount * rates[toCurrency.toUpperCase()]).toFixed(2);

    const updateDate = new Date(data.time_last_updated * 1000); // Convert Unix timestamp to Date
    const country = data.base; // Base currency country code (usually the currency code itself)

    let currencyInfo = `*💱 Currency Conversion 💱*\n\n`;
    currencyInfo += `🌍 Your search currency: ${country}\n`;
    currencyInfo += `🔄 Update Date: ${updateDate.toLocaleDateString()}\n`;
    currencyInfo += `🕒 Update Time: ${updateDate.toLocaleTimeString()}\n\n`;
    currencyInfo += `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}\n`;
    currencyInfo += `💱 Rate: 1 ${fromCurrency.toUpperCase()} = ${rates[toCurrency.toUpperCase()]} ${toCurrency.toUpperCase()}`;

    // Send as a text message
    zk.sendMessage(dest, {
      text: currencyInfo
    }, {
      quoted: ms,
    });

  } catch (error) {
    repondre("An error occurred while converting currency.\n Make sure the terms you provided are correct.You can use the command *currencyinfo* to know currencies of all countries");
  }
});


king({
  nomCom: "currencyinfo",
  categorie: "Finance"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0]) {
    repondre("Please provide the name or code of the country.");
    return;
  }

  const country = arg.join(' ').toLowerCase(); // Convert to lowercase for better matching

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`);
    const data = response.data;

    if (!data || data.length === 0) {
      repondre("Sorry, we couldn't find the currency information for that country.");
      return;
    }

    // Assuming the first result is the correct one
    const countryData = data[0];

    if (!countryData.currencies) {
      repondre("Sorry, we couldn't find the currency information for that country.");
      return;
    }

    const currencyInfo = Object.values(countryData.currencies)[0]; // Get the first currency object
    const currencyCode = currencyInfo.code || currencyInfo.name;
    const currencyName = currencyInfo.name;

    let currencyDetails = `🌍 *Country:* ${countryData.name.common} (${countryData.cca2})\n`;
    currencyDetails += `💱 *Currency:* ${currencyCode} - ${currencyName}`;

    zk.sendMessage(dest, {
      text: currencyDetails
    }, {
      quoted: ms,
    });

  } catch (error) {
    console.error(error);
    repondre("Sorry, an error occurred while fetching the currency information.");
  }
});


king({
  nomCom: "exchange",
  aliases: ["rate", "rates"], 
  categorie: "Finance"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (arg.length < 3) {
    repondre("Please provide the amount, from currency, and to currency.");
    return;
  }

  const [amount, fromCurrency, toCurrency] = arg;

  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.toUpperCase()}`);
    const rates = response.data.rates;

    if (!rates[toCurrency.toUpperCase()]) {
      repondre("Currency conversion rate not available.");
      return;
    }

    const convertedAmount = (amount * rates[toCurrency.toUpperCase()]).toFixed(2);

    repondre(`${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}`);

  } catch (error) {
    repondre("Sorry, an error occurred while converting currency.");
  }
});

  
