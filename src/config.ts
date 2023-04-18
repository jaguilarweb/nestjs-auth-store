import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apiKey: process.env.API_KEY,
    database: {
      db_name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
  };
});
