import pkg from "pg";
const { Pool } = pkg;
import { config } from "../config.js";

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.dbName,
  password: config.dbPass,
  port: config.dbPort,
});

pool.on("connect", () => {
  console.log("Connection pool established with Database");
});

export default pool;
