import { AppDataSource } from "./data-source";

try {
  AppDataSource.initialize()
} catch (error) {
  console.log({error});
}