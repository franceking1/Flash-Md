const goat = require('api-dylux');
const axios = require('axios');
const fs = require('fs');
const { king } = require('../france/king');
const { writeFile } = require('fs/promises');


king({
  nomCom: "instastalk",
  aliases: ["igstalk"], 
  reaction: "📷",
  categorie: "STALKERS"
}, async (dest, zk, commandeOptions) => {

  const { repondre, prefixe, arg, ms } = commandeOptions;
  const username = arg.join(' ');

  if (!username) {
    return repondre(`Give me a valid Instagram username like: ${prefixe}instastalk france.king1`);
  }

  try {
    let response = await fetch(`https://www.noobs-api.000.pe/dipto/instainfo?username=${encodeURIComponent(username)}`);
    let res = await response.json();

    if (!res.data || !res.data.user_info) {
      return repondre(`Couldn't fetch the data for username: ${username}. Please check the username and try again.`);
    }

    let userInfo = res.data.user_info;
    let txt = `
┌──「 *INSTAGRAM STALK* 
▢ *🔖Name:* ${userInfo.full_name || 'Unknown'}
▢ *🔖Username:* ${userInfo.username || 'Unknown'}
▢ *👥Followers:* ${userInfo.followers || 'Unknown'}
▢ *🫂Following:* ${userInfo.following || 'Unknown'}
▢ *📌Bio:* ${userInfo.biography || 'No Bio'}
▢ *🔗 External Link:* ${userInfo.external_url || 'No Link'}

▢ *🔗 Profile Link:* https://instagram.com/${userInfo.username || 'unknown'}
└────────────`;

    // Ensure `userInfo.profile_pic_url` is a valid URL for the image
    await zk.sendMessage(dest, {
      image: { url: userInfo.profile_pic_url }, // Assuming `userInfo.profile_pic_url` is an image URL
      caption: txt
    }, { quoted: ms });

  } catch (e) {
    return repondre(`Error: ${e.toString()}`);
  }
});



king({
  nomCom: "github",
  reaction: "📃",
  categorie: "STALKERS"
}, async (dest, zk, commandeOptions) => {

  const { repondre, prefixe, arg, ms } = commandeOptions;  
  const username = arg.join(' ');

  if (!username) {
    return repondre(`Give me a valid GitHub username like: ${prefixe}github franceking1`);
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    
    const data = await response.json();
    
    if (data.message === "Not Found") {
      return repondre("I did not find that user, try again.");
    }

    const pic = `https://github.com/${data.login}.png`;

    const userInfo = `*°FLASH-MD GITHUB STALKER°*

♦️ Name: ${data.name || 'N/A'}
🔖 Username: ${data.login}
✨ Bio: ${data.bio || 'N/A'}
🏢 Company: ${data.company || 'N/A'}
📍 Location: ${data.location || 'N/A'}
📧 Email: ${data.email || 'N/A'}
📰 Blog: ${data.blog || 'N/A'}
🔓 Public Repo: ${data.public_repos}
👪 Followers: ${data.followers}
🫶 Following: ${data.following}
    `.trim();

    await zk.sendMessage(dest, { image: { url: pic }, caption: userInfo }, { quoted: ms });
  } catch (error) {
    console.error('Error fetching GitHub user information:', error.message);
    await repondre('Failed to fetch GitHub user information. Please try again later.');
  }
});



king({
  nomCom: "ipstalk",
  reaction: "📃",
  categorie: "STALKERS"
}, async (dest, zk, commandeOptions) => {

  const { repondre, prefixe, arg, ms } = commandeOptions;  
  const question = arg.join(' ');

  if (!question) {
    return repondre(`Give me a valid IP address like: ${prefixe}ip 8.8.8.8`);
  }

  try {
    const response = await fetch(`https://api.maher-zubair.tech/stalk/ip?q=${question}`);
    
    if (!response.ok) {
      throw new Error('Network error!!');
    }

    const data = await response.json();

    // Check for the presence of the 'result' key
    if (!data.result || data.result.status !== "success") {
      throw new Error('Failed to fetch IP details. Please try again.');
    }

    const {
      continent,
      country,
      regionName: region,
      city,
      zip,
      lat,
      lon,
      timezone,
      currency,
      isp,
      org,
      as,
      reverse,
      mobile,
      proxy,
      hosting,
      ip
    } = data.result;

    await repondre(`*°FLASH-MD IP ADDRESS STALKER°*
    
▢ *Continent:* ${continent}
▢ *Country:* ${country} 
▢ *Region:* ${region}
▢ *City:* ${city}
▢ *ZIP:* ${zip}
▢ *Latitude:* ${lat}
▢ *Longitude:* ${lon}
▢ *Timezone:* ${timezone}
▢ *Currency:* ${currency}
▢ *ISP:* ${isp}
▢ *Organization:* ${org}
▢ *AS:* ${as}
▢ *Reverse DNS:* ${reverse}
▢ *Mobile:* ${mobile}
▢ *Proxy:* ${proxy}
▢ *Hosting:* ${hosting}
▢ *IP Address:* ${ip}
└────────────>\n\n> *©Powered by ©France King*`);
  } catch (error) {
    console.error('Error:', error.message); // Log the error for debugging
    await repondre(`Error: ${error.message}`);
  }
});


king({
  nomCom: "tikstalk",
  reaction: "📃",
  categorie: "STALKERS"
}, async (dest, zk, commandeOptions) => {

  const { repondre, prefixe, arg, ms } = commandeOptions;  
  const username = arg.join(' ');

  if (!username) {
    return repondre(`Give me a valid TikTok username like: ${prefixe}tikstalk franceking1`);
  }

  try {
    let res = await goat.ttStalk(username); // Use the correct variable for username
    let txt = `
┌──「 *TIKTOK STALK* 
▢ *🔖Name:* ${res.name || 'Unknown'}
▢ *🔖Username:* ${res.username || 'Unknown'}
▢ *👥Followers:* ${res.followers || 'Unknown'}
▢ *🫂Following:* ${res.following || 'Unknown'}
▢ *📌Desc:* ${res.desc || 'No Description'}

▢ *🔗 Link:* https://tiktok.com/${res.username || 'unknown'}
└────────────`;

    // Ensure `res.profile` is a valid URL or file path for the image
    await zk.sendMessage(dest, {
      image: { url: res.profile }, // Assuming `res.profile` is an image URL
      caption: txt
    }, { quoted: ms });
    
  } catch (e) {
    return repondre(`Error: ${e.toString()}`);
  }
});
