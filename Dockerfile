FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*
  
RUN git clone https://github.com/franceking1/Flash-MD.git  /root/macsam
WORKDIR /root/MACSAM/


COPY package.json .
RUN npm install pm2 -g
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD ["node", "macsam.js"]
