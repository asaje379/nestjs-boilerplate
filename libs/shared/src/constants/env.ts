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
  email: {
    host: process.env.EMAIL_HOST,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  auth: {
    tokenSecret: process.env.AUTH_TOKEN_SECRET,
    tokenExpiration: +process.env.AUTH_TOKEN_EXPIRATION,
  },
  security: {
    requestSizeLimit: process.env.SECURITY_REQUEST_SIZE_LIMIT,
  },
};
