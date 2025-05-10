import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const isProd = process.env.NODE_ENV === 'production';

let transport;

if (isProd) {
  transport = pino.transport({
    targets: [
      {
        target: 'pino/file',
        level: 'info',
        options: {
          destination: path.join(logDir, 'info.log'),
          mkdir: true
        }
      },
      {
        target: 'pino/file',
        level: 'error',
        options: {
          destination: path.join(logDir, 'error.log'),
          mkdir: true
        }
      },
      {
        target: 'pino-pretty',
        level: 'info',
        options: {
          colorize: false,
          ignore: 'pid,hostname,time,level'
        }
      }
    ]
  });
} else {
  transport = pino.transport({
    targets: [
      {
        target: 'pino-pretty',
        level: 'info',
        options: {
          colorize: true,
          ignore: 'pid,hostname,time,level'
        }
      }
    ]
  });
}

const logger = pino({ level: 'info' }, transport);

export default logger;
