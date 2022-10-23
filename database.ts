import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
  migrations: ['migrations/*.ts'],
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  synchronize: false,
  type: 'postgres',
  url: process.env.TWITTER_POSTGRES_URL,
});
