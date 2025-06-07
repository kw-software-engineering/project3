const db = require('../models/userModel.js'); // pool 연결된 db
const { findUser } = require('../models/userModel');

const login = async (req, res) => {
    const { userId, userPwd } = req.body;
    const user = await findUser(userId, userPwd);

    if (user) {
        // role별 name 조회
        let nameQuery = '';
        if (user.role === 'student') {
            nameQuery = 'SELECT name FROM student WHERE id = ?';
        } else if (user.role === 'professor') {
            nameQuery = 'SELECT name FROM professor WHERE id = ?';
        } else if (user.role === 'staff') {
            nameQuery = 'SELECT name FROM staff WHERE id = ?';
        }

        let name = '';
        if (nameQuery) {
            const [rows] = await db.execute(nameQuery, [user.id]);
            if (rows.length > 0) {
                name = rows[0].name;
            }
        }

        res.json({ success: true, role: user.role, username: name });
    } else {
        res.json({ success: false, message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }
};

module.exports = { login };