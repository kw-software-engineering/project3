const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 업로드 경로 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../upload'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

/**
 * 과제 제출 조회 (개인별, 과제별)
 * GET /api/submissions/:assignmentId?student_id=2020123456
 */
router.get('/:assignmentId', async (req, res) => {
  const db = req.app.get('db');
  const assignmentId = req.params.assignmentId;
   const studentId =
     req.query.student_id
  || req.session?.user?.id;

  console.log('assignmentId=', req.params.assignmentId, 'studentId=', req.query.student_id, req.session?.userId);

  if (!assignmentId || !studentId) {
    return res.status(400).json({ message: 'assignmentId 또는 student_id 누락' });
  }

  try {
    const [rows] = await db.query(
      `SELECT * FROM assignment_submission WHERE assignment_id = ? AND student_id = ?`,
      [assignmentId, studentId]
    );

    if (rows.length === 0) return res.status(404).json({ message: '제출 내역 없음' });
    res.json(rows[0]);
  } catch (err) {
    console.error('제출 조회 오류:', err);
    res.status(500).json({ message: '제출 조회 실패' });
  }
});

/**
 * 과제 제출 등록
 * POST /api/submissions/:assignmentId
 */
router.post('/:assignmentId', upload.single('file'), async (req, res) => {
  const db = req.app.get('db');
  const assignmentId = req.params.assignmentId;
  const { submit_title, submit_description } = req.body;
  const filePath = req.file ? '/uploads/submissions/' + req.file.filename : null;
  const studentId = req.session?.userId || req.body.student_id || null;

  if (!assignmentId || !studentId || !submit_title) {
    return res.status(400).json({ message: '필수 정보 누락' });
  }

  try {
    await db.execute(
      `INSERT INTO assignment_submission 
      (assignment_id, student_id, submit_title, submit_description, submit_file, status) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        assignmentId,
        studentId,
        submit_title,
        submit_description || '',
        filePath,
        1
      ]
    );
    res.json({ message: '제출 완료' });
  } catch (err) {
    console.error('제출 오류:', err);
    res.status(500).json({ message: '제출 실패' });
  }
});

/**
 * 과제 제출 수정
 * PUT /api/submissions/:assignmentId
 */
router.put('/:assignmentId', upload.single('file'), async (req, res) => {
  const db = req.app.get('db');
  const assignmentId = req.params.assignmentId;
  const { submit_title, submit_description } = req.body;
  const filePath = req.file ? '/uploads/submissions/' + req.file.filename : null;
  const studentId = req.session?.userId || req.body.student_id || null;

  if (!assignmentId || !studentId || !submit_title) {
    return res.status(400).json({ message: '필수 정보 누락' });
  }

  try {
    await db.execute(
      `UPDATE assignment_submission 
       SET submit_title = ?, submit_description = ?, submit_file = ?, status = ? 
       WHERE assignment_id = ? AND student_id = ?`,
      [
        submit_title,
        submit_description || '',
        filePath,
        1,
        assignmentId,
        studentId
      ]
    );
    res.json({ message: '제출 수정 완료' });
  } catch (err) {
    console.error('수정 오류:', err);
    res.status(500).json({ message: '제출 수정 실패' });
  }
});

/**
 * 제출 삭제 (옵션)
 * DELETE /api/submissions/:assignmentId?student_id=2020123456
 */
router.delete('/:assignmentId', async (req, res) => {
  const db = req.app.get('db');
  const assignmentId = req.params.assignmentId;
  const studentId = req.query.student_id || req.session?.userId;

  if (!assignmentId || !studentId) {
    return res.status(400).json({ message: 'assignmentId 또는 student_id 누락' });
  }

  try {
    const [result] = await db.execute(
      `DELETE FROM assignment_submission WHERE assignment_id = ? AND student_id = ?`,
      [assignmentId, studentId]
    );
    res.json({ message: '제출 삭제 완료' });
  } catch (err) {
    console.error('삭제 오류:', err);
    res.status(500).json({ message: '제출 삭제 실패' });
  }
});

module.exports = router;
