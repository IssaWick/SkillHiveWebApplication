import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const servicePool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.SDB_PASSWORD,
  database: process.env.SDB_NAME,
  port: process.env.SDB_PORT,
});

export default servicePool;
