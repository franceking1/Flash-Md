FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
  
RUN git clone https://github.com/franceking1/Flash-Md  /root/Flash_BOt
WORKDIR /root/Flash_Bot/


COPY package.json .
RUN npm install pm2 -g
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run" , "flash"]
