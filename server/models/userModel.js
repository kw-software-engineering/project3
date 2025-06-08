const findUser = async (db, userId, password) => {
  const [rows] = await db.promise().execute(
    'SELECT * FROM user WHERE id = ? AND password = ?',
    [userId, password]
  );
  return rows.length > 0 ? rows[0] : null;
};

module.exports = { findUser };
