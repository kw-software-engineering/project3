const express = require('express');
const router = express.Router();

// 강의 목록 조회 API
router.get('/lectures', async (req, res) => {
    const db = req.app.get('db');

    try {
        const [rows] = await db.query('SELECT * FROM lecture'); // lecture 테이블에서 강의 리스트 조회
        res.json(rows); // 조회된 강의 데이터 응답
    } catch (err) {
        console.error('강의 목록 조회 에러:', err);
        res.status(500).json({ message: '강의 목록 조회 실패' });
    }
});

router.post('/enroll', async (req, res) => {
    const db = req.app.get('db');
    const { studentId, lectures } = req.body;

    try {
        for (const lectureId of lectures) {
            // 먼저 중복 확인
            const [existing] = await db.query(
                'SELECT * FROM enrollment WHERE student_id = ? AND lecture_id = ?',
                [studentId, lectureId]
            );

            if (existing.length === 0) {
                // 중복 없으면 INSERT
                await db.query(
                    'INSERT INTO enrollment (student_id, lecture_id) VALUES (?, ?)',
                    [studentId, lectureId]
                );
            }
            // 중복이면 아무것도 안 하고 넘어감
        }

        res.json({ success: true });
    } catch (err) {
        console.error('수강신청 에러:', err);
        res.status(500).json({ success: false, message: '수강신청 실패' });
    }
});

module.exports = router;