import pool from "./connectPGDB.js";

const createUserTable = async () => {
  const querryText = `
  CREATE TABLE IF NOT EXISTS users(
  tgid VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)
  `;

  try {
    pool.query(querryText);
    console.log("User table created if not exists");
  } catch (error) {
    console.log("Error creating users table: ", error);
  }
};

export default createUserTable;
