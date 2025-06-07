// userModel.js
const findUser = async (db, userId, password) => {
  const connection = await db.getConnection(); // Pool에서 connection 얻기
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM user WHERE id = ? AND password = ?',
      [userId, password]
    );
    return rows.length > 0 ? rows[0] : null;
  } finally {
    connection.release(); // 사용 후 반환
  }
};

module.exports = { findUser };
