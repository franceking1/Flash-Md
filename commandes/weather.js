const axios = require('axios');
const fs = require('fs');
const {zokou} = require('../framework/zokou');
const { writeFile } = require('fs/promises')

zokou({ nomCom: "weather",
        reaction: "🌡️",
        categorie: "Search" }, async (dest, zk, commandeOptions) => {

    const { repondre, arg, ms } = commandeOptions;  
      const question = arg.join(' ');
if (!question) return repondre("Give me location...");

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${question}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`);

        const data = await response.json();


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
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        const country = (data.sys.country);
       

await repondre(`❄️ Weather in ${cityName}

🌡️Temperature: ${temperature}°C
📝 Description: ${description}
❄️ Humidity: ${humidity}%
🌀 Wind Speed: ${windSpeed} m/s
🌧️ Rain Volume (last hour): ${rainVolume} mm
☁️ Cloudiness: ${cloudiness}%
🌄 Sunrise: ${sunrise.toLocaleTimeString()}
🌅 Sunset: ${sunset.toLocaleTimeString()}
🗺 country: ${country}`);



            

        });
