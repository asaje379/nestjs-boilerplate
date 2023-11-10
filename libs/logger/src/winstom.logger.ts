import * as winston from 'winston';

export const winstonLogger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs/winston.error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/winston.info.log',
      level: 'info',
    }),
  ],
});
