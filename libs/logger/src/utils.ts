import * as winston from 'winston';
import 'winston-daily-rotate-file';

const winstonLogger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/errors_%DATE%.log',
      level: 'error',
      datePattern: 'DD-MM-YYYY',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '90d',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/logs_%DATE%.log',
      level: 'info',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '90d',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/http_%DATE%.log',
      level: 'warn',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '90d',
    }),
  ],
});

export function winstonLog(
  context: string,
  type: 'info' | 'error' | 'warn',
  service: string,
  message: string,
) {
  const formattedMessage = `[${context.toUpperCase()}] ${
    process.pid
  } -- ${new Date().toLocaleString()}  [${service}] ${message}`;

  if (type === 'error') {
    return winstonLogger.error(formattedMessage);
  }

  if (type === 'warn') {
    const warnMessage = `[${context.toUpperCase()}] ${
      process.pid
    } -- ${new Date().toLocaleString()}  [${service}] (NEW HTTP REQUEST)
${message}`;
    return winstonLogger.warn(warnMessage);
  }

  return winstonLogger.info(formattedMessage);
}
