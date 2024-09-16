const axios = require('axios');
const { king } = require('../france/king');

king({
  nomCom: "weather",
  reaction: "🌡️",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const question = arg.join(' ');
  if (!question) return repondre("Give me location...");

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: question,
        units: 'metric',
        appid: '060a6bcfa19809c2cd4d97a212b19273',
        language: 'en'
      }
    });

    const data = response.data;

    const cityName = data.name;
    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const minTemperature = data.main.temp_min;
    const maxTemperature = data.main.temp_max;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const rainVolume = data.rain ? data.rain['1h'] : 0;
    const cloudiness = data.clouds.all;

    // Corrected sunrise and sunset times
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    await repondre(`❄️ Weather in ${cityName}

🌡️ Temperature: ${temperature}°C
🌡️ Feels Like: ${feelsLike}°C
🌡️ Min Temperature: ${minTemperature}°C
🌡️ Max Temperature: ${maxTemperature}°C
📝 Description: ${description}
❄️ Humidity: ${humidity}%
🌀 Wind Speed: ${windSpeed} m/s
🌧️ Rain Volume (last hour): ${rainVolume} mm
☁️ Cloudiness: ${cloudiness}%
🌄 Sunrise: ${sunrise.toLocaleTimeString()}
🌅 Sunset: ${sunset.toLocaleTimeString()}
🌫️ Latitude: ${data.coord.lat}
🌪️ Longitude: ${data.coord.lon}

🗺 Country: ${data.sys.country}

*°Powered by FLASH-MD*`);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    await repondre('An error occurred while fetching the weather data. Please try again.');
  }
});
