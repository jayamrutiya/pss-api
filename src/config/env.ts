import appRoot from "app-root-path";
import dotenv from "dotenv";

dotenv.config({ path: `${appRoot}/.env` });

export default {
  NODE_ENV: process.env.NODE_ENV,
  APP_ROOT: appRoot.path,
  PORT: process.env.PORT,

  API_ROOT: `${process.env.API_ROOT}/v${process.env.VERSION}`,

  DATABASE_URL: process.env.DATABASE_URL,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN!,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN!,
};
