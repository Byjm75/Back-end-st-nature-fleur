import { DataSource } from "typeorm";
import dotenv from "dotenv";


dotenv.config({ path: ".env.local" });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  //entities: [plants], // entities: [Hero]
  migrations: [],
  subscribers: [],
});

export default AppDataSource;

//
//
//username: ,
//password: ,
//database: ,