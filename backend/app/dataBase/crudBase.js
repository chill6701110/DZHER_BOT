import pool from "./connectPGDB.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserByIdService = async (tgid) => {
  const result = await pool.query("SELECT * FROM users where tgid = $1", [tgid]);
  return result.rows[0];
};

export const createUserService = async (tgid) => {
  const result = await pool.query(
    "INSERT INTO users (tgid) VALUES ($1) RETURNING *",
    [tgid]
  );
  return result.rows[0];
};

/*export const updateUserService = async (tgid) => {
  const result = await pool.query(
    "UPDATE users SET tgid=$1 WHERE id=$3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};*/

export const deleteUserService = async (tgid) => {
  const result = await pool.query(
    "DELETE FROM users WHERE tgid = $1 RETURNING *",
    [tgid]
  );
  return result.rows[0];
};
