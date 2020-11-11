import { ConnectionOptions } from 'typeorm';
import User from '../entity/User';
import Note from "../entity/Note";
import Announcement from "../entity/Announcement";

const docker = {
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'chapDB',
};

const dev = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'thuto_boswa',
};

const deploy = {
  url: process.env.DATABASE_URL,
  extra: { ssl: true },
};

const config = process.env.DATABASE_URL ? deploy : dev;

export const dbconfig: ConnectionOptions = {
  ...config,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, Note, Announcement],
  dropSchema: false,
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: '../entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
