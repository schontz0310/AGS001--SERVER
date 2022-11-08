import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import dotenv from 'dotenv';

dotenv.config();
export const AppDataSource = new DataSource({
  name: "default", 
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [
    `${__dirname}/../../../../../modules/**/infra/typeorm/entities/*{.ts,.js}`
  ],
  migrations: [
    `${__dirname}/migrations/*{.ts,.js}`
  ],
  cli: {
    migrationsDir: `./src/shared/infra/database/typeorm/migrations`,
  },
} as DataSourceOptions)
