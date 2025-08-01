import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  TG_BOT_API_KEY: process.env.TG_BOT_API_KEY || '',
  TG_BOT_CHAT_ID: process.env.TG_BOT_CHAT_ID || '',
};
