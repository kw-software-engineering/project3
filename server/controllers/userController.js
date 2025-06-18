const { findUser } = require('../models/userModel');

const login = async (req, res) => {
    const db = req.app.get('db');
    const { userId, userPwd } = req.body;

    try {
        const user = await findUser(db, userId, userPwd); // user.role, user.id 포함

        if (!user) {
            return res.json({ success: false, message: '아이디 또는 비밀번호가 틀렸습니다.' });
        }

        req.session.user = {
            id: user.id,
            role: user.role
        };

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
        res.json({ success: true, role: user.role, userId: user.id, name });

    } catch (err) {
        console.error('로그인 오류:', err);
        res.status(500).json({ success: false, message: '서버 오류' });
    }
};

const signup = async (req, res) => {
    const db = req.app.get('db');
    const {
        userId, password, role, name,
        birth_date, tel, address,
        grade, department
    } = req.body;

    if (!userId || !password || !role || !name) {
        return res.status(400).json({ success: false, message: '필수 항목 누락: 아이디, 비밀번호, 이름, 사용자 유형은 필수입니다.' });
    }

    try {
        // 아이디 중복 확인
        const [existing] = await db.execute('SELECT * FROM user WHERE id = ?', [userId]);
        if (existing.length > 0) {
            return res.json({ success: false, message: '이미 존재하는 아이디입니다.' });
        }

        // user 테이블에 기본 정보 삽입
        await db.execute(
            'INSERT INTO user (id, password, role) VALUES (?, ?, ?)',
            [userId, password, role]
        );

        // role 기반 분기 삽입
        if (role === '1') { // 학생
            await db.execute(
                'INSERT INTO student (id, name, birth_date, tel, address, grade, department) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [userId, name, birth_date || null, tel || null, address || null, grade || null, department || null]
            );
        } else if (role === '2') { // 교수
            await db.execute(
                'INSERT INTO professor (id, name, birth_date, tel, address) VALUES (?, ?, ?, ?, ?)',
                [userId, name, birth_date || null, tel || null, address || null]
            );
        } else if (role === '3') { // 교직원
            await db.execute(
                'INSERT INTO staff (id, name, birth_date, tel, address) VALUES (?, ?, ?, ?, ?)',
                [userId, name, birth_date || null, tel || null, address || null]
            );
        } else {
            return res.status(400).json({ success: false, message: '유효하지 않은 사용자 유형입니다.' });
        }

        res.json({ success: true, message: '회원가입 성공!' });

    } catch (err) {
        console.error('회원가입 오류:', err);
        res.status(500).json({ success: false, message: '서버 오류: 회원가입 처리 중 예외 발생', error: err.message });
    }
};



const getUserInfo = async (req, res) => {
    const db = req.app.get('db');
    const userId = req.query.userId;

    if (!userId) {
        return res.json({ success: false, message: 'userId가 없습니다.' });
    }

    try {
        // 먼저 user 테이블에서 role 확인
        const [userRows] = await db.execute('SELECT role FROM user WHERE id = ?', [userId]);

        if (userRows.length === 0) {
            return res.json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        const role = userRows[0].role;
        let nameQuery = '';
        let nameResult;

        if (role === 1) {
            [nameResult] = await db.execute('SELECT name FROM student WHERE id = ?', [userId]);
        } else if (role === 2) {
            [nameResult] = await db.execute('SELECT name FROM professor WHERE id = ?', [userId]);
        } else if (role === 3) {
            [nameResult] = await db.execute('SELECT name FROM staff WHERE id = ?', [userId]);
        } else {
            return res.status(400).json({ success: false, message: '유효하지 않은 사용자 유형입니다.' });
        }

        if (nameResult.length === 0) {
            return res.json({ success: false, message: '사용자 이름을 찾을 수 없습니다.' });
        }

        const name = nameResult[0].name;

        res.json({ success: true, user: { id: userId, name } });

    } catch (error) {
        console.error('사용자 정보 조회 오류:', error);
        res.status(500).json({ success: false, message: 'DB 오류' });
    }
};


module.exports = { login, signup, getUserInfo };