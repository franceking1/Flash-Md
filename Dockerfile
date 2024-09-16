FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

RUN npm install pm2 -g

RUN git clone https://github.com/France-King1/Flash-Md..git /root/goatedfrance
WORKDIR /root/goatedfrance/

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["node", "france.js"]
