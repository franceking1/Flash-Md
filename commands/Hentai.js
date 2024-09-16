
const {king } = require("../france/king");
const axios = require('axios');

king({
  nomCom: "messi",
  categorie: "Wallpapers",
  reaction: "😋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/Messi.json'; // Ensure this URL is correct and reachable

  try {
    // Fetch the image URLs from the JSON
    const response = await axios.get(url);
    const imageUrls = response.data; // This is an array of image URLs

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      throw new Error('No images found in the response.');
    }

    for (let i = 0; i < 5; i++) {
      // Randomly select an image URL
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      const imageUrl = imageUrls[randomIndex];

      await zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    // Log the full error object for debugging
    console.error('Error occurred while retrieving data:', error);

    // Send a more detailed error message
    repondre(`Error occurred while retrieving data: ${error.message}`);
  }
});




king({
  nomCom: "hwaifu",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/waifu'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' +error);
  }
});


  /////////////// hneko //////////
king({
  nomCom: "trap",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/trap'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('An Error occurred while retrieving data:', error);
  }
});

king({
  nomCom: "hneko",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/nsfw/neko'//apiWaifu("neko"); // Remplace avec ton lien réel

  try { for (let i = 0 ;i < 5 ; i++) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occured while retrieving data:', error);
  }
});


king({
  nomCom: "bj",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/nsfw/blowjob'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "ass",
  categorie: "Hentai",
  reaction: "🍑"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/nsfw/ass'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "fuck",
  categorie: "Hentai",
  reaction: "💦 "
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/nsfw/fuck'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});




king({
  nomCom: "pussy",
  categorie: "Hentai",
  reaction: "😋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/nsfw/pussy'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});




king({
  nomCom: "dick",
  categorie: "Hentai",
  reaction: "😋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/nsfw/dick'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});


king({
  nomCom: "porngif",
  categorie: "Hentai",
  reaction: "😋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/nsfw/porngif'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});



king({
  nomCom: "car",
  categorie: "Wallpapers",
  reaction: "🚗"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/car'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "enemy",
  categorie: "Wallpapers",
  reaction: "💀"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/horror'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "random",
  categorie: "Wallpapers",
  reaction: "😋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/random'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "pubg",
  categorie: "Hentai",
  reaction: "😋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/pubg'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "dog",
  categorie: "Wallpapers",
  reaction: "🐶"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/dog'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});


king({
  nomCom: "blackpink",
  categorie: "Wallpapers",
  reaction: "😋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/blackpink'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "cr7",
  categorie: "Wallpapers",
  reaction: "😋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/CristianoRonaldo.json';

  try {
    // Fetch the image URLs from the JSON
    const response = await axios.get(url);
    const imageUrls = response.data; 

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      throw new Error('No images found in the response.');
    }

    for (let i = 0; i < 5; i++) {
      // Randomly select an image URL
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      const imageUrl = imageUrls[randomIndex];

      await zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    // Log detailed error information
    console.error('Detailed error information:', {
      message: error.message,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : null,
      stack: error.stack
    });

    repondre(`Error occurred while retrieving data: ${error.message}`);
  }
});


  
king({
  nomCom: "bike",
  categorie: "Wallpapers",
  reaction: "🚲"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/bike'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "aesthetic",
  categorie: "Wallpapers",
  reaction: ""
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/asthetic'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});

king({
  nomCom: "islamic",
  categorie: "Wallpapers",
  reaction: "🌻"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.maher-zubair.tech/wallpaper/islamic'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Error occurred while retrieving data :', error);
  }
});


  
