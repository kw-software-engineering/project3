const express = require('express');
const router = express.Router();

// 시간표 조회 API
router.get('/timetable/:studentId', async (req, res) => {
    const db = req.app.get('db');
    const { studentId } = req.params;

    try {
        const [rows] = await db.query(`
      SELECT l.name, l.time
      FROM enrollment e
      JOIN lecture l ON e.lecture_id = l.id
      WHERE e.student_id = ?
    `, [studentId]);

        res.json(rows);  // 학생의 시간표 정보 응답
    } catch (err) {
        console.error('시간표 조회 에러:', err);
        res.status(500).json({ message: '시간표 조회 실패' });
    }
});

module.exports = router;