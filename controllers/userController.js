const { findUser } = require('../models/userModel');

const login = async (req, res) => {
    const db = req.app.get('db');
    const { userId, userPwd } = req.body;

    try {
        const user = await findUser(db, userId, userPwd);

        if (!user) {
            return res.json({ success: false, message: '아이디 또는 비밀번호가 틀렸습니다.' });
        }

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
    } catch (err) {
        console.error('로그인 오류:', err);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
};

const signup = async (req, res) => {
    const db = req.app.get('db');
    const { userId, password, role } = req.body;

    if (!userId || !password || !role) {
        return res.json({ success: false, message: '아이디, 비밀번호, 역할을 입력하세요.' });
    }

    try {
        const [rows] = await db.execute('SELECT * FROM user WHERE id = ?', [userId]);
        if (rows.length > 0) {
            return res.json({ success: false, message: '이미 존재하는 아이디입니다.' });
        }

        await db.execute('INSERT INTO user (id, password, role) VALUES (?, ?, ?)', [userId, password, role]);
        res.json({ success: true, message: '회원가입 성공!' });
    } catch (err) {
        console.error('회원가입 오류:', err);
        res.status(500).json({ success: false, message: 'DB 저장 실패!' });
    }
};

module.exports = { login, signup };
