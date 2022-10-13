import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"

export const AppDataSource = new DataSource({
  name: "default", 
  type: "postgres",
  host: "3.143.105.105",
  port: 4321,
  username: "postgres",
  password: "ags001#postgres",
  database: "AGS001-DEV",
  entities: [
    `${__dirname}/modules/**/infra/typeorm/entities/*{.ts,.js}`,
    `${__dirname}/../dist/modules/**/infra/typeorm/entities/*{.ts,.js}`
  ],
  migrations: [
    "./src/shared/infra/database/typeorm/migrations/*{.ts,.js}"
  ],
  cli: {
    // entitiesDir: "./src/modules/**/infra/typeorm/entities/*{.ts,.js}",
    migrationsDir: "./src/shared/infra/database/typeorm/migrations",
  },
} as DataSourceOptions)
