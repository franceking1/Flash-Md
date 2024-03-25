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
    console.error('Error while uploading to Imgur:', error);
    throw new Error('An error occurred while uploading to Imgur.');
  }
}

module.exports = { uploadImageToImgur };
