import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const sqlConfig = {
  DB_Name: process.env.SQL_DB_Name || "",
  userName: process.env.SQL_Username || "root",
  password: process.env.SQL_password || "",
  dialect: process.env.SQL_dialect || "mysql",
  host: process.env.SQL_Host || "localhost",
};

const sequelize = new Sequelize(
  sqlConfig.DB_Name,
  sqlConfig.userName,
  sqlConfig.password,
  {
    dialect: sqlConfig.dialect as any,
    host: sqlConfig.host,
    logging: false,
  }
);

export default sequelize;
