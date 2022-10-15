import "reflect-metadata"
import { DataSource, DataSourceOptions, MixedList } from "typeorm"

export const AppDataSource = new DataSource({
  name: "default", 
  type: "postgres",
  host: "3.143.105.105",
  port: 4321,
  username: "postgres",
  password: "ags001#postgres",
  database: "AGS001-DEV",
  entities: [
    `${__dirname}/../../../../modules/**/infra/typeorm/entities/*{.ts,.js}`
  ],
  migrations: [
    `${__dirname}/../migrations/*{.ts,.js}`
  ],
  cli: {
    migrationsDir: `${__dirname}/../migrations/*{.ts,.js}`,
  },
} as DataSourceOptions)
