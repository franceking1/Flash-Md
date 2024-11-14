FROMnode:lts-buster

RUNapt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*
  
RUNgit clone https://github.com/franceking1/Flash-Md  /root/Flash_BOt
WORKDIR/root/Flash_Bot/


COPYpackage.json .
RUNnpm install pm2 -g
RUNnpm install

COPY . .

EXPOSED8000

CMD["npm", "run" , "flash"]
