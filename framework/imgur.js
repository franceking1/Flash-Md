const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadImageToImgur(imagePath, clientId) {
  try {
    const data = new FormData();
    data.append('image', fs.createReadStream(imagePath));

    const headers = {
      'Authorization': `Client-ID ${clientId}`,
      ...data.getHeaders()
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.imgur.com/3/image',
      headers: headers,
      data: data
    };

    const response = await axios(config);
    const imageUrl = response.data.data.link;
    return imageUrl;
  } catch (error) {
    console.error('Erreur lors de l\'envoi sur Imgur:', error);
    throw new Error('Une erreur est survenue lors de l\'envoi sur Imgur.');
  }
}

module.exports = { uploadImageToImgur };
