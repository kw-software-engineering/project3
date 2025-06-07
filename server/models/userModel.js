const db = require('mysql2/promise');
require('dotenv').config();

const pool = db.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

async function findUser(userId, userPwd) {
  const [rows] = await pool.execute('SELECT * FROM user WHERE id = ? AND password = ?', [userId, userPwd]);
  return rows[0];
}

module.exports = {pool, findUser} ;