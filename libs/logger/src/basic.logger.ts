import * as chalk from 'chalk';

export type BasicLogger = {
  error: (msg: string) => void;
  info: (msg: string) => void;
  debug: (msg: string) => void;
};

export const basicLogger = {
  error: (message: string) => {
    console.log(
      chalk.redBright(`[ERROR:${new Date().toLocaleString()}]  ${message}`),
    );
  },
  info: (message: string) => {
    console.log(
      chalk.blueBright(`[INFO:${new Date().toLocaleString()}]  ${message}`),
    );
  },
  debug: (message: string) => {
    console.log(
      chalk.greenBright(`[DEBUG:${new Date().toLocaleString()}]  ${message}`),
    );
  },
};
