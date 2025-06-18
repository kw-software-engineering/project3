const findUser = async (db, userId, password) => {
  const [rows] = await db.execute(
    'SELECT * FROM user WHERE id = ? AND password = ?',
    [userId, password]
  );
  return rows.length > 0 ? rows[0] : null;
};

const insertUser = async (db, name, userId, password, role) => {
    const [result] = await db.promise().execute(
        'INSERT INTO user (name, id, password, role) VALUES (?, ?, ?, ?)',
        [name, userId, password, role]
    );
    return result.insertId;
};

module.exports = { findUser, insertUser };