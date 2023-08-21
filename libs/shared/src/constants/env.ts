import { config } from 'dotenv';

config();

export const Env = {
  app: {
    port: process.env.APP_PORT,
  },
  openApi: {
    title: process.env.O_API_TITLE,
    description: process.env.O_API_DESCRIPTION,
    version: process.env.O_API_VERSION,
    baseUrl: process.env.O_API_BASE_URL,
  },
};
